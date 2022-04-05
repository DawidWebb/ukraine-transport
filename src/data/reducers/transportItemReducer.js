import { ADD_TRANSPORT, GET_ALL_TRANSPORTS } from "../actions";

const initialState = [];

export const transportItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRANSPORTS:
      return (state = action.payload);
    case ADD_TRANSPORT:
      return [...state, action.payload];
    default:
      return state;
  }
};
