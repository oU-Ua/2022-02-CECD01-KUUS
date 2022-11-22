const mongoose = require('mongoose')
const express = require('express')

const airportSchema = mongoose.Schema({
    // 한글명(영문명)
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

// 공항 이름 검색 기능
// 사용자 편의를 위해 공항이 위치한 지역명으로 검색할 수 있도록 하는 기능
// DB에 저장된 공항 이름을 가지고 검색을 수행하고, iata 코드를 받아옴
// 잘못된 입력 등으로 인해 중복 결과 출력 가능성 있어 완벽하진 않은 상태
airportSchema.statics.findByNames = function (departure, arrival, callback) {
    // 출발지 도착지를 합쳐서 검색 수행, 출력은 공항명과 iata 코드만 출력하도록 함
    Airport.find({ $text: { $search: departure +" "+ arrival} }, { "airport_name": 1, "iata_code": 1, "_id": 0 }, function (err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        else{
            console.log(results)
            callback(null, results)
        }
    })

}
const Airport = mongoose.model('Airport', airportSchema)

module.exports = { Airport }

