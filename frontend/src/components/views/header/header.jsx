/* eslint-disable */
import React, { useState,useEffect } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { useDispatch } from 'react-redux';
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import {Link} from 'react-router-dom'
import logo from '../../../assets/images/logos/kuus-white-text.png';
import { auth } from '../../../_actions/user_action';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/
    const onClickHandler = () => {
        history.push("/mypage")
    }

    // function AuthenticationCheck(props) {
    //     const dispatch = useDispatch();

    //     useEffect(() => {
    //         dispatch(auth()).then(response => {
    //             console.log('front의 auth입니다! response.payload: ')
    //             console.log(response.payload)
    //             //로그인 하지 않은 상태 
    //             if (!response.payload.isAuth) {
    //                 if (option) {
    //                     props.history.push('/login')
    //                 }
    //             } else {
    //                 //로그인 한 상태 
    //                 if (adminRoute && !response.payload.isAdmin) {
    //                     props.history.push('/')
    //                 } else {
    //                     if (option === false)
    //                         props.history.push('/')
    //                 }
    //             }
    //         })
    //     }, [])

    //     return ( )
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
                                <Link to="/login" className="btn btn-success-gradiant font-14">로그인/회원가입</Link>
                            </div>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );
}
export default Header;
