import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Buttons from '../sections/typography';



// 데이터 호출 클릭 이벤트 등등
// https://goddino.tistory.com/154

function MyPage(props) {

    const match = useRouteMatch();

    // *********************************************

    const [schedule, setSchedule] = useState([])

    const [scheName, setScheName] = useState([])

    const [airport, setAirport] = useState([])

    const [flight_info, setFlight_info] = useState([])

    const [flight_schedule, setFlight_schedule] = useState([])

    // *********************************************

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    // *********************************************


    const onScheNameHandler = (event) => {
        setScheName(event.currentTarget.value)
    }

    function getSchedules() {
        console.log('func 진입')
        axios.get('http://localhost:5000/api/mypage/schedules/638759c936462573ed5c6e23', {
            withCredentials: true
        })
            .then((response) => {
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


    console.log(scheName)

    console.log('**공항', airport, '**flight_info', flight_info, '**flight_schedule', flight_schedule)


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">상세 비행 일정</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="bottom-spacer">
                <div className="spacer" id="card-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="5" className='text-center'>
                                <h1 type="text" className="title" value={scheName} onChange={onScheNameHandler}>
                                    <br></br>
                                    🛫 {scheName} 🛬
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                </div>
                <div className= "form-control-dark">
                    <br></br>
                    <Container>
                        <Row className="justify-content-center" >
                            <Col md="4" className="text-center">
                                <h1 className="title">공항 정보</h1>
                                <br></br>
                                <h2>🛫 출발지 🛬</h2>
                                <br></br>
                                <h4>{airport.departure}</h4>
                                <br></br>
                                <h2>🛫 도착지 🛬</h2>
                                <br></br>
                                <h4>{airport.arrival}</h4>
                                <br></br>
                            </Col>
                            <Col md="4" className="text-center">
                                <h1 className="title">비행 정보</h1>
                                <br></br>
                                <h2>🛫 비행 편명 (iata 코드) 🛬</h2>
                                <br></br>
                                <h4>{flight_info.flight_iata}</h4>
                                <br></br>
                                <h2>🛫 결항여부 🛬</h2>
                                <br></br>
                                <h4>{flight_info.cancelled}</h4>
                                <br></br>
                                <h2>🛫 출국 게이트 🛬</h2>
                                <br></br>
                                <h4>{flight_info.gate_origin}</h4>
                                <br></br>
                                <h2>🛫 입국 게이트 🛬</h2>
                                <br></br>
                                <h4>{flight_info.destination}</h4>
                                <br></br>
                            </Col>
                            <Col md="4" className="text-center">
                                <h1 className="title">스케줄 정보</h1>
                                <br></br>
                                <h2>🛫 이륙 시각 🛬</h2>
                                <h4>{flight_schedule.scheduled_in}</h4>
                                <br></br>
                                <h2>🛫 착륙 시각 🛬</h2>
                                <h4>{flight_schedule.scheduled_out}</h4>
                                <br></br>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                </div>
                <div>
                    <br></br>
                    <Container>
                        <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-info"> 공유하기 </Button>
                        <Modal size="md" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle.bind(null)}>공유하기</ModalHeader>
                            <ModalBody>
                                여기 폼 넣어서 번호 입력받아서 /mypage/share로 보냄 <br></br>
                                이거 안되면.. 그냥 페이지 하나 만들어서 보내기
                            </ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button color="danger" onClick={toggle.bind(null)}> 확인 </Button>
                                <Button color="secondary" onClick={toggle.bind(null)}> 취소 </Button>
                            </ModalFooter>
                        </Modal>
                    </Container>


                </div>
            </div>
        </div>

    )
}

export default withRouter(MyPage)