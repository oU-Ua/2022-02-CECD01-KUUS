const express = require('express')
const router = express.Router()
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const { User } = require('../models/User')
const { Schedule } = require('../models/Schedule')



// myPage 들어가면 현재 User의 정보 띄움
// 현재는 name, email 정도 띄우고
// 추후 User Schema에 user에 딸린 비행 일정, 그 외 프로필 추가 필요
// ensureLogin 이용해서 로그인 됐을 때만 접속 가능하도록 할 예정
router.get('/', async(req, res, next) => {
    let userInfo;
    try {
        userInfo = await User.findById(req.params.id)
        if (userInfo == null) {
            res.status(404).json({
                message: "계정을 찾을 수 없습니다!"
            })
        } 
    } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        res.userInfo = userInfo
        next()
})


// myPage에서 
// 여기서 id에 속한 여러가지 비행 일정 중에서 선택
// 아마 [비행일정] 버튼을 눌러서 비행일정 불러오기 해야될것같아요
router.get('/schedule', (req, res) => {
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
router.get('/schedule/:id', (req, res) => {
    
})

// 내 비행 일정 등록하기
router.post('/create',  async (req, res) => {
    const schedule = new Schedule({
        name: req.body.name,
        Flight_No: req.body.Flight_No,
        From: req.body.From,
        To: req.body.To,
        Dep_Time: req.body.Dep_Time,
        Gate: req.body.Gate,
    })
    
    try {
        const newSchedule = await schedule.save()
        res.status(201).json(newSchedule)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})



module.exports = router