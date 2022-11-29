import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
     Modal, ModalHeader, ModalBody, ModalFooter, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import FlightInfo from '../../../assets/images/flightsearch/FlightInfo.jpg'



function FlightSearchPage(props) {

    //
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    const toggle1 = () => {
        setModal1(!modal1);
    }

    const toggle2 = () => {
        setModal2(!modal2);
    }


    //
    const [departure, setdeparture] = useState("")
    const [arrival, setarrival] = useState("")
    const [flight_iata, setflight_iata] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")

    const [data, setData] = useState([]);
    const [data_airport, setData_airport] = useState([]);

    let airports_obj, flight_info_obj, flight_schedule_obj;


    const onDepartureHandler = (event) => {
        setdeparture(event.currentTarget.value)
    }
    const onArrivalHandler = (event) => {
        setarrival(event.currentTarget.value)
    }
    const onFlight_iataHandler = (event) => {
        setflight_iata(event.currentTarget.value)
    }
    const onDateHandler = (event) => {
        setdate(event.currentTarget.value)
    }
    const ontTimeHandler = (event) => {
        settime(event.currentTarget.value)
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        axios.defaults.headers.Cookie = '';
        //인천  시애틀 OZ272 2022-11-25 18:05
        var data = JSON.stringify({
            "departure": departure,
            "arrival": arrival,
            "flight_iata": flight_iata,
            "date": date,
            "time": time
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/flightsearch',
            headers: { 
              'Content-Type': 'application/json', 
              'Cookie': 'connect.sid=s%3A_ssjokE1UOgjBbc2Aqq3qTTx746evAF9.w70x2xxpzo2u0TikR5BtYGFPKRC%2F0FMy%2BA2SV98o2R4'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setData(JSON.stringify(response.data));
            
            let res = response.data;
            airports_obj = res["airports"];
            flight_info_obj = res["flight_info"];
            flight_schedule_obj = res["flight_schedule"];
            console.log("공항",airports_obj);
            console.log("인포",flight_info_obj);
            console.log("스케줄",flight_schedule_obj);

            const airports_line = "출발지: "+airports_obj["departure"]+"\n도착지: "+airports_obj["arrival"];
            setData_airport(airports_line);

          })
          .catch(function (error) {
            console.log(error);
          });


    }


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">비행서치</h4>
                        </Col>
                    </Row>
                </Container>    
            </div>
            <div className="spacer">
                <h2 style={{color:'red'}} >이 페이지는 테스트 중입니다!!!!!!</h2>
                
                <Container>
                    <Row>
                        <Col md="6">
                            <Form >
                                <FormGroup >
                                    <Label>출발지</Label>
                                    <Input type="text" id='departure' value={departure} onChange={onDepartureHandler}/>
                                </FormGroup>
                                <FormGroup >
                                    <Label>도착지</Label>
                                    <Input type="text" value={arrival} onChange={onArrivalHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>항공편명</Label>
                                    <Input type="text" value={flight_iata} onChange={onFlight_iataHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>출발일</Label>
                                    <Input type="date" value={date} onChange={onDateHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>출발시간</Label>
                                    <Input type="time" value={time} onChange={ontTimeHandler}/>
                                </FormGroup>
                                <Col>
                                <FormGroup>
                                    <Button type="submit" onClick={onClickHandler} className="btn-success  waves-light m-r-10">Submit</Button>
                                    <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">전송하기</Button>
                                    <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                                        <ModalHeader toggle={toggle.bind(null)}>Modal title</ModalHeader>
                                        <ModalBody>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={toggle.bind(null)}>Do Something</Button>{' '}
                                            <Button color="secondary" onClick={toggle.bind(null)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </FormGroup>                                    
                                </Col>
                            </Form>
                        </Col>
                        <Col md="6">
                        <img src={FlightInfo} alt="img" className="img-responsive img-rounded" width="200" />

                        </Col>
                    </Row>
                </Container>
                <Container>
                    <p>departure: {departure}</p>
                    <p>arrival: {arrival}</p>
                    <p>flight_iata: {flight_iata}</p>
                    <p>date: {date}</p>
                    <p>time: {time}</p>
                </Container>
                <Container>
                    <p>결과(이따가 정리하겠음): {data}</p>
                    <p>공항 정보: {data_airport}</p>
                    <p>인포: {flight_info_obj}</p>
                    <p>스케줄: {flight_schedule_obj}</p>
                </Container>

            </div>

            {/*  */}
            <Container>
                <Row className="m-b-40">
                    <Col md="6">
                        <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">Large Modal</Button>
                        <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle.bind(null)}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle.bind(null)}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={toggle.bind(null)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {/* <Button type="button" onClick={toggle1.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">Medium Modal</Button>
                        <Modal size="md" isOpen={modal1} toggle={toggle1.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle1.bind(null)}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle1.bind(null)}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={toggle1.bind(null)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <Button type="button" onClick={toggle2.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary">Small Modal</Button>
                        <Modal size="sm" isOpen={modal2} toggle={toggle2.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle2.bind(null)}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter className="justify-content-center">
                                <Button color="primary" onClick={toggle2.bind(null)}>Cancel</Button>
                            </ModalFooter>
                        </Modal> */}
                    </Col>
                    <Col md="6">
                        
                    </Col>
                </Row>
            </Container>
            {/*  */}
        </div>
        
    )
}

export default withRouter(FlightSearchPage)