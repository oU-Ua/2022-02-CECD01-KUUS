import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import Header from '../header/header';
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';


function LandingPage(props) {

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    return (
            
            <div>
                {/* <Header></Header> */}
                <HeaderBanner></HeaderBanner>
                <h2>시작 페이지</h2>
                <button onClick={onClickHandler} >
                    로그아웃
                </button>
                <Images></Images>
            </div>
    )
}

export default withRouter(LandingPage)
