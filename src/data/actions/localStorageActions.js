import {
  addItem,
  deleteItem,
  checkItem,
} from "../../helpers/localStorageOptions";

export const ITEM_SET = "ITEM_SET";
export const ITEM_DELETE = "ITEM_DELETE";

export const itemSet = (data) => async (dispatch) => {
  addItem(data);
  dispatch({
    type: ITEM_SET,
    storageData: data,
  });
};
export const itemCheck = () => async (dispatch) => {
  if (!checkItem()) {
    return;
  } else {
    dispatch({
      type: ITEM_SET,
      storageData: checkItem(),
    });
  }
};
export const itemDel = () => async (dispatch) => {
  deleteItem();
  dispatch({
    type: ITEM_DELETE,
    storageData: false,
  });
};
