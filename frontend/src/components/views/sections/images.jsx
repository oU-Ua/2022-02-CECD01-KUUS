import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import img1 from '../../../assets/images/ui/img7.jpg';
import img3 from '../../../assets/images/ui/img5.jpg';
import KimEmoji from '../../../assets/images/ui/kimemoji.jpg'
import Emoji from '../../../assets/images/ui/emoji.jpg'

const Images = () => {
    return (
        <div>
            <div className="spacer" id="imgs-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">항공일정을 체크하기위해<br/> 각 항공사를 방문하면서<br/> 시간을 버리지 마세요</h1>
                            <h6 className="subtitle">여러분들의 시간은  My Trip Flight가 지켜드릴게요.</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div>
                    <Row>
                        <Col className="m-b-30">
                            <h3 className="card-title">티켓만 챙겨주세요</h3>
                            <h6 className="card-subtitle"><code>메뉴의 항공일정 검색을 이용해볼까요?</code></h6>
                            <img src={img1} alt="img" className="img-responsive img-rounded" width="200" />
                            <p className="m-t-15 m-b-0"></p>
                        </Col>
                    </Row>
                    <h4 className="text-center m-b-30">네 명의 팀원들이 여러분을 돕기위해 기다려요</h4>
                    <Row>
                        <Col lg="3" className="text-center m-b-30">
                            <h6 className="card-subtitle">김성민<code>(frontend-develope & design)</code></h6>
                            <img src={KimEmoji} alt="img" className="img-circle" width="290" />
                            <p className="m-t-15 m-b-0"></p>
                        </Col>
                        <Col lg="3" className="text-center m-b-30">
                            <h6 className="card-subtitle">유유정<code>(frontend-develope & marketing)</code></h6>
                            <img src={Emoji} alt="img" className="img-circle" width="290" />
                            <p className="m-t-15 m-b-0"></p>
                        </Col>
                        <Col lg="3" className="text-center m-b-30">
                            <h6 className="card-subtitle">송영창<code>(backend-develope & data analysis)</code></h6>
                            <img src={Emoji} alt="img" className="img-circle" width="290" />
                            <p className="m-t-15 m-b-0"></p>
                        </Col>
                        <Col lg="3" className="text-center m-b-30">
                            <h6 className="card-subtitle">이유진<code>(backend-develope & customer service)</code></h6>
                            <img src={Emoji} alt="img" className="img-circle" width="290" />
                            <p className="m-t-15 m-b-0"></p>
                        </Col>
                        
                    </Row>
                </div>
                <Row>
                    <Col>
                        <h4 className="card-title">일정공유도 My Trip Flight와 함께라면 문제없죠!</h4>
                        {/* <h6 className="card-subtitle"><code>img-thumbnail</code></h6> */}
                        <img src={img3} alt="img" className="img-responsive img-thumbnail" width="200" />
                        <p className="m-t-15 m-b-0"></p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Images;
