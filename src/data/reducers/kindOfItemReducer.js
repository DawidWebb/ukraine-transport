import { SET_KIND_OF_ITEM, CLEAR_KIND_OF_ITEM } from "../actions";

const initialState = false;

export const kindOfItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_KIND_OF_ITEM:
      return (state = action.payload);
    case CLEAR_KIND_OF_ITEM:
      return (state = action.action.payload);

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
