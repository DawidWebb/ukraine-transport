import {
  ADD_TRANSPORT,
  EDIT_TRANSPORT,
  GET_ALL_TRANSPORTS,
  DEL_TRANSPORT,
} from "../actions";

const initialState = [];

export const transportItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSPORTS:
      return (state = action.payload);
    case ADD_TRANSPORT:
      return [...state, action.payload];
    case EDIT_TRANSPORT:
      const index = state.findIndex((item) => item._id === action.payload._id);
      state.splice(index, 1, action.payload);
      return [...state];
    case DEL_TRANSPORT:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};
