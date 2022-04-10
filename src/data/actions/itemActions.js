import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";
export const GET_ALL_TRANSPORTS = "GET_ALL_TRANSPORTS";
export const ADD_TRANSPORT = "ADD_TRANSPORT";
export const DEL_TRANSPORT = "DEL_TRANSPORT";

export const getAllTransports = () => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get("have-transport");
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: GET_ALL_TRANSPORTS,
      payload: data.data,
    });
  }
};

export const addTransport = (transportData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("have-transport", transportData);
  if (status === 201) {
    dispatch(removeSpinner());
    dispatch({
      type: ADD_TRANSPORT,
      payload: data.data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const detTransport = (id)=> async (dispatch )=>{
  dispatch(addSpinner());
  const { data, status } = await request.delete(`have-transport/${id}`);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: DEL_TRANSPORT,
      payload: id,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
 }