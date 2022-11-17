/* eslint-disable */
import React, { useState } from 'react';
// import { HashLink as Link } from 'react-router-hash-link';
import { Container, NavbarBrand, Navbar, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import {Link} from 'react-router-dom'
import logo from '../../../assets/images/logos/kuus-white-text.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    /*--------------------------------------------------------------------------------*/
    /*To open NAVBAR in MOBILE VIEW                                                   */
    /*--------------------------------------------------------------------------------*/

    return (
        <div className="topbar" id="top">
            <div className="header6">
                <Container className="po-relative">
                    <Navbar className="navbar-expand-lg h6-nav-bar">
                        <NavbarBrand href="/"><img src={logo} alt="wrapkit" /></NavbarBrand>
                        <NavbarToggler onClick={toggle}><span className="ti-menu"></span></NavbarToggler>
                        <Collapse isOpen={isOpen} navbar className="hover-dropdown font-14 ml-auto" id="h6-info">
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <Link className="nav-link" to={"/components"}>
                                        항공일정 조회하기
										</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className="nav-link" to={"/custom-components"}>
                                        마이페이지
                                    	</Link>
                                </NavItem>
                            </Nav>
                            <div className="act-buttons">
                                <Link to="/coming" className="btn btn-success-gradiant font-14">로그인/회원가입</Link>
                            </div>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        </div>
    );

}
export default Header;
