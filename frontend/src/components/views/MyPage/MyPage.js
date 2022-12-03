import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, BrowserRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption,
} from 'reactstrap';

import { auth } from '../../../_actions/user_action';

// 무한반복 해결하기 
// https://sir.kr/qa/422561

function MyPage({ match }) {

    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [mySchedule, setMySchedule] = useState([])
    const [sharedSchedule, setSharedSchedule] = useState([])
    const [phone, setPhone] = useState([]);

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const toggle1 = () => {
        setModal1(!modal1);
    }
    const onClickHandler = (event) =>{
        setModal(!modal);
    }
    const handleChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setPhone(e.target.value);
        }
      }
    
    

    function detailClick(e) {
        window.location.href = 'http://localhost:3000/mypage/schedules/638759c936462573ed5c6e23'
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
                        console.log(response.data)
                        // const myschedules = response.data["myschedules"]
                        setMySchedule(response.data["myschedules"][0])
                        // setScheAuthor(response.data["myschedules"][0].author)
                        setSharedSchedule(response.data["sharedschedules"][0])

                    }).catch(function (error) {
                        console.error(error)
                    })
            )

    }

    useEffect(function () {
        getUsers()
    }, [])

    useEffect(() => {
        if (phone.length === 10) {
          setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phone.length === 13) {
          setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
      }, [phone]);

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
                                <Button type="button" onClick={onClickHandler} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">일정 공유하기</Button>
                                <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} >
                                        <ModalHeader toggle={toggle.bind(null)}>일정 공유하기</ModalHeader>
                                        <ModalBody>
                                        <p> <h4 className="title">누구와 공유하고 싶으신가요 ? </h4> </p>
                                        공유하고 싶은 사람의 전화번호를 입력해주세요 <br/>
                                        <input type="text" onChange={handleChange} value={phone} />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={toggle.bind(null)}>공유하기</Button>{' '}
                                            <Button color="secondary" onClick={toggle.bind(null)}>나가기</Button>
                                        </ModalFooter>
                                </Modal>
                                <Button type="button" onClick={onClickHandler} className="btn btn-block waves-effect waves-light btn-outline-danger m-b-30">자세히보기</Button>
                            </Card>
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">공유받은 일정</h3>
                            <Card body className="card-shadow">
                            <CardTitle className='font-bold display-7'>{sharedSchedule.ScheduleName}</CardTitle>
                                <CardText></CardText>
                                <Button onClick={detailClick}>자세히 보기</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(MyPage)