const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
const { DateTime } = require('luxon')
const { Airport } = require('../models/Airports');
const { getFlight, refineResult } = require('../middleware/flightaware')
router.use(bodyParser.json());

// req 입력값: departure, arrival, flight_iata, date(YYYY-MM-DD), time(HH:MM)
router.get('/', (req, res) => {
    Airport.findByNames(req.body.departure, req.body.arrival, (err, results) => {
        if (err) {
            res.status(400).send(err)
            return;
        }
        else {
            //console.log(results);
            // 사용자에게 입력받은 출발일, 출발시간 처리부분
            // flightaware에서 요구하는 형식으로 변환해 저장
            var daytime = DateTime.fromISO(req.body.date + "T" + req.body.time + ":00");
            daytime.numberingSystem
            var time_kr = daytime.toISO({ suppressMilliseconds: true })
            var time_utc = daytime.toUTC().toISO({ suppressMilliseconds: true })
            // 출력 및 db 저장을 위한 json 객체틀
            var airports = {
                departure: "",
                dep_iata: "",
                arrival: "",
                arr_iata: "",
            }
            var flight_schedule = {
                dep_time_utc: time_utc,
            }
            var flight_info = {
                flight_iata: "",
            }
            results.forEach(result => {
                // 검색한 지역명이 검색 결과의 공항명에 포함되는지에 따라 출발지와 도착지 구분해 저장
                if (result.airport_name.includes(req.body.departure)) {
                    airports.departure = result.airport_name
                    airports.dep_iata = result.iata_code
                }
                else {
                    airports.arrival = result.airport_name
                    airports.arr_iata = result.iata_code
                }

            });
        }
        var flight_iata = req.body.flight_iata
        // flightaware api 통해 검색
        getFlight(flight_iata, flight_schedule.dep_time_utc, (err, result) => {
            if (err) {
                res.status(400).send(err)
                return;
            }
            else {
                var fa_result = JSON.parse(result.body).flights[0]
                // console.log(fa_result)
                // 받아온 정보 처리
                refineResult(fa_result, (info, schedule) => {
                    flight_info = info
                    flight_info.flight_iata = flight_iata
                    flight_schedule = schedule
                    flight_schedule.dep_time_kr = time_kr
                })
            }
            // 이걸 가지고 일정 등록 수행
            res.status(200).send({ airports, flight_info, flight_schedule })
        })
    })
})

module.exports = router