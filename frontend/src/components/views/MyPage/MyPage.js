import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { auth } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';


function MyPage(props) {

    const [users, setUsers] = useState();

    useEffect(() => {
        try {
            // const res = axios.get('http://localhost:5000/api/mypage')
            const res = axios.get('http://localhost:5000/api/mypage')
                .then(res => setUsers(res))
            console.log(res)
            console.log(users)
            // const dispatch = useDispatch();

            // useEffect(() => {
            //     dispatch(auth())
            //         .then(response => {
            //             console.log('response: ' + response)
            //             // 로그인 한 상태
            //             if (response.payload) {
            //                 console.log('로그인 됨')
            //                 console.log(response.payload)
            //             } else {
            //                 //로그인 안 한 상태
            //                 console.log('로그인 안됨')
            //                 console.log(response.payload)
            //             }
            //         })
            //         .then(response => setUsers(response))
            //     console.log(users)
        } catch (err) {
            console.error(err)
        }
    }, [])

    //     useEffect(() => {
    //         axios.get('/mypage')
    //             .then(response => setUsers(response.data))
    //     }, [])
    // }



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
                                <h1>{users}</h1>
                                <h2 className="title font-bold">김성민님 환영합니다.</h2>
                                <h6 className="subtitle">12345679@dgu.ac.kr</h6>
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
                            <h3 className="title font-bold text-center">공유받은 일정</h3>
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