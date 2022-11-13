const express = require('express')
const app = express()
//시작할 서버. 포트 마음대로 바꿔도 상관없음
const port = 5000
//클라이언트에서 오는 정보를 서버에서 분석해서 가져오게 해줌
const bodyParser = require('body-parser');
//토큰을 쿠키에 저장하기 위해 쓰는 파서
const cookieParser = require('cookie-parser');
//비밀키를 가져올 변수
const config = require('./config/dev');
const { auth } = require("./middleware/auth");
//유저 모델스키마를  가져오겠다
const { User } = require('./models/User');
//AirLabsAPI 호출 함수
const { callAirLabs } = require("./middleware/airlabs");
//AirLabsAPI 호출에 사용되는 매개변수
const params = {
  api_key: config.api_key,
  //항공기 위치나 다른 API도 찾아오려면 다른 식으로 변경 필요
  _fields: "dep_iata, dep_time, arr_iata, arr_time"
}

//application/x-www-form-urlencodec를 분석해서 가져오게 해줌
app.use(bodyParser.urlencoded({ extended: true }));

//application/json타입을 분석해서 가져올 수 있게
app.use(bodyParser.json());
//cookieParser를 사용할 수 있게
app.use(cookieParser());

//mongoose는 mongoDB를 편하게 이용하게해주는 모듈
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('몽고디비 연결됨'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('백이 연결되었습니다')
})

//회원가입할 때 필요한 정보들을 client에서 가져오면 DB에 담아줌
app.post('/api/users/register', (req, res) => {
  //req.body에는 {name:"kim" id:"~~"}이런걸 담고 있음
  const user = new User(req.body)

  //mongoDB에 담게해주는 부분
  user.save((err, userInfo) => {
    //에러나 성공메세지모두 json형식으로 반환할 예정
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

//요청된 이메일을 데이터 베이스에서 찾고,
//이메일이 있다면 비밀번호가 맞는지 찾는다.
//비밀번호가 맞다면 토큰을 생성한다.
app.post('/api/users/login', (req, res) => {
  // 데이터베이스에서 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "존재하지 않는 유저입니다."
      })
    }

    // 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      // 비밀번호 일치하면 토큰 생성
      user.generateToken((err, user) => {
        //statue400은 에러가 있다는 의미고, 클라이언트한테 리턴해줌
        if (err) return res.status(400).send(err);

        //토큰을 저장한다. 쿠키에 저장할 예정. 개발자창에서 쿠키 확인 가능
        //개발자창에서 name:x_auth, value:khsdfhkfhsmdfdk 이런식으로 확인 가능
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//사용자에게서 항공편명, 출발지를 입력받아 api로 비행일정 검색
//지역이나 공항이름을 입력받아 iata 코드로 변환하고자 하지만 우선 iata코드 입력하도록 구현
app.post('/api/schedules/find', (req, res) => {
  let flight_iata = req.body.flight_iata;
  let dep_iata = req.body.dep_iata;

  callAirLabs('schedules', flight_iata, dep_iata, params, (err, result) => {
    if (err) return res.status(400).send(err);
    //airlabs에서 받아온 결과 중 response 부분만 뽑아 json으로 변환
    let result_json = JSON.parse(result.body).response;
    //검색된 결과가 하나도 없는 경우
    if(result_json.length==0) return res.send("해당 비행일정이 조회되지 않습니다.");

    //요청에 대한 응답으로 결과 json 보내줌
    return res.status(200).send(result_json);
  })
})


//auth는 미들웨어로 리퀘스트받고 auth인지 확인하는 부분
//middleware인 auth.js를 통과해야 실행됨
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    //auth.js에서 user를 가져왔기 때문에 id를 쓸 수 있음
    _id: req.user._id,
    // role 0이면 일반유저, 아니면 admin
    isAdmin: req.user.role === 0 ? false : true,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  })
})


//로그아웃하는 부분
app.get('/api/users/logout', auth, (req, res) => {
  //DB에서 로그아웃하려는 유저를 찾아서 업데이트
  User.findOneAndUpdate({ _id: req.user._id },
    //찾은 유저의 토큰을 지워줌
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

//$run start해서 제대로 실행이 되면 콘솔에서 포트 출력
app.listen(port, () => {
  console.log(`포트 ${port} 에서 돌아가고 있으니까 localhost:${port}를 웹에 입력해주세요`)
})