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
// session 세팅
const session = require('express-session')

////cors 크로스오리진 접근 다 허용
var cors = require('cors');
app.use(cors({credentials: true, origin:"http://localhost:3000"}));



const usersRouter = require('./routes/users')
const myPageRouter = require('./routes/myPage')
const flightsearchRouter = require('./routes/flightsearch')
const shareRouter = require('./routes/share')
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
    res.send(req.session)
  } else {
    res.send('로그인해주세용')
  }
  // res.send('백이 연결되었습니다')
})


//$run start해서 제대로 실행이 되면 콘솔에서 포트 출력
app.listen(port, () => {
  console.log(`포트 ${port} 에서 돌아가고 있으니까 localhost:${port}를 웹에 입력해주세요`)
})

app.use('/api/users', usersRouter)
app.use('/api/mypage', myPageRouter)
app.use('/api/flightsearch' , flightsearchRouter)
app.use('/api/share',shareRouter )