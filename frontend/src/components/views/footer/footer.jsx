/* eslint-disable */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <div className="footer4 b-t spacer">
            <Container>
                <Row>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Address</h5>
                        <p>서울특별시 중구 필동로 1길 30</p>
                    </Col>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Phone</h5>
                        <p>동국대학교 :  02-2260-3114 <br />컴퓨터공학과 :  02-2260-8742</p>
                    </Col>
                    <Col lg="3" md="6" className="m-b-30">
                        <h5 className="m-b-20">Email</h5>
                        <p>이메일 :  <a href="#" className="link">cestaff@dongguk.edu</a> <br />홈페이지 :  <a href="https://cse.dongguk.edu/main" className="link">https://cse.dongguk.edu/</a></p>
                    </Col>
                    <Col lg="3" md="6">
                        <h5 className="m-b-20">Social</h5>
                        <div className="round-social light">
                            <a href="#" className="link"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="link"><i className="fa fa-twitter"></i></a>
                            <a href="#" className="link"><i className="fa fa-google-plus"></i></a>
                            <a href="#" className="link"><i className="fa fa-youtube-play"></i></a>
                            <a href="#" className="link"><i className="fa fa-instagram"></i></a>
                        </div>
                    </Col>
                </Row>
                <div className="f4-bottom-bar">
                    <Row>
                        <Col md="12">
                            <div className="d-flex font-14">
                                <div className="m-t-10 m-b-10 copyright">All Rights Reserved by WrapPixel.</div>
                                <div className="links ml-auto m-t-10 m-b-10">
                                    <a href="#" className="p-10 p-l-0">Terms of Use</a>
                                    <a href="#" className="p-10">Legal Disclaimer</a>
                                    <a href="#" className="p-10">Privacy Policy</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default Footer;
