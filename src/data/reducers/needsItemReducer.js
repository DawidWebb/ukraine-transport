import { GET_ALL_NEEDS, ADD_NEEDS, EDIT_NEEDS, DEL_NEEDS } from "../actions";

const initialState = [];

export const needsItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NEEDS:
      return (state = action.payload);
    case ADD_NEEDS:
      return [...state, action.payload];
    case EDIT_NEEDS:
      const index = state.findIndex((item) => item._id === action.payload._id);
      state.splice(index, 1, action.payload);
      return [...state];
    case DEL_NEEDS:
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};
