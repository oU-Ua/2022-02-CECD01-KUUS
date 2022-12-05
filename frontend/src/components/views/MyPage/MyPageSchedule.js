import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



// 데이터 호출 클릭 이벤트 등등
// https://goddino.tistory.com/154

function MyPage(props) {

    const match = useRouteMatch();

    // *********************************************

    const [schedule, setSchedule] = useState([])

    const [map, setMap] = useState([])

    const [scheName, setScheName] = useState([])

    const [airport, setAirport] = useState([])

    const [flight_info, setFlight_info] = useState([])

    const [flight_schedule, setFlight_schedule] = useState([])

    // *********************************************

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }
    const [phone, setPhone] = useState("");
    const [_id, set_id] = useState("");
    const [Fulldata, setFullData] = useState([]);

    // 공유 페이지(/mypage/schedule/share)로 이동
    // 공유 페이지 따로 안 만들어도 됨
    // 정보를 공유 페이지로 넘기기만 하면 정보를 req로 받아 함수 자동 실행
    // 근데 정보만 보내고 페이지는 렌더링 안하면 안되나,, -> 방법 고민해보겠음
    function confirmClick(e) {

        console.log("폰",phone);
        console.log("아이디",_id);
        axios.defaults.withCredentials = true;
        e.preventDefault();        
        var data = JSON.stringify({
          "id": _id,
          "phone": phone
        });
        
        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/myPage/schedule/share',
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'connect.sid=s%3ACH596FaRwkOfhOCS7uOWAJSJKIitders.ewzK5TNehBZT%2BxFT8nn1yy6pLAUoCy9ALxEPOf2vJtc; x_auth=eyJhbGciOiJIUzI1NiJ9.NjM4ODA1NGJjMTc0N2YyYWYwYzkwN2Fi.uILARWH8WEwIv2Pp-g0NXelg-q9oLxg2HdhNYvAYU6M'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
        
          
       //////일단 스탑
        // window.location.href = 'http://localhost:3000/mypage/schedule/share'

    }


    // *********************************************

    ///////kimseongmin////////////////////////////////////////////////////
    const testHandler = (event) => {
        setPhone(event.currentTarget.value)
    }
    ////////seongmin////////////////////////////////////////////////////

    const onScheNameHandler = (event) => {
        setScheName(event.currentTarget.value)
    }


    useDispatch((data) => {
        console.log('data: ', data)
    })

    const id = props.match.params.id;
    console.log('id는', id)
    id.replace(/ /g, "")

    const getSchedules = () => {
        console.log('func 진입')
        axios.get(`http://localhost:5000/api/mypage/schedules/${id}`, {
            withCredentials: true
        })
            .then((response) => {
                setScheName(response.data.schedule.ScheduleName)
                set_id(response.data.schedule._id)
                setAirport(response.data.schedule["airports"])
                setFlight_info(response.data.schedule["flight_info"])
                setFlight_schedule(response.data.schedule["flight_schedule"])
                setMap('data:image/png;base64,' + response.data.map)
            }).catch(function (error) {
                console.error(error)
            })
    }

    useEffect(function () {
        getSchedules()
    }, [])


    console.log(scheName)
    console.log('**공항', airport, '**flight_info', flight_info, '**flight_schedule', flight_schedule)


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">상세 비행 일정</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                <div  id="card-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="5" className='text-center'>
                                <h1 type="text" className="title" value={scheName} onChange={onScheNameHandler}>
                                    <br></br>
                                    🛫 {scheName} 🛬
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                </div>
                <div >
                    <div id="card-component">
                        <Container className='text-center'>
                            <img src={map} />
                        </Container>
                        <br></br>
                    </div>
                </div>
                <div className="form-control-dark">
                    <br></br>
                    <Container>
                        <Row className="justify-content-center" >
                            <Col md="4" className="text-center">
                                <h1 className="title">공항 정보</h1>
                                <br></br>
                                <h2>🛫 출발지 🛬</h2>
                                <br></br>
                                <h4>{airport.departure}</h4>
                                <br></br>
                                <h2>🛫 도착지 🛬</h2>
                                <br></br>
                                <h4>{airport.arrival}</h4>
                                <br></br>
                            </Col>
                            <Col md="4" className="text-center">
                                <h1 className="title">비행 정보</h1>
                                <br></br>
                                <h2>🛫 비행 편명 (iata 코드) 🛬</h2>
                                <br></br>
                                <h4>{flight_info.flight_iata}</h4>
                                <br></br>
                                <h2>🛫 결항여부 🛬</h2>
                                <br></br>
                                <h4>{flight_info.cancelled}</h4>
                                <br></br>
                                <h2>🛫 출국 게이트 🛬</h2>
                                <br></br>
                                <h4>{flight_info.gate_origin}</h4>
                                <br></br>
                                <h2>🛫 입국 게이트 🛬</h2>
                                <br></br>
                                <h4>{flight_info.destination}</h4>
                                <br></br>
                            </Col>
                            <Col md="4" className="text-center">
                                <h1 className="title">스케줄 정보</h1>
                                <br></br>
                                <h2>🛫 이륙 시각 🛬</h2>
                                <h4>{flight_schedule.scheduled_in}</h4>
                                <br></br>
                                <h2>🛫 착륙 시각 🛬</h2>
                                <h4>{flight_schedule.scheduled_out}</h4>
                                <br></br>
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                </div>
                <div>
                    <br></br>
                    <Container>
                        <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-info"> 공유하기 </Button>
                        <Modal size="md" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle.bind(null)}>공유하기</ModalHeader>
                            <ModalBody>
                                <p> <h4 className="title">누구와 공유하고 싶으신가요 ? </h4> </p>
                                공유하고 싶은 사람의 전화번호를 입력해주세요 <br />
                                <input type="text" id="phone" onChange={testHandler} value={phone} />

                            </ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button color="danger" onClick={confirmClick} > 확인 </Button>
                                <Button color="secondary" onClick={toggle.bind(null)}> 취소 </Button>
                            </ModalFooter>
                        </Modal>
                    </Container>


                </div>
            </div>
        </div>

    )
}

export default withRouter(MyPage)