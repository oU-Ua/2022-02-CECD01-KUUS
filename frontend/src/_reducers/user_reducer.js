// reducer는 (previousState, action) => nextState
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    // 다른 타입이 올 때마다 처리하기 위해서 switch를 사용
    switch (action.type) {
        case LOGIN_USER:
            // ...state는 spreadoperator리고 파람(빈상태)를 그대로 가져옴
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        default:
            return state;
    }
}