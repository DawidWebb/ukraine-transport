import request from "../../helpers/request";
import {
  cookieSet,
  cookieDel,
  itemSet,
  itemDel,
  addSpinner,
  removeSpinner,
  timeoutShowTask,
} from "./index";
export const USER_ADD = "USER_ADD";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const USER_CONFIRMED = "USER_CONFIRMED";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN = "USER_LOGIN";
export const USER_EDIT = "USER_EDIT";
export const SET_PASSWORD = "SET_PASSWORD";

export const addUser = (userData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("users/add", userData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Użytkownik ${userData.name} dodany`));
    dispatch({
      type: USER_ADD,
      payload: `Użytkownik ${userData.name} dodany, lecz jest nie aktywny. Sprawdź maila podanego przy rejestracji i postępuj zgodnie z zawartymi w nim instrukcjami.`,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const confrimAddUser = (userLogin) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get(`users/confirm/${userLogin}`);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch({
      type: USER_CONFIRMED,
      payload: data.message,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const lostPassword = (userLogin) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.get(
    `users/lost-password/${userLogin}`
  );
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: SET_PASSWORD,
      payload: data.message,
    });
    dispatch(
      timeoutShowTask("Na podany adres eMail zostało wysłane hasło tymczasowe")
    );
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const editUser = (userData) => async (dispatch) => {
  dispatch(addSpinner());
  const { status } = await request.put("/users", userData);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(`Dane użytkownika zaktualizowane`));
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask("W tym momencie nie jest możliwa zmiana zasobów"));
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        `Przepraszamy błąd po stronie serwera, spróbuj jeszcze raz`
      )
    );
  }
};

export const getUser = (userId) => async (dispatch) => {
  dispatch(addSpinner());

  const { data, status } = await request.get(`users/${userId}`);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const userLogin = (userData) => async (dispatch) => {
  dispatch(addSpinner());
  const { data, status } = await request.post("users", userData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
    dispatch(cookieSet(data.user.access));
    const userDataToStorege = {
      name: data.user.name,
      loginId: data.user.loginId,
      id: data.user.id,
      addDate: data.user.addDate,
      eMail: data.user.user,
    };

    dispatch(itemSet(userDataToStorege));
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
export const addLogout = () => (dispatch) => {
  dispatch(cookieDel());
  dispatch(itemDel());
  dispatch({
    type: USER_LOGOUT,
  });
};

export const deleteUser = (userData) => async (dispatch) => {
  dispatch(addSpinner());
  const { id, password } = userData;
  const { data, status } = await request.delete(`users/${id}.${password}`);

  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(cookieDel());
    dispatch(itemDel());
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch(timeoutShowTask("Twoje konto zostało usunięte"));
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
