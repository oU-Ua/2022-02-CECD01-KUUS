// 한국공항공사 API
// https://presentlife-coding.tistory.com/entry/nodejs-공공데이터포털-API-데이터-가져오기
// 국제선 운항 스케줄
// 편명 통해서 현재 운항 정보 조회
var request = require('request');
const { service_Key } = require('../config/dev');

const url = 'http://openapi.airport.co.kr/service/rest/IflightScheduleList/getIflightScheduleList';
const queryParams = '?' + 'ServiceKey=' + service_Key ; /* Service Key*/
const flightCode = '&' + 'schFlightNum=' // 편명 받아오기


request({
    url: api_url,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
