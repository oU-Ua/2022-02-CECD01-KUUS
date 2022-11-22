const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const { Airport } = require('../models/Airports');
router.use(bodyParser.json());

// req 입력값: 출발지, 도착지, 항공편명
router.get('/', (req, res) => {
    Airport.findByNames(req.body.departure, req.body.arrival, (err, results)=>{
        if(err){
            res.status(400).send(err)
            return;
        }
        else {
            //console.log(results);
            // 출력 및 db 저장을 위한 json 객체틀
            var json = {
                departure: "",
                dep_iata:"",
                arrival:"",
                arr_iata:"",
                Flight_No: req.body.flight_iata
            }
            results.forEach(result => {
                //console.log("result " + result)
                // 검색한 지역명이 검색 결과의 공항명에 포함되는지에 따라 출발지와 도착지 구분해 저장
                if(result.airport_name.includes(req.body.departure)){
                    json.departure = result.airport_name
                    json.dep_iata = result.iata_code
                }
                else{
                    json.arrival = result.airport_name
                    json.arr_iata = result.iata_code
                }
            });
            res.status(200).send(json);
        }
    })
})
module.exports = router