import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
        <div className="static-slider-head-top static-slider-head">
            <Container>
                <Row className="justify-content-center" >
                    <Col md="7" className="text-center">
                        <h4 className="title">마이페이지</h4>
                    </Col>
                </Row>
            </Container>      
        <Container>
        </Container>            
    </div>
    )
}

export default withRouter(MyPage)