const express = require('express')
const router = express.Router()

const { auth } = require("../middleware/auth");
const { User } = require('../models/User');

router.use(express.static('views'))


router.get('/', (req, res) => {
  res.send('Hello World!')
})


router.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

router.post('/api/users/login', (req, res) => {
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
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

router.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role 0이면 일반유저, 아니면 admin
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  })
})

router.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

module.exports = router