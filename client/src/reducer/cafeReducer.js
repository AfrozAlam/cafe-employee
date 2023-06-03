import { CAFE_FETCH_DATA, CAFE_ADD_DATA, CAFE_UPDATE_DATA, CAFE_REMOVE_DATA, CAFE_ERROR_DATA } from '../actions/types';

const initialState = {
    cafeData: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
      case CAFE_FETCH_DATA:
        return {
            ...state,
            cafeData: action.payload,
            loading: false
        }
      case CAFE_ADD_DATA:
      case CAFE_UPDATE_DATA:
        return {
            ...state,
            cafeData: [...state.cafeData, action.payload],
            loading: false
        }
      case CAFE_REMOVE_DATA:
        return {
            ...state,
            cafeData: state.cafeData.filter(cafe => cafe._id !== action.payload),
            loading: false
        }
      case CAFE_ERROR_DATA:
        return {
            ...state,
            error: action.payload,
            loading: false
        }
      default:
          return state
  }
}