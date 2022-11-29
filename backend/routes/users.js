const express = require('express');
const session = require('express-session');
const router = express.Router()
const { User } = require('../models/User');
const { auth } = require('../middleware/auth')

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

  // // 세션 넣어줌
  // const paramName = req.body.name
  // const paramPW = req.body.password
  // const paramEmail = req.body.email

  // if (req.session.user) {
  //   res.status(400).json({
  //     message: "이미 로그인 상태입니다."
  //   })
  // } else {
  //   req.session.user = {
  //     name: paramName,
  //     pw: paramPW,
  //     email: paramEmail
  //   }

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

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.email
  })
})

//로그아웃하는 부분
router.get('/logout', auth, (req, res) => {

  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ err: err.message });
      return res.status(200).json({
        success: true
      })
    })

  // if (!req.session.user) {
  //   return res.status(400).send({ success: false })
  // }
  // req.session.destroy(function (err) {
  //   if (err) return res.json({ success: false, err })
  // })
  // return res.status(200).send({
  //   success: true
  // })
})

module.exports = router