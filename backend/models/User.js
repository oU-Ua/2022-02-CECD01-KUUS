const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { Schedule } = require('./Schedule')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 10
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    // User에 저장되는 일정목록은 저장공간의 효율을 생각해 id와 이름만 저장
    // 자신이 등록한 일정, _id는 일정의 _id를 그대로 받아온다
    myschedules: [
        {
            ScheduleName: String,
            _id: Object
        }
    ],
    // 공유받은 일정 목록은 author까지 저장
    sharedschedules: [{
        ScheduleName: String,
        author: String,
        _id: Object
    }]

})


//비밀번호를 암호화한 후 save로 넘길거임
//user모델에 'save'하기 전(pre)에 할 동장
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            //user.password는 순수한 비밀번호, hash가 암호화된 비밀번호
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                //성공하면 hash로 비밀번호를 바꿔줌
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, callback) {
    // 입력받은 비밀번호를 암호화해 저장된 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        //맞으면 트루값을 리턴        
        callback(null, isMatch)
    })
}

//jsonwebtoken을 이용해서 비밀번호를 비교하고 저장된 것과 맞는지 비교한다.
userSchema.methods.generateToken = function (callback) {
    var user = this;
    //db에 있는 아이디를 말한다.
    //'secretToeken'을 넣으면 user_id가 나온다. 토큰으로 유저를 알 수 있다.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function (err, user) {
        if (err) return callback(err);
        //에러없이 세이브됐으면 유저 정보만 보내준다.
        callback(null, user)
    })
}

//토큰을 가져와서 decode하는 부분(auth관련)
userSchema.statics.findByToken = function (token, callback) {
    var user = this;
    // 토큰 decode
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //유저아이디로 유저찾고 클라이언트에서 가져온 토큰과 DB토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return callback(err);
            //에러없으면 유저정보 줌
            callback(null, user)
        })
    })
}
//스키마는 모델이 감싸야한다.
const User = mongoose.model('User', userSchema)
//다른 파일에서도 모듈을 쓸 수 있게
module.exports = { User }