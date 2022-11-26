const express = require('express');
const session = require('express-session');
const router = express.Router()
const { User } = require('../models/User');

//회원가입할 때 필요한 정보들을 client에서 가져오면 DB에 담아줌
router.post('/register', (req, res) => {
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
router.post('/login', (req, res) => {

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
    })

    // 세션 넣어줌
    if (req.session.user) {
      return res.status(400).json({
        message: "이미 로그인 상태입니다."
      })
    }
    req.session.user = {
      email: req.body.email,
      name: user.name
    }

    return res.status(200).send({
      success: true,
      name: req.session.user.name,
      email: req.session.user.email
    })
  })
})

//로그아웃하는 부분
router.get('/logout', (req, res) => {

  if (!req.session.user) {
    return res.status(400).send({ success: false })
  }
  req.session.destroy(function (err) {
    if (err) return res.json({ success: false, err })
  })
  return res.status(200).send({
    success: true
  })
})

module.exports = router