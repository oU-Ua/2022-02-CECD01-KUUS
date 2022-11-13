// 유저의 비행 일정 담을 database

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

// 로그인 여부 확인
module.exports.ensureLogin = function (req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }


// 비행일정 만드는 함수
// Name은 현재 유저 (curUser)에서 가져옴
// curUser는 routes/myPage.js에서 req.session.user로 보내줌
module.exports.createSche = function (scheData, curUser) {
    return new Promise(function (res, rej) {
        let newSchedule = new Sches(scheData);
        newSchedule.name = curUser.name;
        newSchedule.save((err) => {
            if (err) {
                console.log(err);
                rej();
            } else {
                res();
            }
        })
    })
}


// 현재 id에 속한 모든 비행 일정 가져오는 함수
// user의 id
module.exports.getAllScheById = function (curUser) {
    return new Promise(function (res, rej) {
        Sches.find({ name: curUser.name })
        // name이 같으면 어떻게 처리하징? 🙄
            .then((scheData) => {
                    res(scheData);
            }).exec()
            .catch((err) => {
                rej("비행 일정이 없습니다!");
            })
        })
}


// Flight No. 이용해서 비행기 정보 조회하는 함수

