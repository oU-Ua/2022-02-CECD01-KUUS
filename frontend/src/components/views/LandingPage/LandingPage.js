import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'; 
import HeaderBanner from '../banner/banner';
import Images from '../sections/images';


function LandingPage(props) {
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
