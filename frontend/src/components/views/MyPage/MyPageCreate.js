import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { auth } from '../../../_actions/user_action';
import { useState } from 'react';


function MyPage(props) {

    // const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    
    var config = {
        method: 'get',
        url: 'http://localhost:5000/api/mypage/create',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    try {
        console.log('try진입')
        axios(config)
            .then(response => setUsers(JSON.stringify(response)))
        console.log('users:' + JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }

    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">마이페이지</h4>
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
                                    {users.name}님 환영합니다.</h2>
                                <h6 className="subtitle">{users.email}</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row md = "6">
                        <Col md="6">
                            <h3 className="title font-bold text-center">일정 등록하기</h3>
                            <Form>
                                <FormGroup >
                                    <Label>Schedule Name</Label>
                                    <Input/>
                                </FormGroup>
                                <FormGroup >
                                    <Label>author</Label>
                                    <h3>{users.email}</h3>
                                </FormGroup>
                                <FormGroup >
                                    <Label>받아온 정보 자동 입력</Label>
                                    <Input/>
                                </FormGroup>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)