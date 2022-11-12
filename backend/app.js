const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/dev');
const { auth } = require("./middleware/auth");
const { User } = require('./models/User');

// 개별 페이지 라우터 정의
const indexRouter = require('./routes/index')
const myPageRouter = require('./routes/myPage')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


app.use('/', indexRouter)
app.use('/mypage', myPageRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

