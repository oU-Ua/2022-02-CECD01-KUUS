import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';


// 데이터 호출 클릭 이벤트 등등
// https://goddino.tistory.com/154

function MyPage(props) {

    const match = useRouteMatch();
    const dispatch = useDispatch()

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
                                    🛫 {scheName} 🛬
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
                                <br></br><br></br>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container>
                        {/* <Row className="justify-content-center" >
                            <Col md="7" className="text-center">
                                <Button color="success font-size-30"> 공유하기 </Button>{' '}
                            </Col>
                        </Row> */}
                        <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary"> 공유하기 </Button>
                        <Modal size="md" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle.bind(null)}>공유하기</ModalHeader>
                            <ModalBody>
                                여기 폼 넣어서 번호 입력받아서 /mypage/share로 보냄 <br></br>
                                이거 안되면.. 그냥 페이지 하나 만들어서 보내기
                            </ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button color="primary" onClick={toggle.bind(null)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </Container>
                    
                    
                </div>
            </div>
        </div>

    )
}

export default withRouter(MyPage)