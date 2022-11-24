// 유저의 비행 일정 담을 database

const mongoose = require('mongoose')

const { User } = require('./User');

var scheSchema = mongoose.Schema({
    "ScheduleName": {
        type: String,
        default: "MySchedule",
        required: true
    },
    "Flight_No" : { // iata code
        type: String,
        required: true
    },
    "author": {
        type: String,
    },
    "departure":{
        type: String,
    },
    "dep_iata":{
        type: String,
    },
    "arrival":{
        type: String,
    },
    "arr_iata":{
        type: String,
    },
    // 시간 형식은 ISO 8601, YYYY-MM-DD T HH:MM:SS
    "dep_time_kr":{
        type: String,
    },
    "dep_time_utc":{
        type: String
    }

    // IATA 형식으로 입력
    // "From" : String,
    // "To": String,
    // "Dep_Time": Date,
    // "Gate": String,
    // 나머지는 api 이용해서 받아옴
})






const Schedule = mongoose.model('Schedule', scheSchema)
//다른 파일에서도 모듈을 쓸 수 있게
module.exports = { Schedule }