const express = require('express')
const router = express.Router()
const path = require("path");
const bodyParser = require("body-parser");
const clientSessions = require("express-session");
const { getMap } = require('../middleware/flightaware')
const { sendMessage } = require('../middleware/smsapi')
const { auth }= require('../middleware/auth')

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const { User } = require('../models/User')
const { Schedule } = require('../models/Schedule');
const { read } = require('fs');

// 리액트 + 노드 참고 페이지
// https://duckgugong.tistory.com/223
// https://velog.io/@secho/React-03리액트와-노드사이의-통신-노드의-데이터를-리액트에서-로드하기
// https://wonyoung2257.tistory.com/6

// 노드
// https://hyogeun-android.tistory.com/entry/10-Nodejs-Mongodb를-사용한-게시판-1
// https://www.a-mean-blog.com/ko/blog/Node-JS-첫걸음/게시판-만들기/게시판-Post-User-관계-relationship-만들기



// myPage 들어가면 현재 User의 정보 띄움
// 현재는 name, email 정도 띄우고
// 추후 User Schema에 user에 딸린 비행 일정, 그 외 프로필 추가 필요
// 로그인 하지 않으면 접근 불가능 -> message: "로그인 해주세요!"

router.get('/', auth, (req, res, next) => {

    let userInfo = req.user
    // const userInfo = await User.findOne({ email: "sss@gmail.com" })
    console.log(userInfo)


    try {
        console.log('userInfo: '+userInfo)

        if (userInfo == null) {
            res.status(404).json({
                message: "계정을 찾을 수 없습니다!",
            })
        }

        res.status(200).send(userInfo)
        next()
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    } throw(err)
})

// 여기서 id에 속한 여러가지 비행 일정 중에서 선택
// [비행일정] 버튼을 눌러서 User에게 속한 비행일정 불러오기
// 화면에는 일정 이름만 보여주기

// **************************
// ********** 안씀 **********
// **************************
// 마이페이지에서 리스트 한번에 보여줌
router.get('/schedule', auth, (req, res) => {
    User.findOne({ email: req.user.email }, (err, user) => {
        return res.send(user.myschedules)
    })
})

// 복수의 비행일정 중에서 하나의 일정 선택
// Schedule의 id 값으로 받아오는 함수, id는 몽고db _id값
// response로 해당 db에서 id의 schedule 넘겨줌
// 또 api를 통해 가져온 실시간 비행기 위치 이미지(base64 인코딩)를 넘겨줌

router.get('/schedules/:id', auth, (req, res) => {
    console.log('Back myPage.js입니다! Schedule id: ' + req.params.id)
    Schedule.findById(req.params.id, (err, schedule) => {
        if (err) return res.status(400).json({ message: err.message })
        getMap(schedule.flight_info.fa_flight_id, (err, result) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            return res.status(200).send({ schedule: schedule, map: JSON.parse(result.body).map })
        })

        // getMap(schedule.flight_info.fa_flight_id, (err, result) => {
        //     if (err) {
        //         return res.status(400).json({ message: err.message })
        //     }
        //     return res.status(200).send({ schedule: schedule, map: JSON.parse(result.body).map })
        // })
    })
})

// /schedule/:id 에서 넘어옴
// schedule의 _id와 사용자가 입력한 공유할 사람의 전화번호 넘겨받음
// sendMessage 메소드 통해 sms로 공유할 일정 링크 보내줌
router.post('/schedule/share',auth, (req, res) => {
    var id = req.body.id
    var phone = req.body.phone
    var name = req.user.name
    var url = `http://localhost:5000/api/share/${id}`;
    var content = name +'님의 비행 일정 공유 요청이 왔습니다. ' + url
    console.log("content:" + content)
        sendMessage(content, phone, (err, result)=>{
                 if (err) {
                     return res.json({message: err.message})
                 }
                 return res.send(result)            
         })    
})

// 내 비행 일정 등록하기    
router.post('/create', auth, async (req, res) => {

    const curUser = req.user
    // IATA 형식 받아와서 api 호출 -> 코드만 입력하면 일정이 뜨도록
    // 일정 여러개 등록 가능 -> 이름 설정 필요 ex) 11/24 싱가포르 여행 | 12/04 뉴욕 출장
    let schedule = new Schedule({
        ScheduleName: req.body.ScheduleName,
        author: curUser.email,
        flight_info: req.body.flight_info,
        flight_schedule: req.body.flight_schedule,
        airports: req.body.airports,
    })
    try {
        // DB에 일정 저장
        schedule.save()
        // User DB에 생성한 일정 ID 저장
        User.findOne({ email: req.user.email }, (err, user) => {
            if (err) return res.status(400).json({
                message: err.message
            })
            user.myschedules.push({ ScheduleName: schedule.ScheduleName, _id: schedule._id })
            user.save();
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    } throw(err)
})

// 공유받은 일정 목록
// **************************
// ********** 안씀 **********
// **************************
// 마이페이지에서 리스트 한번에 보여줌
router.post('/shared', (req,res)=>{
    User.findOne({ email: req.user.email }, (err, user) => {
        return res.send(user.sharedschedules)
    })
})

// 복수의 공유받은 일정 목록 중 하나 선택해서 보여줌
// 공유받은 일정 목록
// **************************
// ********** 안씀 **********
// **************************
// 마이페이지에서 schedule id 받아서 /schedules/:id로 상세 조회 (비행 상세는 my/shared 구분 없음)
router.get('/shared/:id', (req, res) => {
    Schedule.findById(req.params.id, (err, schedule) => {
        if (err) return res.status(400).json({ message: err.message })
        getMap(schedule.flight_info.fa_flight_id, (err, result) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            return res.status(200).send({ schedule: schedule, map: JSON.parse(result.body).map })
        })
    })
})
module.exports = router