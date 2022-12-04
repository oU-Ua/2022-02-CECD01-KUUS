import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';

// 무한반복 해결하기 
// https://sir.kr/qa/422561

function MyPage(props) {
    
    // const id = props.match.params.id;

    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [mySchedule, setMySchedule] = useState([])
    const [sharedSchedule, setSharedSchedule] = useState([])

    const [mySchedule2, setMySchedule2] = useState([])
    const [sharedSchedule2, setSharedSchedule2] = useState([])

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const toggle1 = () => {
        setModal1(!modal1);
    }
    const onClickHandler = (event) => {
        setModal(!modal);
    }

    async function getUsers() {
        dispatch(auth())
            .then(response =>
                axios.get('http://localhost:5000/api/mypage', {
                    withCredentials: true
                })
                    .then((response) => {
                        // console.log('front MyPage.js입니다 response: ')
                        // console.log(response)
                        setUsers(response.data)
                        // console.log('front MyPage.js입니다 response.data:');
                        console.log('users:', response.data)
                        // const myschedules = response.data["myschedules"]
                        setMySchedule(response.data["myschedules"][0])

                        const myschedules = response.data["myschedules"]
                        setMySchedule2(response.data["myschedules"][1])

                        // // setScheAuthor(response.data["myschedules"][0].author)
                        // setSharedSchedule(response.data["sharedschedules"][0])

                        // // setScheAuthor(response.data["myschedules"][0].author)
                        // setSharedSchedule2(response.data["sharedschedules"][1])

                    }).catch(function (error) {
                        console.error(error)
                    })
            )
    }

    useEffect(function () {
        getUsers()
    }, [])

    function myScheClick(e) {
        window.location.href = `http://localhost:3000/mypage/schedules/${mySchedule._id}`
    }
    function sharedScheClick(e) {
        window.location.href = `http://localhost:3000/mypage/schedules/${sharedSchedule._id}`
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
                                    {users.name}님 환영합니다 !</h2>
                                <h6 className="subtitle">{users.email}</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{mySchedule.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button type="button" onClick={() => props.history.push(`/mypage/schedules/${mySchedule._id}`)} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">공유받은 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{sharedSchedule.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button onClick={sharedScheClick} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히 보기</Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{mySchedule2.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button type="button" onClick={myScheClick} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">공유받은 일정</h3>
                            <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{sharedSchedule2.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button onClick={sharedScheClick} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히 보기</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)