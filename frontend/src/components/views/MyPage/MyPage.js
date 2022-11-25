import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';
import { Container, Row, Col, Button, Card, CardTitle, CardText } from 'reactstrap';
import { auth } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';

function MyPage(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                // console.log(response)
                //로그인 하지 않은 상태 
                if (response.payload.isAuth) {
                    console.log('로그인 상태')
                }else{
                    //로그인한 상태
                    console.log('로그인 아닌 상태')
                }
            })
        }, [])



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
                            <h2 className="title font-bold">[김성민]님 환영합니다.</h2>
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