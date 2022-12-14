import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })
    }


    return (
        <div>
            <div className="static-slider-head-top static-slider-head">
                <div className="" id="forms-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h4 className="title">로그인</h4>
                            </Col>
                        </Row>
                    </Container>
                </div>       
            </div>
            <div className='spacer'>
                    <Container>
                        <Row className="justify-content-center">
                            <Col className=" text-center">                          
                                    <Container>
                                        <Row>
                                            <Col md="12">
                                                <form className="row" onSubmit={onSubmitHandler} >
                                                    <FormGroup className="col-md-6" >
                                                        <label>이메일 주소</label>
                                                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={Email} onChange={onEmailHandler} />
                                                        <label>비밀번호</label>
                                                        <input type="password" className="form-control" id="password" placeholder="Password" value={Password} onChange={onPasswordHandler} />
                                                        <br />
                                                        <Col md="12">
                                                            <button type="submit"  className="btn btn-success waves-effect waves-light m-r-10">
                                                                로그인
                                                            </button>                                                        
                                                        </Col>
                                                    </FormGroup>   
                                                    <div className="col-md-6">
                                                        <h4 style={{margin:'60px 0'}} className="">회원이 아니신가요?</h4>
                                                        <Link to="/register">   
                                                            <button type="submit"  className="btn btn-success waves-effect waves-light m-r-10">
                                                            회원가입 하기                                                          
                                                            </button>   
                                                        </Link>                                         
                                                    </div>                                             
                                                </form>
                                                
                                            </Col>
                                        </Row>
                                    </Container>
                            </Col>
                        </Row>
                    </Container>
            </div>
        </div>
            
    )
}

export default withRouter(LoginPage)
