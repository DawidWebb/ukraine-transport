import {
  addSessionItem,
  deleteSessionItem,
  checkSessionItem,
} from "../../helpers/sessionStoregeOptions";

export const SESSION_ITEM_SET = "SESSION_ITEM_SET";
export const SESSION_ITEM_DELETE = "SESSION_ITEM_DELETE";

export const sessionItemSet = (language) => async (dispatch) => {
  addSessionItem(language);

  dispatch({
    type: SESSION_ITEM_SET,
    sessionStorage: language,
  });
};
export const sessionItemCheck = () => async (dispatch) => {
  if (!checkSessionItem()) {
    return;
  } else {
    dispatch({
      type: SESSION_ITEM_SET,
      sessionStorage: checkSessionItem(),
    });
  }
};
export const sessionItemDel = () => async (dispatch) => {
  deleteSessionItem();
  dispatch({
    type: SESSION_ITEM_DELETE,
    sessionStorage: false,
  });
};
