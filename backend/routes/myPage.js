const express = require('express')
const router = express.Router()

const user = require('../models/User')

// myPage 들어갔을 때 초기 화면
// 여기서 여러가지 비행 일정 중에서 선택할지
// 아니면 바로 일정 하나만 띄울지 결정하기
router.get('/', (req, res) => {
    res()
})

// 비행일정 하나만 띄우는거면 위에 함수에서 해결보고
// 여러 비행일정 중에서 선택하는거면
// id 값으로 받아오는 함수
router.get('/_id', (req, res) => {
    
})

// 내 비행 일정 등록하기
router.post('/create', (req, res) => {

})



module.exports = router