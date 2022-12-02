import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

function MyPage() {

    function mypageClick(e) {
        window.location.href = 'http://localhost:3000/mypage'
    }

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
                                    공유 완료 </h2>
                                <h6 className="subtitle">문자를 확인하세요!</h6>
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

export default withRouter(MyPage)