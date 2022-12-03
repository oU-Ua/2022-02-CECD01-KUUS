import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, UncontrolledPopover,Popover, PopoverBody,PopoverHeader} from 'reactstrap';
import {
     Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import FlightInfo from '../../../assets/images/flightsearch/FlightInfo.jpg'



function FlightSearchPage(props) {

    //
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }


    //
    const [departure, setdeparture] = useState("")
    const [arrival, setarrival] = useState("")
    const [flight_iata, setflight_iata] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")

    const [Fulldata, setFullData] = useState([]);
    const [data_airport_dep, setData_airport_dep] = useState([]);
    const [data_airport_arr, setData_airport_arr] = useState([]);
    const [data_info_status, setData_data_info_status] = useState([]);
    const [data_info_cancelled, setData_data_info_cancelled] = useState([]);
    const [data_info_gate, setData_data_info_gate] = useState([]);
    const [data_info_desgate, setData_data_info_desgate] = useState([]);
    const [data_schedule_schin, setData_data_schedule_schin] = useState([]);
    const [data_schedule_schout, setData_data_schedule_schout] = useState([]);
    const [data_schedule_estin, setData_data_schedule_estin] = useState([]);
    const [data_schedule_estout, setData_data_schedule_estout] = useState([]);
    const [data_schedule_actin, setData_data_schedule_actin] = useState([]);
    const [data_schedule_actout, setData_data_schedule_actout] = useState([]);

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
            setFullData(response.data);
            
            let res = response.data;
            airports_obj = res["airports"];
            flight_info_obj = res["flight_info"];
            flight_schedule_obj = res["flight_schedule"];
            console.log("공항",airports_obj);
            console.log("인포",flight_info_obj);
            console.log("스케줄",flight_schedule_obj);
            let day =['일','월','화','수','목','금','토'];
            let sch_in = new Date(flight_schedule_obj["scheduled_in"]);
            let sch_in_time =sch_in.getFullYear()+'년' + (sch_in.getMonth()+1)+'월' + sch_in.getDate()+'일' + day[sch_in.getDay()]+'요일' + sch_in.getHours()+'시' +sch_in.getMinutes()+'분' + sch_in.getSeconds()+'초' 
            let sch_out = new Date(flight_schedule_obj["scheduled_out"]);
            let sch_out_time =sch_out.getFullYear()+'년' + (sch_out.getMonth()+1)+'월' + sch_out.getDate()+'일' + day[sch_out.getDay()]+'요일' + sch_out.getHours()+'시' +sch_out.getMinutes()+'분' + sch_out.getSeconds()+'초' 
            let est_in = new Date(flight_schedule_obj["estimated_in"]);
            let est_in_time =est_in.getFullYear()+'년' + (est_in.getMonth()+1)+'월' + est_in.getDate()+'일' + day[est_in.getDay()]+'요일' + est_in.getHours()+'시' +est_in.getMinutes()+'분' + est_in.getSeconds()+'초' 
            let est_out = new Date(flight_schedule_obj["estimated_out"]);
            let est_out_time =est_out.getFullYear()+'년' + (est_out.getMonth()+1)+'월' + est_out.getDate()+'일' + day[est_out.getDay()]+'요일' + est_out.getHours()+'시' +est_out.getMinutes()+'분' + est_out.getSeconds()+'초' 
            let act_in = new Date(flight_schedule_obj["actual_in"]);
            let act_in_time =act_in.getFullYear()+'년' + (act_in.getMonth()+1)+'월' + act_in.getDate()+'일' + day[act_in.getDay()]+'요일' + act_in.getHours()+'시' +act_in.getMinutes()+'분' + act_in.getSeconds()+'초' 
            let act_out = new Date(flight_schedule_obj["actual_out"]);
            let act_out_time =act_out.getFullYear()+'년' + (act_out.getMonth()+1)+'월' + act_out.getDate()+'일' + day[act_out.getDay()]+'요일' + act_out.getHours()+'시' +act_out.getMinutes()+'분' + act_out.getSeconds()+'초' 



            const airports_dep_line = "출발지: "+airports_obj["departure"];
            setData_airport_dep(airports_dep_line);
            const airports_arr_line = "도착지: "+airports_obj["arrival"];
            setData_airport_arr(airports_arr_line);

            const flight_info_status_line = "비행 상태 : " + flight_info_obj["status"];
            setData_data_info_status(flight_info_status_line);
            const flight_info_gate_line = "출발 게이트: " + flight_info_obj["gate_origin"]+" 게이트";
            setData_data_info_gate(flight_info_gate_line);
            const flight_info_desgate_line = "도착 게이트: "+ flight_info_obj["gate_destination"]+" 게이트";
            setData_data_info_desgate(flight_info_desgate_line);
            
            const flight_schedule_schin_line = "예정된 도착 시간 : "+ sch_in_time;
            setData_data_schedule_schin(flight_schedule_schin_line);

            const flight_schedule_schout_line = "예정된 출발 시간 : "+sch_out_time;
            setData_data_schedule_schout(flight_schedule_schout_line);
            
            const flight_schedule_estin_line = "변경된 도착 시간 : "+ est_in_time;
            setData_data_schedule_estin(flight_schedule_estin_line);

            const flight_schedule_estout_line = "변경된 출발 시간 : "+est_out_time;
            setData_data_schedule_estout(flight_schedule_estout_line);
            
            const flight_schedule_actin_line = "실제 도착 시간 : "+ act_in_time;
            setData_data_schedule_actin(flight_schedule_actin_line);

            const flight_schedule_actout_line = "실제 출발 시간 : "+act_out_time;
            setData_data_schedule_actout(flight_schedule_actout_line);
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    

    //////일정 등록에 관한 코드 시작 ----seongmin
    const [ScheduleName,setScheduleName] = useState("")
    const NameHandler = (event) => {
        event.preventDefault();
        setScheduleName(event.currentTarget.value);
    }

    const ClearHandler = (event) => {
        event.preventDefault();
        setModal(!modal);
        setScheduleName("");
    }

    const CreateHandler = (event) => {
        if(ScheduleName === ""){ console.log("일정명 없음");}
        console.log(ScheduleName);

        axios.defaults.withCredentials = true;
        event.preventDefault();
        // console.log("데이타1:",typeof(Fulldata));
        Fulldata.ScheduleName = ScheduleName;
        console.log("넣을 데이터:",Fulldata);

        var config = {
        method: 'post',
        url: 'http://localhost:5000/api/myPage/create',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(Fulldata)
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("일정이 등록되었습니다.");
        })
        .catch(function (error) {
        console.log(error);
        });
        
        setModal(!modal);
    }
    //////일정 등록에 관한 코드 끝 ----seongmin


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
                            <img src={FlightInfo} alt="img" className="img-responsive img-rounded" width="200" />
                        </Col>
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
                                        <p><h4 className="title">항공기 정보</h4>{data_info_status} <br /> {data_info_cancelled} <br /> {data_info_gate}<br /> {data_info_desgate}</p>
                                        <p><h4 className="title">항공기 스케줄</h4> {data_schedule_schout}  <br />{data_schedule_schin} <br /> <br /> {data_schedule_estout}  <br />{data_schedule_estin} <br /><br /> {data_schedule_actout}  <br />{data_schedule_actin}</p>
                                        </ModalBody>
                                        <ModalFooter>                                        
                                            <Button color="primary" >
                                                <Row>
                                                <Col>
                                                    <Input className=" text-center" type="text" value={ScheduleName} onChange={NameHandler} placeholder="(일정 이름)"></Input>
                                                </Col>
                                                <p style={{paddingTop:"7px"}} class="m-b-0 m-r-5" onClick={CreateHandler}>으로 일정 등록</p>
                                                </Row>   
                                            </Button>                                            
                                            <Button color="secondary" onClick={ClearHandler}>나가기</Button>
                                        </ModalFooter>
                                    </Modal>
                                </FormGroup>                                    
                                </Col>
                            </Form>
                        </Col>                        
                    </Row>
                </Container>
                <Container>
                    {/* <Button onClick={test}>craete테스트</Button> */}
                </Container>
            </div>

        </div>
        
    )
}

export default withRouter(FlightSearchPage)