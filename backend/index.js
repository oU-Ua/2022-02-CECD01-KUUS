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
//AirLabsAPI 호출 함수
const session = require('express-session')
// session 세팅
const { callAirLabs } = require("./middleware/airlabs");
//AirLabsAPI 호출에 사용되는 매개변수
const params = {
  api_key: config.api_key,
  //항공기 위치나 다른 API도 찾아오려면 다른 식으로 변경 필요
  _fields: "dep_iata, dep_time, arr_iata, arr_time"
}

const usersRouter = require('./routes/users')
const myPageRouter = require('./routes/myPage')
const flightsearchRouter = require('./routes/flightsearch')

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

// 세션 설정
app.use(
  session({
    secret: "myTripFlight",
    resave: true,
    saveUninitialized: true,
    duration: 60 * 60 * 1000, // 1시간동안 로그인 지속
    activeDuration: 30 * 60 * 1000 // 활동이 있을 시 30분 연장
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

app.get('/', (req, res) => {
  if (req.session.user) {
    res.send('로그인상태입니당')
  } else {
    res.send('로그인해주세용')
  }
  // res.send('백이 연결되었습니다')
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

app.use('/api/users', usersRouter)

//$run start해서 제대로 실행이 되면 콘솔에서 포트 출력
app.listen(port, () => {
  console.log(`포트 ${port} 에서 돌아가고 있으니까 localhost:${port}를 웹에 입력해주세요`)
})

app.use('/mypage', myPageRouter)
app.use('/flightsearch' , flightsearchRouter)