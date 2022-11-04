const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

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
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = function (plainPassword, callback) {
    // 입력받은 비밀번호를 암호화해 저장된 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function (callback) {

    var user = this;
    // jsonwebtoken을 이용해 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function (err, user) {
        if (err) return callback(err);
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        user.findOne({ "_id": decoded, "token": token }, function(err, user){
            if(err) return callback(err);
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }