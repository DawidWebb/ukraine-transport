import request from "../../helpers/request";
import { addSpinner, removeSpinner, timeoutShowTask } from "./index";
export const GET_ALL_TRANSPORTS = "GET_ALL_TRANSPORTS";
export const ADD_TRANSPORT = "ADD_TRANSPORT";
export const EDIT_TRANSPORT = "EDIT_TRANSPORT";
export const DEL_TRANSPORT = "DEL_TRANSPORT";

export const GET_ALL_NEEDS = "GET_ALL_NEEDS";
export const ADD_NEEDS = "ADD_NEEDS";
export const EDIT_NEEDS = "EDIT_NEEDS";
export const DEL_NEEDS = "DEL_NEEDS";

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

export const getAllNeeds = () => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get("need-transport");
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: GET_ALL_NEEDS,
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
export const addNeeds = (transportData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("need-transport", transportData);
  if (status === 201) {
    dispatch(removeSpinner());
    dispatch({
      type: ADD_NEEDS,
      payload: data.data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const editTransport = (transportData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.put("have-transport", transportData);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch({
      type: EDIT_TRANSPORT,
      payload: data.data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const delTransport = (id) => async (dispatch) => {
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
};
