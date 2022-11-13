import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

    useEffect(()=>{
        axios.get('/api/hello')
    },[])

  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>★프론트 입장 완료★</div>
  )
}

export default LandingPage