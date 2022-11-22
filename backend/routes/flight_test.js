// 한국공항공사 API
// https://presentlife-coding.tistory.com/entry/nodejs-공공데이터포털-API-데이터-가져오기
// 국제선 운항 스케줄
// 편명 통해서 현재 운항 정보 조회

// https://ibks-platform.tistory.com/176
// https://cocoon1787.tistory.com/725

var request = require('request');

const url = 'http://openapi.airport.co.kr/service/rest/IflightScheduleList/getIflightScheduleList';
const queryParams = '?' + 'ServiceKey=' + '5ANUagHqskcuYSFSCldX5N43I%2BDvU3GS8OeZ2rHWebT%2FKq%2Fs%2Fxr4QFnXV%2FmNsylzruanUZMuHsHG9KIMaXEVKg%3D%3D' ; /* Service Key*/
const flightCode = '&' + 'schFlightNum=' // 편명 받아오기

// const api_url = 'http://openapi.airport.co.kr/service/rest/flightScheduleList/getIflightScheduleList?ServiceKey=5ANUagHqskcuYSFSCldX5N43I%2BDvU3GS8OeZ2rHWebT%2FKq%2Fs%2Fxr4QFnXV%2FmNsylzruanUZMuHsHG9KIMaXEVKg%3D%3D&schAirLine=KE&schFlightNum=705&PageNo=1'
// const api_url = 'http://openapi.airport.co.kr/service/rest/FlightScheduleList/getIflightScheduleList?serviceKey=5ANUagHqskcuYSFSCldX5N43I%2BDvU3GS8OeZ2rHWebT%2FKq%2Fs%2Fxr4QFnXV%2FmNsylzruanUZMuHsHG9KIMaXEVKg%3D%3D&schDate=20151005&schDeptCityCode=NRT&schArrvCityCode=ICN&schAirLine=KE&schFlightNum=KE705'


request({
    url: api_url,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
