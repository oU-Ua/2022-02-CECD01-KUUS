/* eslint-disable */
import React, { useState,useEffect } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { useDispatch } from 'react-redux';
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse, Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import logo from '../../../assets/images/logos/kuus-white-text.png';
import { auth } from '../../../_actions/user_action';
import axios from 'axios';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUser, setisUser] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    
    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/
    const onClickHandler = () => {
        history.push("/mypage")
    }
    //////////////////////////
    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                if(response.payload.isAuth){
                    console.log("로그인중");
                    setisUser(true);
                }else{
                    console.log("로그아웃 상태임")
                }
            })
        }, [])
    ///////////////////////////

    // const logoutHandler = (e) => {
    //     axios.defaults.withCredentials = true;
    //     var config = {
    //         method: 'get',
    //         url: 'http://localhost:5000/api/users/logout'
    //       };
          
    //       axios(config)
    //       .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         props.history.push("/login")
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });

    // }

    return (
        <div className="topbar" id="top">
            <div className="header6">
                <Container className="po-relative">
                    <Navbar className="navbar-expand-lg h6-nav-bar">
                        <NavbarBrand href="/"><img src={logo}/></NavbarBrand>
                        <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                        <Collapse isOpen={isOpen} navbar className="hover-dropdown font-14 ml-auto" id="h6-info">
                            <Nav navbar className="ml-auto">
                                <NavItem href="/flightsearch">
                                    <Link className="nav-link" to='/flightsearch'>
                                        항공일정 조회하기
										</Link>
                                </NavItem>
                                <NavItem >
                                    <Link className="nav-link" to="/mypage">
                                    마이페이지    
                                    </Link>
                                </NavItem>
                            </Nav>
                            <div className="act-buttons">
                             {
                                isUser ? <Button className="btn btn-success-gradiant font-14">로그아웃</Button>:
                                <Link to="/login" className="btn btn-success-gradiant font-14">로그인/회원가입</Link>
                             }
                            </div>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );
}
export default Header;
