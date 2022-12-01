import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';


function LandingPage(props) {

    // const onClickHandler = (event) => {
    //     event.preventDefault();
        
    //     const url = "http://localhost:5000/api/users/logout";
    //     axios.get(url)
    //     .then(function(response) {
    //         console.log("성공");
    //         alert('로그아웃되었습니다.');
    //     })
    //     .catch(function(error) {
    //         alert('로그아웃에 실패했습니다.');
    //     })    
    
    //     }

    return (
            
            <div>
                <HeaderBanner></HeaderBanner>
                {/* <button onClick={onClickHandler} >
                    로그아웃
                </button> */}
                <Images></Images>
            </div>
    )
}

export default withRouter(LandingPage)
