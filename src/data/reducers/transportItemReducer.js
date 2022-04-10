import { ADD_TRANSPORT, GET_ALL_TRANSPORTS, DEL_TRANSPORT } from "../actions";

const initialState = [];

export const transportItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSPORTS:
      return (state = action.payload);
    case ADD_TRANSPORT:
      return [...state, action.payload];
      case DEL_TRANSPORT:
        return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};
