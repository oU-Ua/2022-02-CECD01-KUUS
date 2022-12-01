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

    const [schedules, setSchedules] = useState([]);
    const [scheName, setScheName] = useState([])
    const [scheAuthor, setScheAuthor] = useState([])

    const onScheduleHandler = (event) => {
        setSchedules(event.currentTarget.value)
    }


    function getSchedules() {
        console.log('func 진입')

        dispatch(auth())
            .then(response =>
                axios.get('http://localhost:5000/api/mypage/638783419048fabb21ae6ff7', {
                    withCredentials: true
                })
                    .then((response) => {
                        console.log('front MyPage-스케줄입니다 response: ')
                        console.log(response)
                        setSchedules(response.data)
                        // console.log('front MyPage-스케줄입니다 response.data:');
                        // console.log(JSON.stringify(response.data))
                        setScheName(JSON.stringify(response.data["schedule"].ScheduleName))
                        setScheAuthor(JSON.stringify(response.data["schedule"].author))
                    }).catch(function (error) {
                        console.error(error)
                    })
            )

        // axios.get('http://localhost:5000/api/mypage/638783419048fabb21ae6ff7')
        //     .then((response) => {
        //         setSchedules(response.data)
        //         console.log('schedules:' + JSON.stringify(schedules));
        //     }).catch(function (error) {
        //         console.error(error)
        //     })
    }

    useEffect(function () {
        getSchedules()
    }, [])

    console.log('프론트 마이페이지 스케줄! schedules: ')
    console.log(schedules)
    // get 안됨 수정 필요

    console.log('프론트 마이페이지 스케줄! scheName: ')
    console.log(scheName)

    console.log('프론트 마이페이지 스케줄! scheAuthor: ')
    console.log(scheAuthor)

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
                <div className="spacer" id="card-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h2 type = "text" value={scheName} onChange={onScheduleHandler}>
                                    🛫{scheAuthor}님의 {scheName} 일정🛬</h2>
                                <h6 className="subtitle">{schedules.email}</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle>일정1</CardTitle>
                                <CardText>뉴욕출장</CardText>
                                <Button>자세히 보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle>일정2</CardTitle>
                                <CardText>파리 출장</CardText>
                                <Button>자세히 보기</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)