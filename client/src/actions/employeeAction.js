import { EMP_FETCH_DATA, EMP_ADD_DATA, EMP_UPDATE_DATA, EMP_REMOVE_DATA, EMP_ERROR_DATA } from "./types";
import axios from 'axios';

const config = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

export const fetchData = (id) => async (dispatch) => {
  try {
    let res;
    if(id) {
      res = await axios.get(`/employee?cafe=${id}`, config);
    } else {
      res = await axios.get('/employee', config);
    }

    dispatch({
      type: EMP_FETCH_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}

export const addData = (employee) => async (dispatch) => {
  try {
    const res = await axios.post('/employee', employee, config);

    dispatch({
      type: EMP_ADD_DATA,
      payload: res.data
    });
  } catch (e) {
    dispatch({ type: EMP_ERROR_DATA, payload: e.response.data });
    console.log(e)
  }
}

export const updateData = (id, employee) => async (dispatch) => {
  try {
    const res = await axios.put(`/employee/${id}`, employee, config);

    dispatch({
      type: EMP_UPDATE_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}

export const removeData = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/employee/${id}`, config);

    dispatch({
      type: EMP_REMOVE_DATA,
      payload: res.data
    });
  } catch (e) {
    console.log(e)
  }
}
