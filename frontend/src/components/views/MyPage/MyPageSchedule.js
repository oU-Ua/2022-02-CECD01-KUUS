import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';


// 데이터 호출 클릭 이벤트 등등
// https://goddino.tistory.com/154

function MyPage(props) {

    const match = useRouteMatch();


    const [schedules, setSchedules] = useState([]);

    async function getSchedules() {
        console.log('func 진입')
        axios.get('http://localhost:5000/api/mypage/:id')
            .then((response) => {
                setSchedules(response.data)
                console.log('schedules:' + JSON.stringify(schedules));
            }).catch(function (error) {
                console.error(error)
            })
    }

    useEffect(function () {
        getSchedules()
    }, [])

    console.log(schedules)

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
                                <h2 className="title font-bold">
                                    🛫{schedules.author}님의 비행 일정🛬</h2>
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