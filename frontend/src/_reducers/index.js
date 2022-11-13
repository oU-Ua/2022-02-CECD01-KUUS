// 스토어에 여러가지 reducer들이 있을 수 있다.
// 이런 여러 reducer를 rootReducer로 합쳐준다.
import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;