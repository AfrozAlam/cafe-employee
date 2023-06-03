import { CAFE_FETCH_DATA, CAFE_ADD_DATA, CAFE_UPDATE_DATA, CAFE_REMOVE_DATA, CAFE_ERROR_DATA } from "./types";
import axios from 'axios';

const config = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const fetchData = () => async (dispatch) => {
  try {
    const res = await axios.get('/cafe', config);

    dispatch({
      type: CAFE_FETCH_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}

export const addData = (cafe) => async (dispatch) => {
  try {
    const res = await axios.post('/cafe', cafe, config);

    dispatch({
      type: CAFE_ADD_DATA,
      payload: res.data
    });
  } catch (e) {
    dispatch({ type: CAFE_ERROR_DATA, payload: e.response.data });
    console.log(e)
  }
}

export const updateData = (id, cafe) => async (dispatch) => {
  try {
    const res = await axios.put(`/cafe/${id}`, cafe, config);

    dispatch({
      type: CAFE_UPDATE_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}

export const removeData = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/cafe/${id}`, config);

    dispatch({
      type: CAFE_REMOVE_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}
