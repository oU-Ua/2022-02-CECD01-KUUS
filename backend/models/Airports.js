const mongoose = require('mongoose')

const airportSchema = mongoose.Schema({

    airport_name: {
        type: String
    },
    iata_code: {
        type: String,
        unique: true
    },
    icao_code: {
        type: String,
        unique: true
    }

})

// 공항 이름 검색 기능 추가 예정
// 사용자 편의를 위해 공항이 위치한 지역명으로 검색할 수 있도록 하는 기능
// DB에 저장된 공항 이름을 가지고 검색을 수행하고, iata 코드를 받아오려함
// airportSchema.statics.findByName = function(name, callback){
//     Airport.find()
//     .where('korean_name').
// }
const Airport = mongoose.model('Airport', airportSchema)

module.exports = { Airport }

