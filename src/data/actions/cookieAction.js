import {
  addCookie,
  deleteCoockie,
  checkCookie,
} from "../../helpers/cookieSession";

export const COOKIE_SET = "COOKIE_SET";
export const COOKIE_DELETE = "COOKIE_DELETE";

export const cookieSet = (access) => async (dispatch) => {
  addCookie(access);
  dispatch({
    type: COOKIE_SET,
    isCookie: access,
  });
};
export const cookieCheck = () => async (dispatch) => {
  if (!checkCookie()) {
    return;
  } else {
    dispatch({
      type: COOKIE_SET,
      isCookie: checkCookie(),
    });
  }
};
export const cookieDel = () => async (dispatch) => {
  deleteCoockie();
  dispatch({
    type: COOKIE_DELETE,
    isCookie: false,
  });
};
