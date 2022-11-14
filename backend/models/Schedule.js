// 유저의 비행 일정 담을 database

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { User } = require('./User');

var scheSchema = mongoose.Schema({
    "name": {
        type: String,
        maxlength: 10
    },
    "Flight_No" : {
        type: String,
        maxlength: 10
    },
    "From" : String,
    "To": String,
    "Dep_Time": Date,
    "Gate": String,
})



// 현재 id에 속한 모든 비행 일정 가져오는 함수
// user의 id
module.exports.getAllScheById = function (curUser) {
    return new Promise(function (res, rej) {
        Sches.find({ _id: curUser._id })
            .then((scheData) => {
                    res(scheData);
            }).exec()
            .catch((err) => {
                rej("비행 일정이 없습니다!");
            })
        })
}


// Flight No. 이용해서 비행기 정보 조회하는 함수



const Schedule = mongoose.model('Schedule', scheSchema)
//다른 파일에서도 모듈을 쓸 수 있게
module.exports = { Schedule }