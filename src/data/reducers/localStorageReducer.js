import { ITEM_SET, ITEM_DELETE } from "../actions";

const initialState = {
  storageData: false,
};

export const localStorageReducer = (state = [initialState], action) => {
  switch (action.type) {
    case ITEM_SET:
      return [{ storageData: action.storageData }];
    case ITEM_DELETE:
      return [{ storageData: action.storageData }];
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
