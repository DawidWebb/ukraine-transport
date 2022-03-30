import {
  USER_ADD,
  USER_CONFIRMED,
  USER_LOGOUT,
  USER_LOGIN,
  SET_PASSWORD,
} from "../actions";

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case USER_ADD:
      return [action.payload];
    case USER_CONFIRMED:
      return [action.payload];
    case SET_PASSWORD:
      return [action.payload];
    case USER_LOGIN:
      return [action.payload];
    case USER_LOGOUT:
      return [];
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
