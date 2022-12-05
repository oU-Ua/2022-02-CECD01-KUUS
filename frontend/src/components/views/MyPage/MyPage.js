import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, BrowserRouter,Link } from 'react-router-dom';
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

    ////성민
    const [mine, setMine] = useState([])
    const [yours, setYours] = useState([])
    /////성민끝
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
                        console.log("ddd",typeof(response))
                        console.log("sss",typeof(response.data['myschedules']))
                        // console.log('front MyPage.js입니다 response.data:');
                        console.log('users:', response.data)
                        console.log('공유:', response.data["sharedschedules"])
                        console.log('내꺼:', response.data["myschedules"])
                        setMine(response.data['myschedules'])
                        setYours(response.data["sharedschedules"])
                        // const myschedules = response.data["myschedules"]
                        setMySchedule(response.data["myschedules"][0])

                        setMySchedule2(response.data["myschedules"][1])

                        setSharedSchedule(response.data["sharedschedules"][0])

                        setSharedSchedule2(response.data["sharedschedules"][1])

                    }).catch(function (error) {
                        console.error(error)
                    })
            )
    }

    useEffect(function () {
        getUsers()
    }, [])

    const [id, setId] = useState([])
    function myScheClick(e) {
        window.location.href = `http://localhost:3000/mypage/schedules/${id}`
    }
    function sharedScheClick(e) {
        window.location.href = `http://localhost:3000/mypage/schedules/${id}`
    }

    function test(id){
        window.location.href = `http://localhost:3000/mypage/schedules/${id}`
    }

    console.log(sharedSchedule)

    // this.mySchedule.map((val, index) => {
    //     console.log(val)
    // })




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
                                    김동국님 환영합니다 !</h2>
                                <h6 className="subtitle">kuus07@gmail.com</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Row>
                        <Col md="6">
                            <h3 className="title font-bold text-center">나의 일정</h3>

                            <div>                            
                                {
                                    mine.map((it)=>(
                                        <Card body className="card-shadow">
                                        <CardTitle className='font-bold display-7'>{it.ScheduleName}</CardTitle>
                                        <CardText>자세히 보기를 눌러보세요!</CardText>
                                            <Button onClick={() => props.history.push(`/mypage/schedules/${it._id}`)} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히 보기</Button>
                                       
                                    </Card>
                                    ))
                                }
                            </div>
                            {/* <Card body className="card-shadow">
                                <CardTitle className='font-bold display-7'>{mySchedule.ScheduleName}</CardTitle>
                                <CardText>자세히 보기로 더 알아보기</CardText>
                                <Button type="button" onClick={() => props.history.push(`/mypage/schedules/${mySchedule._id}`)} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히보기</Button>                            </Card> */}
                        </Col>
                        <Col md="6">
                            <h3 className="title font-bold text-center">공유받은 일정</h3>

                            <div>                            
                                {
                                    yours.map((it)=>(
                                        // <div>
                                        //     <div>스케줄명: {it.ScheduleName}</div>
                                        //     <div>작성자: {it.author}</div>
                                        //     <div>스케줄아이디: {it._id}</div>
                                        // </div>
                                        <Card body className="card-shadow">
                                        <CardTitle className='font-bold display-7'>{it.ScheduleName}</CardTitle>
                                        <CardText>일정 주인: {it.author}</CardText>
                                        <Button onClick={() => props.history.push(`/mypage/schedules/${it._id}`)} className="btn btn-block waves-effect waves-light btn-secondary m-b-30">자세히 보기</Button>
                                    </Card>
                                    ))
                                }
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div >

    )
}

export default withRouter(MyPage)