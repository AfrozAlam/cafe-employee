import { combineReducers } from "redux";
import cafeReducer from './cafeReducer';
import employeeReducer from './employeeReducer';

export default combineReducers({
    cafe: cafeReducer,
    employee: employeeReducer
})