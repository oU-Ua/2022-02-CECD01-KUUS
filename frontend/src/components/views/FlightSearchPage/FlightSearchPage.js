import React, { useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
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
        //??????  ????????? OZ272 2022-11-25 18:05
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
            console.log("??????",airports_obj);
            console.log("??????",flight_info_obj);
            console.log("?????????",flight_schedule_obj);
            let day =['???','???','???','???','???','???','???'];
            let sch_in = new Date(flight_schedule_obj["scheduled_in"]);
            let sch_in_time =sch_in.getFullYear()+'???' + (sch_in.getMonth()+1)+'???' + sch_in.getDate()+'???' + day[sch_in.getDay()]+'??????' + sch_in.getHours()+'???' +sch_in.getMinutes()+'???' + sch_in.getSeconds()+'???' 
            let sch_out = new Date(flight_schedule_obj["scheduled_out"]);
            let sch_out_time =sch_out.getFullYear()+'???' + (sch_out.getMonth()+1)+'???' + sch_out.getDate()+'???' + day[sch_out.getDay()]+'??????' + sch_out.getHours()+'???' +sch_out.getMinutes()+'???' + sch_out.getSeconds()+'???' 
            let est_in = new Date(flight_schedule_obj["estimated_in"]);
            let est_in_time =est_in.getFullYear()+'???' + (est_in.getMonth()+1)+'???' + est_in.getDate()+'???' + day[est_in.getDay()]+'??????' + est_in.getHours()+'???' +est_in.getMinutes()+'???' + est_in.getSeconds()+'???' 
            let est_out = new Date(flight_schedule_obj["estimated_out"]);
            let est_out_time =est_out.getFullYear()+'???' + (est_out.getMonth()+1)+'???' + est_out.getDate()+'???' + day[est_out.getDay()]+'??????' + est_out.getHours()+'???' +est_out.getMinutes()+'???' + est_out.getSeconds()+'???' 
            let act_in = new Date(flight_schedule_obj["actual_in"]);
            let act_in_time =act_in.getFullYear()+'???' + (act_in.getMonth()+1)+'???' + act_in.getDate()+'???' + day[act_in.getDay()]+'??????' + act_in.getHours()+'???' +act_in.getMinutes()+'???' + act_in.getSeconds()+'???' 
            let act_out = new Date(flight_schedule_obj["actual_out"]);
            let act_out_time =act_out.getFullYear()+'???' + (act_out.getMonth()+1)+'???' + act_out.getDate()+'???' + day[act_out.getDay()]+'??????' + act_out.getHours()+'???' +act_out.getMinutes()+'???' + act_out.getSeconds()+'???' 



            const airports_dep_line = "?????????: "+airports_obj["departure"];
            setData_airport_dep(airports_dep_line);
            const airports_arr_line = "?????????: "+airports_obj["arrival"];
            setData_airport_arr(airports_arr_line);

            const flight_info_status_line = "?????? ?????? : " + flight_info_obj["status"];
            setData_data_info_status(flight_info_status_line);
            const flight_info_gate_line = "?????? ?????????: " + flight_info_obj["gate_origin"]+" ?????????";
            setData_data_info_gate(flight_info_gate_line);
            const flight_info_desgate_line = "?????? ?????????: "+ flight_info_obj["gate_destination"]+" ?????????";
            setData_data_info_desgate(flight_info_desgate_line);
            
            const flight_schedule_schin_line = "????????? ?????? ?????? : "+ sch_in_time;
            setData_data_schedule_schin(flight_schedule_schin_line);

            const flight_schedule_schout_line = "????????? ?????? ?????? : "+sch_out_time;
            setData_data_schedule_schout(flight_schedule_schout_line);
            
            const flight_schedule_estin_line = "????????? ?????? ?????? : "+ est_in_time;
            setData_data_schedule_estin(flight_schedule_estin_line);

            const flight_schedule_estout_line = "????????? ?????? ?????? : "+est_out_time;
            setData_data_schedule_estout(flight_schedule_estout_line);
            
            const flight_schedule_actin_line = "?????? ?????? ?????? : "+ act_in_time;
            setData_data_schedule_actin(flight_schedule_actin_line);

            const flight_schedule_actout_line = "?????? ?????? ?????? : "+act_out_time;
            setData_data_schedule_actout(flight_schedule_actout_line);
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    

    //////?????? ????????? ?????? ?????? ?????? ----seongmin
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
        setModal(!modal);

        if(ScheduleName === ""){ console.log("????????? ??????");}
        console.log(ScheduleName);

        axios.defaults.withCredentials = true;
        event.preventDefault();
        // console.log("?????????1:",typeof(Fulldata));
        Fulldata.ScheduleName = ScheduleName;
        console.log("?????? ?????????:",Fulldata);

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
        setTimeout(function() {
            alert("["+ScheduleName+"] ????????? ?????????????????????.");
          }, 500);
          setScheduleName("");
        })
        .catch(function (error) {
        console.log(error);
        });
        
        
    }
    //////?????? ????????? ?????? ?????? ??? ----seongmin


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <Container>
                    <Row className="justify-content-center" >
                        <Col md="7" className="text-center">
                            <h4 className="title">????????????</h4>
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
                                    <Label>?????????</Label>
                                    <Input type="text" id='departure' value={departure} onChange={onDepartureHandler}/>
                                </FormGroup>
                                <FormGroup >
                                    <Label>?????????</Label>
                                    <Input type="text" value={arrival} onChange={onArrivalHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>????????????</Label>
                                    <Input type="text" value={flight_iata} onChange={onFlight_iataHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>?????????</Label>
                                    <Input type="date" value={date} onChange={onDateHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>????????????</Label>
                                    <Input type="time" value={time} onChange={ontTimeHandler}/>
                                </FormGroup>
                                <Col>
                                <FormGroup>
                                    {/* <Button type="submit" onClick={onClickHandler} className="btn-success  waves-light m-r-10">Submit</Button> */}
                                    <Button type="button" onClick={onClickHandler} className="btn btn-block waves-effect waves-light btn-outline-primary m-b-30">????????????</Button>
                                    <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)} className={props.className}>
                                        <ModalHeader toggle={toggle.bind(null)}>?????? ???????????????</ModalHeader>
                                        <ModalBody>
                                        <p> <h4 className="title">????????????</h4> {data_airport_dep} <br /> {data_airport_arr}</p>
                                        <p><h4 className="title">????????? ??????</h4>{data_info_status} <br /> {data_info_cancelled} <br /> {data_info_gate}<br /> {data_info_desgate}</p>
                                        <p><h4 className="title">????????? ?????????</h4> {data_schedule_schout}  <br />{data_schedule_schin} <br /> <br /> {data_schedule_estout}  <br />{data_schedule_estin} <br /><br /> {data_schedule_actout}  <br />{data_schedule_actin}</p>
                                        </ModalBody>
                                        <ModalFooter>                                        
                                            <Button color="primary" >
                                                <Row>
                                                <Col>
                                                    <Input className=" text-center" type="text" value={ScheduleName} onChange={NameHandler} placeholder="(?????? ??????)"></Input>
                                                </Col>
                                                <p style={{paddingTop:"7px"}} class="m-b-0 m-r-5" onClick={CreateHandler}>?????? ?????? ??????</p>
                                                </Row>   
                                            </Button>                                            
                                            <Button color="secondary" onClick={ClearHandler}>?????????</Button>
                                        </ModalFooter>
                                    </Modal>
                                </FormGroup>                                    
                                </Col>
                            </Form>
                        </Col>                        
                    </Row>
                </Container>
                <Container>
                    {/* <Button onClick={test}>craete?????????</Button> */}
                </Container>
            </div>

        </div>
        
    )
}

export default withRouter(FlightSearchPage)