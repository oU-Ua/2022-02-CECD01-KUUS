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
    const [data_airport_dep, setData_airport_dep] = useState([]);
    const [data_airport_arr, setData_airport_arr] = useState([]);
    const [data_info_status, setData_data_info_status] = useState([]);
    const [data_info_cancelled, setData_data_info_cancelled] = useState([]);
    const [data_info_gate, setData_data_info_gate] = useState([]);
    const [data_schedule_delay, setData_data_schedule_delay] = useState([]);
    const [data_schedule_dep, setData_data_schedule_dep] = useState([]);

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
        setModal(!modal);

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
            let day =['일','월','화','수','목','금','토'];
            let date = new Date(flight_schedule_obj["dep_time_kr"]);
            let dep_time =date.getFullYear()+'년' + (date.getMonth()+1)+'월' + date.getDate()+'일' + day[date.getDay()]+'요일' + date.getHours()+'시' +date.getMinutes()+'분' + date.getSeconds()+'초' 

            const airports_dep_line = "출발지: "+airports_obj["departure"];
            setData_airport_dep(airports_dep_line);
            const airports_arr_line = "도착지: "+airports_obj["arrival"];
            setData_airport_arr(airports_arr_line);

            const flight_info_status_line = "비행 상태 : "+flight_info_obj["status"];
            setData_data_info_status(flight_info_status_line);
            const flight_info_cancelled_line = "취소여부 : "+ flight_info_obj["cancelled"];
            setData_data_info_cancelled(flight_info_cancelled_line);
            const flight_info_desgate_line = "도착 게이트: "+ flight_info_obj["gate_destination"]+"게이트";
            setData_data_info_gate(flight_info_desgate_line);
            const flight_info_gate_line = "출발 게이트: "+ flight_info_obj["gate_origin"]+"게이트";
            setData_data_info_gate(flight_info_gate_line);

            const flight_schedule_delay_line = "상태 : "+flight_schedule_obj["departure_delay"];
            setData_data_schedule_delay(flight_schedule_delay_line);
            const flight_schedule_dep_line = "출발시간 : "+ dep_time;
            setData_data_schedule_dep(flight_schedule_dep_line);
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
                                    {/* <Button type="submit" onClick={onClickHandler} className="btn-success  waves-light m-r-10">Submit</Button> */}
                                    <Button type="button" onClick={onClickHandler} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">조회하기</Button>
                                    <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                                        <ModalHeader toggle={toggle.bind(null)}>비행 인포메이션</ModalHeader>
                                        <ModalBody>
                                        <p> <h4 className="title">공항정보</h4> {data_airport_dep} <br /> {data_airport_arr}</p>
                                        <p><h4 className="title">항공기 정보</h4>{data_info_status} <br /> {data_info_cancelled} <br /> {data_info_gate}</p>
                                        <p><h4 className="title">항공기 스케줄</h4> {data_schedule_delay}  <br />{data_schedule_dep}</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={toggle.bind(null)}>내 일정으로 등록</Button>{' '}
                                            <Button color="secondary" onClick={toggle.bind(null)}>나가기</Button>
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
                </Container>

            </div>

            {/*  */}
            <Container>
                <Row className="m-b-40">
                    <Col md="6">
                        {/* <Button type="button" onClick={toggle.bind(null)} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">Large Modal</Button>
                        <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                            <ModalHeader toggle={toggle.bind(null)}>Modal title</ModalHeader>
                            <ModalBody>
                                바디
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle.bind(null)}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={toggle.bind(null)}>Cancel</Button>
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