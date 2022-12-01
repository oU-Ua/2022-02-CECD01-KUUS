import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';


// 데이터 호출 클릭 이벤트 등등
// https://goddino.tistory.com/154

function MyPage() {

    const match = useRouteMatch();
    const dispatch = useDispatch()

    const [schedule, setSchedule] = useState([])
    
    const [scheName, setScheName] = useState([])

    const [airport, setAirport] = useState([])

    const [flight_info, setFlight_info] = useState([])

    const [flight_schedule, setFlight_schedule] = useState([])



    const onScheNameHandler = (event) => {
        setScheName(event.currentTarget.value)
    }

    function getSchedules() {
        console.log('func 진입')
        axios.get('http://localhost:5000/api/mypage/schedules/638759c936462573ed5c6e23', {
            withCredentials: true
        })
            .then((response) => {
                setSchedule(response.data)
                setScheName(response.data.schedule.ScheduleName)
                setAirport(response.data.schedule["airports"])
                setFlight_info(response.data.schedule["flight_info"])
                setFlight_schedule(response.data.schedule["flight_schedule"])

            }).catch(function (error) {
                console.error(error)
            })
    }
    // axios.get('http://localhost:5000/api/mypage/638783419048fabb21ae6ff7')
    //     .then((response) => {
    //         setSchedules(response.data)
    //         console.log('schedules:' + JSON.stringify(schedules));
    //     }).catch(function (error) {
    //         console.error(error)
    //     })


    useEffect(function () {
        getSchedules()
    }, [])



    console.log('**공항', airport, '**flight_info', flight_info, '**flight_schedule', flight_schedule)

    console.log(schedule, scheName)

    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">비행 일정 상세</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bottom-spacer">
                <div className="spacer form-control-dark" id="card-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h1 type="text" value={scheName} onChange={onScheNameHandler}>
                                    <br></br>
                                    🛫 {scheName} 상세 보기 🛬
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div>
                    <Container>
                        <Row className="justify-content-center" >
                            <Col md="7" className="text-center">
                                <h1 className="title">
                                    <br></br>
                                    아아아아아아아아아아</h1>
                                <h1>아아아아아아아아아아</h1>
                                <h1>아아아아아아아아아아</h1>
                                <h1>아아아아아아아아아아</h1>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container>
                        <Row className="justify-content-center" >
                            <Col md="7" className="text-center">
                                <h2 className="title">상세상세상세상세</h2>
                                <h2 className="title">상세상세상세상세</h2>
                                <h2 className="title">상세상세상세상세</h2>
                                <h2 className="title">상세상세상세상세</h2>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>

    )
}

export default withRouter(MyPage)