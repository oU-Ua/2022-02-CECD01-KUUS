const express = require('express')
const router = express.Router()
const { Schedule } = require('../models/Schedule');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth')
const nschedule = require('node-schedule')
const { detectDelay } = require('../middleware/delay')

// 공유받은 일정 정보 보여줌
router.get('/:id', auth, (req, res) => {
    Schedule.findById(req.params.id, (err, schedule) => {
        if (err) { return res.status(400).json({ message: err.message }) }
        return res.status(200).send(schedule)
    })
})

// /:id에서 등록하기 통해 등록하는 부분
router.get('/register/:id', auth, (req, res) => {
    if (!req.user) {
        return res.status(400).json({
            message: "로그인해주세요!"
        })
    }
    // 쿠키의 email로 user 찾고, user의 공유받은 일정 목록에 해당 일정 추가
    User.findOne({ email: req.user.email }, (err, user) => {
        if (err) { return res.status(400).json({ message: err.message }) }
        Schedule.findById(req.params.id, (err, schedule) => {
            if (err) { return res.status(400).json({ message: err.message }) }
            user.sharedschedules.push({
                ScheduleName: schedule.ScheduleName,
                author: schedule.author,
                _id: schedule._id
            })
            user.save()

            // 일정 알림을 위한 부분, flag를 통해 sms 전송 관리
            // 지속적으로 항공 일정을 받아서 실시간으로 업데이트 하는 것이 이상적이나
            // api 무료버전 사용 및 트래픽 문제가 발생할 수 있어
            // 출발 시간, 10분 후, 30분 후에 정보 업데이트 해 도착시간 알려줌
            // 10분 후, 30분 후에 업데이트하는 이유는 데이터가 실시간으로 업데이트되지 않는 경우가
            // 많이 발생해 출발하고 난 뒤라도 도착 예정 시간에 대해 좀 더 정확하게 알리기 위함임
            var flag = { msgsent: false, no_schedule: false }
            // 출발 예정 시간에 업데이트
            var date1 = new Date(schedule.flight_schedule.scheduled_out)
            nschedule.scheduleJob(date1, function () {
                console.log("date1: " + date1.toString())
                detectDelay(schedule, flag)
            })
            // 출발 예정 시간 10분 후 업데이트
            var date2 = new Date(schedule.flight_schedule.scheduled_out)
            date2.setMinutes(date2.getMinutes()+10)
            nschedule.scheduleJob(date1, function () {
                console.log("date2: " + date2.toString())
                detectDelay(schedule, flag)
            })
            // 출발 예정 시간 30분 후 업데이트
            var date3 = new Date(schedule.flight_schedule.scheduled_out)
            date3.setMinutes(date3.getMinutes()+30)
            nschedule.scheduleJob(date1, function () {
                console.log("date3: " + date3.toString())
                detectDelay(schedule, flag)
            })
            return res.status(200).json({ success: true })
        })
    })
})
module.exports = router