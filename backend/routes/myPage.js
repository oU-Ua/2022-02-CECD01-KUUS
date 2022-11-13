const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Schedule = require('../models/Schedule')


// myPage 들어가면 현재 User의 정보 띄움
// 현재는 name, email 정도 띄우고
// 추후 User Schema에 user에 딸린 비행 일정, 그 외 프로필 추가 필요
router.get('/', (req, res) => {
    res.json({
        data : req.session.user
    })
})


// myPage에서 
// 여기서 id에 속한 여러가지 비행 일정 중에서 선택
router.get('/:id', (req, res) => {
    Schedule.getAllScheById(req.params.id)
    .then((scheData) => {
        res.json({
            data : scheData
        }).catch((err) => {
            console.log(err)
        })
    })
})

// 복수의 비행일정 중에서 선택
// id 값으로 받아오는 함수
router.get('/:id', (req, res) => {
    
})

// 내 비행 일정 등록하기
// 로그인 여부 확인 필요
router.post('/create', ensureLogin, function (req, res) {
    Schedule.createSche(req.body, req.session.User)
    .then(() => {
        // 함수 호출하여 mongoDB에 등록 완료
        res.status(200)
    }).catch((err) => {
        // 실패시 다시 create로 돌아감
        res.redirect('/create')
    })

})



module.exports = router