import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }



    return (
        // <div style={{
        //     display: 'flex', justifyContent: 'center', alignItems: 'center'
        //     , width: '100%', height: '100vh'
        // }}>
        <div className="static-slider-head">
                <div className="" id="forms-component">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="7" className="text-center">
                                <h4 className="title">회원가입</h4>
                                <h6 className="subtitle">이메일은 아이디로 사용됩니다.</h6>
                            </Col>
                        </Row>
                    </Container>
                </div>                
                <Container>
                    <Row className="justify-content-center">
                        <Col className="align-self-center text-center">
                            <div style={{maxWidth:'50vw'}}>                            
                                {/* <Container>
                                    <Row>
                                        <Col md="6">
                                            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}  >
                                                <label>Email</label>
                                                <input type="email" value={Email} onChange={onEmailHandler} />

                                                <label>Name</label>
                                                <input type="text" value={Name} onChange={onNameHandler} />

                                                <label>Password</label>
                                                <input type="password" value={Password} onChange={onPasswordHandler} />

                                                <label>Confirm Password</label>
                                                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                                                <br />
                                                <button type="submit"  className="btn btn-success waves-effect waves-light m-r-10">
                                                    회원 가입
                                                </button>
                                            </form>
                                        </Col>
                                    </Row>
                                </Container> */}
                                
                            </div>
                        </Col>
                    </Row>
                </Container> 
                <Container>
                                    <Row>
                                        <Col md="12">
                                            <Form className="row" onSubmit={onSubmitHandler}>
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="name">User Name</Label>
                                                    <Input type="text" className="form-control" id="name" placeholder="Enter Username" value={Name} onChange={onNameHandler}/>
                                                </FormGroup>
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input type="email" className="form-control" id="email" placeholder="Enter email" value={Email} onChange={onEmailHandler}/>
                                                </FormGroup>
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input type="password" className="form-control" id="password" placeholder="Password" value={Password} onChange={onPasswordHandler}/>
                                                </FormGroup>
                                                <FormGroup className="col-md-6">
                                                    <Label htmlFor="confirmpwd">Confirm Password</Label>
                                                    <Input type="password" className="form-control" id="confirmpwd" placeholder="Confirm Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                                                </FormGroup>
                                                <Col md="12">
                                                    <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">Submit</Button>
                                                    <Button className="btn btn-inverse waves-effect waves-light">Cancel</Button>
                                                </Col>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>           
            </div>
        // </div>
    )
}

export default withRouter(RegisterPage)
