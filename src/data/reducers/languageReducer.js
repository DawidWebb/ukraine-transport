import { SET_LANG } from "../actions";

const initialState = ["PL"];

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return (state = action.payload);

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return initialState;
  }
};
