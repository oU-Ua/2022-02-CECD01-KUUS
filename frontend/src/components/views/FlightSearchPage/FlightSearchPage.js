import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';


function FlightSearchPage(props) {
    const [Flight_iata, setFlight_iata] = useState("")
    const [Dep_iata, setDep_iata] = useState("")

    const onFlightHandler = (event) => {
        setFlight_iata(event.currentTarget.value)
    }
    const onDepHandler = (event) => {
        setDep_iata(event.currentTarget.value)
    }

    const onClickHandler = () => {
        axios.post("/api/schedules/find", {
            flight_iata: Flight_iata,
            dep_iata: Dep_iata
        })
        .then(function (response) {
             // response  
        }).catch(function (error) {
            console.log(error)
        }).then(function() {
            // 항상 실행
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
                <h2 style={{color:'red'; text}} >이 페이지는 테스트 중입니다!!!!!!</h2>
                <Container>
                    <form onSubmit={onClickHandler} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <label>Flight_iata</label>
                        <input type="text" id="flight_iata" value={Flight_iata} onChage={onFlightHandler}/>
                        <label>Dep_iata</label>
                        <input type="text" id="flight_iata" value={Dep_iata} onChange={onDepHandler}/>
                        <button type="submit">submit</button>
                    </form>
                </Container> 
            </div>
        </div>
        
    )
}

export default withRouter(FlightSearchPage)