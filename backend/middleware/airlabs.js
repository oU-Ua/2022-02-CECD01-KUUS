const request = require("request");
const api_base = "https://airlabs.co/api/v9/";

//AirLabs API 호출
//method: flights(항공기 위치), schedules(비행일정)
//flight: 항공편명(iata code), departuer: 출발지(공항 iata)
//output: 출력 항목(flights = "lat, lng" / schedules = "dep_iata, dep_time, arr_iata, arr_time")
function callAirLabs(method, flight_iata, dep_iata, params, cb) {
    params.dep_iata = dep_iata;
    params.flight_iata = flight_iata;
    // console.log(params); // param 입력 확인용
    request.post({ url: `${api_base}${method}`, form: params }, cb);
}
module.exports = { callAirLabs };

