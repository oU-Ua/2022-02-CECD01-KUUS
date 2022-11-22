const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path');
const csv_name = "국토교통부_세계공항코드_20211231.csv"
const config = require('../config/dev');
const { Airport } = require('../models/Airports');

// 맨 처음 공항 db 구축을 위해 한 번만 실행 필요
// setairportdb만 따로 실행해 공항 db 저장하도록 함
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => console.log('몽고디비 연결됨'))
    .catch(err => console.log(err))

// 공항 db csv 파일 읽어오기
var csvPath = path.join(__dirname, '..', 'resources', csv_name)
// console.log("경로: " + csvPath);
const csv = fs.readFileSync(csvPath, "utf-8");
var rows = csv.split('\r\n')
for(var row =1; row<rows.length; row++){
    var columns = rows[row].split(',')

    // 잘 읽혔는지 테스트
    if(row===1){
        console.log(columns)
    }
    // 공항 정보 만들어서 저장
    const airport = new Airport({
        airport_name: columns[1] + '(' + columns[0] +')',
        iata_code: columns[2],
        icao_code: columns[3]
    })
    airport.save();
}