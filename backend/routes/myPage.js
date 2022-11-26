const express = require('express')
const router = express.Router()
const path = require("path");
const bodyParser = require("body-parser");
const clientSessions = require("express-session");


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


router.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });

// 로그인 상태 체크
// 로그인상태 아니면 myPage 접근 불가하도록
function loginStatus(req, res, next) {
    if(!req.session.user) {
        // 세션에 유저가 없으면 = 로그인 상태가 아니면
        // 오류 띄우고 로그인화면 or 메인화면으로 redirect
        res.status(400).json({
            message: "로그인해주세요!"
        })
    } else {
        next();
    }
}


// myPage 들어가면 현재 User의 정보 띄움
// 현재는 name, email 정도 띄우고
// 추후 User Schema에 user에 딸린 비행 일정, 그 외 프로필 추가 필요
// 로그인 하지 않으면 접근 불가능 -> message: "로그인 해주세요!"
router.get('/', loginStatus, async(req, res, next) => {
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
        res.json(userInfo)
        next()
})



// myPage에서 
// 여기서 id에 속한 여러가지 비행 일정 중에서 선택
// [비행일정] 버튼을 눌러서 User에게 속한 비행일정 불러오기
router.get('/schedule', (req, res) => {
    
})

// 복수의 비행일정 중에서 하나의 일정 선택
// Schedule의 id 값으로 받아오는 함수
router.get('/schedule/:id', (req, res) => {
    
})

// 내 비행 일정 등록하기
router.post('/create',  async (req, res) => {

    const curUser = req.session.user
    // IATA 형식 받아와서 api 호출 -> 코드만 입력하면 일정이 뜨도록
    // 일정 여러개 등록 가능 -> 이름 설정 필요 ex) 11/24 싱가포르 여행 | 12/04 뉴욕 출장
    let schedule = new Schedule({
        ScheduleName: req.body.ScheduleName,
        author: curUser.email,
        flight_info: req.body.flight_info,
        flight_schedule: req.body.flight_schedule,
        airports: req.body.airports,

        //-> 로그인 과정에 쿠키 추가해서 세션 생성 예정 현재 유저의 정보 받아오는 용도
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