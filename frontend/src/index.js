import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
// 스타일 시트 적용
import './assets/scss/style.scss';
//css프레임웤
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { applyMiddleware, createStore } from 'redux';
//promise를 에러없이 받게해주는 미들웨어 
import promiseMiddleware from 'redux-promise';
//function를 에러없이 받게 해주는 미들웨어
import ReduxThunk from 'redux-thunk';
// reducer는 어떻게 state들이 변하는지를 보여주고 마지막 값을 리턴해준다.
import Reducer from './_reducers';

import { BrowserRouter } from 'react-router-dom';

//원래 createStore만 해서 store만 redux에서 생성하는데 stroe는 객체만 받을 수 있어서 
//모든 형태를 다 받기위해서 미들웨어를 사용한다.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

//id=root (index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
        store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
      <BrowserRouter>
      {/* 이부분이 렌더링돼가지고 App.js가 뜨는 거임 */}
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
