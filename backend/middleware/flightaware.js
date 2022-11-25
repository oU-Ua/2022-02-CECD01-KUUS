var request = require('request');
const { fa_key } = require('../config/dev');
//const url = 'https://aeroapi.flightaware.com/aeroapi/airports/KSFO/flights'
// const url = 'https://aeroapi.flightaware.com/aeroapi/flights/UAL1702-1669011309-fa-0027/map'
const url = 'https://aeroapi.flightaware.com/aeroapi/flights/'
// 일정 검색 시간 utc로 변경 필요
// utc 기준 이틀까지만 등록이 가능

var options = {
    headers: {
        "x-apikey": fa_key
    },
    method: 'GET',
    uri: '',
    qs: {
        start: ''
    }
}

// flights/{id}/map



// flights/{ident}
// 항공편명, 출발 시간 사용해 항공편 검색
// 몇몇 항공기의 경우 iata code로 검색이 안되는 문제가 존재(icao로 검색 가능)
function getFlight(flight_iata, dep_time_utc, callback) {
    options.uri = url + flight_iata;
    options.qs.start = dep_time_utc;
    request.get(options, callback)
}

// api로 받아온 정보 처리
function refineResult(fa_result, callback) {
    var info = {
        fa_flight_id: fa_result.fa_flight_id,
        cancelled: fa_result.cancelled,
        status: fa_result.status,
        gate_origin: fa_result.gate_origin,
        gate_destination: fa_result.gate_origin
    }

    var schedule = {
        scheduled_out: fa_result.scheduled_out,
        estimated_out: fa_result.estimated_out,
        actual_out: fa_result.actual_out,
        scheduled_in: fa_result.scheduled_in,
        estimated_in: fa_result.estimated_in,
        actual_in: fa_result.actual_in
    }
    callback(info, schedule)
}
module.exports = { getFlight, refineResult };
