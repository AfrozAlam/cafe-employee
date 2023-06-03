import { EMP_FETCH_DATA, EMP_ADD_DATA, EMP_UPDATE_DATA, EMP_REMOVE_DATA, EMP_ERROR_DATA } from '../actions/types';

const initialState = {
    empData: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case EMP_FETCH_DATA:
          return {
              ...state,
              empData: action.payload,
              loading: false
          }
        case EMP_ADD_DATA:
        case EMP_UPDATE_DATA:
          return {
              ...state,
              empData: [...state.empData, action.payload],
              loading: false
          }
        case EMP_REMOVE_DATA:
          return {
              ...state,
              empData: state.empData.filter(emp => emp._id !== action.payload),
              loading: false
          }
        case EMP_ERROR_DATA:
          return {
              ...state,
              error: action.payload,
              loading: false
          }
        default:
            return state
    }
}