import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';



function SharedPage(props) {

    function mypageClick(e) {
        window.location.href = 'http://localhost:3000/mypage'
    }

    const id = props.match.params.id;
    console.log('id는', id)
    id.replace(/ /g, "")

    function register() {
    axios.get(`http://localhost:5000/api/mypage/schedules/${id}`, {
        withCredentials: true
    })
        .then((response) => {


        }).catch(function (error) {
            console.error(error)
        })
    }

    useEffect(function () {
        register()
    }, [])

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
                                    공유 스케줄에 등록 완료 </h2>
                                <h6 className="subtitle"> 마이페이지에서 확인하세요! </h6>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container>
                    <Col className="text-center">
                        <Button outline color="info" onClick={mypageClick}>마이페이지로 돌아가기</Button>
                    </Col>
                </Container>
            </div>
        </div>

    )
}

export default withRouter(SharedPage)