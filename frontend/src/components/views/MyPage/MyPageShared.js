import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { auth } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';


function MyPage(props) {

    // const dispatch = useDispatch();

    const [users, setUsers] = useState([]);

    useEffect(() => {

        

        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/mypage',
            headers: {
                'Content-Type': 'application/json',
            },
        };


        try {
            axios(config)
                .then(response => setUsers(response))
            console.log('users:' + JSON.stringify(users));
        } catch (error) {
            console.log(error);
        };


    }, [])

    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">공유받은 일정</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="spacer">
                <Container>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">일정1</h3>
                            <Card body className="card-shadow">
                                <CardTitle>일정 타이틀</CardTitle>
                                <CardText>내용</CardText>
                                <Button>자세히 보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">일정2</h3>
                            <Card body className="card-shadow">
                                <CardTitle>일정 타이틀</CardTitle>
                                <CardText>내용</CardText>
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