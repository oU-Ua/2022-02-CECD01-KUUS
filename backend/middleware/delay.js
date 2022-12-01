const { sendMessage } = require('../middleware/smsapi')
const mongoose = require('mongoose')

const { Schedule } = require('../models/Schedule')
function detectDelay(schedule, flag) {
    if(flag.msgsent){
        console.log("msg sent already")
        return;
    }
    const { User } = require('../models/User')

    schedule.updateSchedule(schedule.flight_info.flight_iata, schedule.flight_schedule.scheduled_out, (err, doc)=>{
        var arrival_delay = doc.flight_schedule.delay.arrival_delay
        var scheduled_in = new Date(doc.flight_schedule.scheduled_in)
        var estimated_in = doc.flight_schedule.estimated_in
        var arrival_time;
        var predictable = true;
        var msg = `[${doc.ScheduleName}] `;
    
        if (scheduled_in !== null) {
            flag.no_schedule = false
            if (estimated_in == null) {
                // 좀 더 정확한 예정 알 수 없음
                arrival_time = scheduled_in
            }
            else {
                arrival_time = estimated_in
            }
        }
        else {
            flag.no_schedule = true
        }
        // in 정보 없는 경우
        if (flag.no_schedule) {
            if (arrival_delay !== null) {
                if (arrival_delay > 0) {
                    // 지연 발생
                    msg = msg + parseInt(arrival_delay / 60) + " 분 만큼 연착 예정"
                }
                else if (arrival_delay === 0) {
                    // 정시 도착
                    msg = msg + " 정시 도착 예정"
                }
                else if (arrival_delay < 0) {
                    // 일찍 도착
                    msg = msg + parseInt(arrival_delay / (-60)) + " 분 만큼 일찍 도착 예정"
                }
                msg = msg + "입니다."
            }
            else {
                predictable = false
            }
        }
    
        if (predictable) {
            // 메세지 안보냈으면
            if (!flag.msgsent) {
                // in 정보 있으면
                if (!flag.no_schedule) { // 문자 보내고 msgsent true
                    msg = msg + "도착 예정 시간은 " + arrival_time + " 입니다."
                    flag.msgsent = true
                }
                User.find({ sharedschedules: { $elemMatch: { _id: doc._id } } }, { phone: 1, _id: 0 }, (err, result) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log("phone result: " + result)
                    if (result.length === 0) return;
                    for (var i = 0; i < result.length; i++) {
                        sendMessage(msg, result[i].phone, (err) => {
                            if (err) {
                                console.log(result[i] + " error: " + err)
                                return
                            }
                        })
                    }
                    console.log("msg: " + msg);
    
                })
            }
        } else {
            msg = msg + " 도착 예정 시간 알 수 없음."
            console.log("예측 불가 메시지: " + msg)
        }
    
    })
    
}

module.exports = { detectDelay }

// var schedule = this
// var basetime = schedule.flight_schedule.scheduled_out
// var date1 = new Date(basetime)
// // console.log(date)
// // date.setMinutes(date.getMinutes()+10);
// var flag = { msgsent: false, no_schedule: false };
// var date2 = new Date(basetime)
// date2.setMinutes(date2.getMinutes() + 88)

// var date3 = new Date(basetime)
// date3.setMinutes(date3.getMinutes() + 89)
// var id = schedule._id.toString()
// nschedule.scheduleJob(date1, function () {
//     console.log("date: " + date1.toString())
//     var now = new Date()
//     console.log("now:" + now.toISOString())
//     console.log("id:" + id)
//     detectDelay(schedule, flag)
// })

// nschedule.scheduleJob(date2, function () {
//     console.log("date: " + date2.toString())
//     var now = new Date()
//     console.log("now:" + now.toISOString())
//     console.log("id:" + id)
//     detectDelay(schedule, flag)
// })

// nschedule.scheduleJob(date3, function () {
//     console.log("date: " + date3.toString())
//     var now = new Date()
//     console.log("now:" + now.toISOString())
//     console.log("id:" + id)
//     detectDelay(schedule, flag)
// })