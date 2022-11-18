// 유저의 비행 일정 담을 database

const mongoose = require('mongoose')

const { User } = require('./User');

var scheSchema = mongoose.Schema({
    
    "Flight_No" : {
        type: String,
        maxlength: 10
    },
    "From" : String,
    "To": String,
    "Dep_Time": Date,
    "Gate": String,
})






const Schedule = mongoose.model('Schedule', scheSchema)
//다른 파일에서도 모듈을 쓸 수 있게
module.exports = { Schedule }