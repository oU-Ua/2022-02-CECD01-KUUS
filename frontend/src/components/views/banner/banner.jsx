import React from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom'

const HeaderBanner = () => {
    return (
        <div className="static-slider-head">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="8" md="6" className="align-self-center text-center">
                        <h1 className="title">My Trip Flight</h1>
                        <h4 className="subtitle font-light">Easy Search & <br />Easy Share</h4>
                        <Link to="/login" className="btn btn-md m-t-30 btn-info-gradiant font-14">지금 시작하기</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HeaderBanner;
