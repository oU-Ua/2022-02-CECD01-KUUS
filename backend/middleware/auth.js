//모델에서 유저를 가지고 온다.
const { User } = require('../models/User'); 

//권한 인증처리를 하는 곳
let auth = (req, res, next) => {
    
    // 클라이언트 쿠키에서 토큰을 가져오고 
    let token = req.cookies.x_auth;
    // 복호화해 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        //유저가 없을 때
        if(!user) return res.json({isAuth: false, error: true})
        //유저가 있을 때 리퀘스트에 정보 다 넣어줌
        req.token = token;
        req.user = user;
        //미들웨어 다음으로 findbyToken(index.js)으로 감
        next();
    })
}

//타 파일에서도 auth쓸 수 있게 내보냄
module.exports = { auth };