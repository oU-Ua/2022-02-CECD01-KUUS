import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import { scheduleJob } from 'node-schedule';
import MyPageSchedule from './MyPageSchedule';

// 무한반복 해결하기 
// https://sir.kr/qa/422561

function MyPage() {


    function mypageClick(e) {
        window.location.href = 'http://localhost:3000/mypage'
    }


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title"></h4>
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
                                    공유 완료 </h2>
                                <h6 className="subtitle">문자를 확인하세요!</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Col className="text-center">
                    <Button outline color="warning" onClick={mypageClick}>마이페이지로 돌아가기</Button>
                    </Col>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)