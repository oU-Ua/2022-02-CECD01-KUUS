import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';


function MyPage(props) {
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
        <div className="static-slider-head-top static-slider-head">
            <Container>
                <Row className="justify-content-center" >
                    <Col md="7" className="text-center">
                        <h4 className="title">마이페이지</h4>
                    </Col>
                </Row>
            </Container>      
        <Container>
        </Container>            
    </div>
    )
}

export default withRouter(MyPage)