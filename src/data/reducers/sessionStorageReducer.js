import { SESSION_ITEM_SET, SESSION_ITEM_DELETE } from "../actions";

const initialState = "PL";

export const sessionStorageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ITEM_SET:
      return (state = action.sessionStorage);
    case SESSION_ITEM_DELETE:
      return [{ sessionStorageData: action.sessionData }];
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
