import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
            <div className="static-slider-head">
                {/* <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                                <label>Email</label>
                                <input type="email" value={Email} onChange={onEmailHandler} />
                                <label>Password</label>
                                <input type="password" value={Password} onChange={onPasswordHandler} />
                                <br />
                                <button type="submit">
                                    Login
                                </button>
                </form> */}
            <Container>
                <Row className="justify-content-center">
                    <Col className="align-self-center text-center">
                        <div style={{maxWidth:'50vw'}}>
                            
                        <Container>
                            <Row>
                                <Col md="12">
                                    <Form className="row">
                                        <FormGroup className="col-md-12" max-width="60">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input type="email" className="form-control" id="email" placeholder="Enter email" />
                                            <Label htmlFor="password">Password</Label>
                                            <Input type="password" className="form-control" id="password" placeholder="Password" />
                                        </FormGroup>
                                        <Col md="12">
                                            <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">Submit</Button>
                                        </Col>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>


                        </div>
                    </Col>
                </Row>
            </Container>
            
            </div>
    )
}

export default withRouter(LoginPage)
