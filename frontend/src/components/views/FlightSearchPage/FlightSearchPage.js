import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { Container, Row, Col } from 'reactstrap';


function FlightSearchPage(props) {
    const [departure, setdeparture] = useState("")
    const [arrival, setarrival] = useState("")
    const [flight_iata, setflight_iata] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")

    const [data, setData] = useState([]);


    const onDepartureHandler = (event) => {
        setdeparture(event.currentTarget.value)
    }
    const onArrivalHandler = (event) => {
        setarrival(event.currentTarget.value)
    }
    const onFlight_iataHandler = (event) => {
        setflight_iata(event.currentTarget.value)
    }
    const onDateHandler = (event) => {
        setdate(event.currentTarget.value)
    }
    const ontTimeHandler = (event) => {
        settime(event.currentTarget.value)
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        axios.defaults.headers.Cookie = '';
        
        var data = JSON.stringify({
            "departure": "인천",
            "arrival": "시애틀",
            "flight_iata": "OZ272",
            "date": "2022-11-25",
            "time": "18:05"
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/flightsearch',
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'connect.sid=s%3A_ssjokE1UOgjBbc2Aqq3qTTx746evAF9.w70x2xxpzo2u0TikR5BtYGFPKRC%2F0FMy%2BA2SV98o2R4'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setData(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });


    }


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">비행서치</h4>
                        </Col>
                    </Row>
                </Container>    
            </div>
            <div className="spacer">
                <h2 style={{color:'red'}} >이 페이지는 테스트 중입니다!!!!!!</h2>
                <Container>
                    <form onClick={onClickHandler}  style={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <label>departure</label>
                        <input type="text" id='departure' value={departure} onChange={onDepartureHandler}/>
                        <label>arrival</label>
                        <input type="text" value={arrival} onChange={onArrivalHandler}/>
                        <label>flight_iata</label>
                        <input type="text" value={flight_iata} onChange={onFlight_iataHandler}/>
                        <label>date</label>
                        <input type="text" value={date} onChange={onDateHandler}/>
                        <label>time</label>
                        <input type="text" value={time} onChange={ontTimeHandler}/>

                        <button type="submit">submit</button>                        
                    </form>
                </Container> 
                <Container>
                    <p>departure: {departure}</p>
                    <p>arrival: {arrival}</p>
                    <p>flight_iata: {flight_iata}</p>
                    <p>date: {date}</p>
                    <p>time: {time}</p>
                </Container>
                <Container>
                    <p>결과(이따가 정리하겠음): {data}</p>
                </Container>

            </div>
        </div>
        
    )
}

export default withRouter(FlightSearchPage)