// 비행 일정 담을 database

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = require('./User');

var scheSchema = new Schema({
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

var Sches = mongoose.model('sches', scheSchema);

// 비행일정 만드는 함수
// Name은 현재 유저 (curUser)에서 가져옴
// curUser는 routes/myPage.js에서 req.session.user로 보내줌
module.exports.createSche = function (scheData, curUser) {
    return new Promise(function (res, rej) {
        let newSche = new Sches(scheData);
        newSche.name = curUser.name;
        newSche.save((err) => {
            if (err) {
                console.log(err);
                rej();
            } else {
                res();
            }
        })
    })
}


// id에 따라 비행 일정 가져오는 함수
// user의 id
module.exports.getScheById = function (scheData, curUser) {
    return new Promise(function (res, rej) {
        Sches.find({ name: curUser.name })
        // name이 같으면 어떻게 처리하징? 🙄
            .then(() => {
                    res(scheData);
            }).exec()
            .catch((err) => {
                rej("비행 일정이 없습니다!");
            })
        })
}


// Flight No. 이용해서 비행기 위치 조회하는 함수

