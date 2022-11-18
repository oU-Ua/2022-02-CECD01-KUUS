const express = require('express')
const router = express.Router()
const path = require("path");
const bodyParser = require("body-parser");
const clientSessions = require("express-session");


router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const { User } = require('../models/User')
const { Schedule } = require('../models/Schedule')

// 리액트 + 노드 참고 페이지
// https://duckgugong.tistory.com/223
// https://velog.io/@secho/React-03리액트와-노드사이의-통신-노드의-데이터를-리액트에서-로드하기
// https://wonyoung2257.tistory.com/6


// myPage 들어가면 현재 User의 정보 띄움
// 현재는 name, email 정도 띄우고
// 추후 User Schema에 user에 딸린 비행 일정, 그 외 프로필 추가 필요
router.get('/', async(req, res, next) => {
    let userInfo = await User.findOne({ id: req.params.id})
    try {
        if (userInfo == null) {
            res.status(404).json({
                message: "계정을 찾을 수 없습니다!",
            })
    } 
    } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        res.send(userInfo)
        next()
})


// myPage에서 
// 여기서 id에 속한 여러가지 비행 일정 중에서 선택
// [비행일정] 버튼을 눌러서 User에게 속한 비행일정 불러오기
router.get('/schedule', (req, res) => {
    // Schedule.getAllScheById(req.params.id)
    // .then((scheData) => {
    //     res.json({
    //         data : scheData
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // })
})

// 복수의 비행일정 중에서 선택
// Schedule의 id 값으로 받아오는 함수
router.get('/schedule/:id', (req, res) => {
    
})

// 내 비행 일정 등록하기
router.post('/create',  async (req, res) => {

    let schedule = new Schedule({
        Flight_No: req.body.Flight_No,
        From: req.body.From,
        To: req.body.To,
        Dep_Time: req.body.Dep_Time,
        Gate: req.body.Gate,
    })
    
    try {
        let newSchedule = await schedule.save()
        res.status(200).json(newSchedule)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})



module.exports = router