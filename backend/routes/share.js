const express = require('express')
const router = express.Router()
const { Schedule } = require('../models/Schedule');
const { User } = require('../models/User');

// 공유받은 일정 정보 보여줌
router.get('/:id', (req, res) => {
    Schedule.findById(req.params.id, (err, schedule) => {
        if (err) { return res.status(400).json({ message: err.message }) }
        return res.status(200).send(schedule)
    })
})

// /:id에서 등록하기 통해 등록하는 부분
router.get('/register/:id', (req, res)=>{
    if(!req.session.user){
        return res.status(400).json({
            message: "로그인해주세요!"
        })
    }
    // 세션의 email로 user 찾고, user의 공유받은 일정 목록에 해당 일정 추가
    User.findOne({email: req.session.user.email}, (err, user)=>{
        if(err) {return res.status(400).json({message: err.message})}
        Schedule.findById(req.params.id, (err, schedule)=>{
            if(err) {return res.status(400).json({message: err.message})}
            user.sharedschedules.push({
                ScheduleName: schedule.ScheduleName,
                author: schedule.author,
                _id: schedule._id
            })
            user.save()
            return res.status(200).json({success: true})
        })
    })
})
module.exports = router