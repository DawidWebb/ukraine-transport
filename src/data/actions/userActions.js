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
  const { language } = userData;
  dispatch(addSpinner());
  const { data, status } = await request.post("users/add", userData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? `Użytkownik ${userData.name} dodany`
          : `Користувач ${userData.name} додано`
      )
    );
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

export const lostPassword = (userData) => async (dispatch) => {
  const { login, language } = userData;
  dispatch(addSpinner());
  const { data, status } = await request.get(
    `users/lost-password/${login}.${language}`
  );
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch({
      type: SET_PASSWORD,
      payload: data.message,
    });
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? "Na podany adres eMail zostało wysłane hasło tymczasowe"
          : "На вказану адресу електронної пошти надіслано тимчасовий пароль"
      )
    );
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const editUser = (userData) => async (dispatch) => {
  const { language } = userData;
  dispatch(addSpinner());
  const { status } = await request.put("/users", userData);
  console.log(status);
  if (status === 202) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? "Dane użytkownika zaktualizowane"
          : "Дані користувача оновлені"
      )
    );
  } else if (status === 404) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? "W tym momencie nie jest możliwa zmiana zasobów"
          : "На даний момент змінити ресурси неможливо"
      )
    );
  } else {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? "Przepraszamy błąd po stronie serwera, spróbuj za kilka minut."
          : "На жаль, помилка на стороні сервера, будь ласка, спробуйте за кілька хвилин."
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
  const { id, language } = userData;

  console.log(id);

  dispatch(addSpinner());

  const { data, status } = await request.delete(`users/${id}.${language}`);

  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(cookieDel());
    dispatch(itemDel());
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch(
      timeoutShowTask(
        language === "PL"
          ? "Twoje konto zostało usunięte"
          : "Ваш обліковий запис видалено"
      )
    );
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};

export const sendMailByUserForm = (formData) => async (dispatch) => {
  const { language } = formData;
  dispatch(addSpinner());
  const { data, status } = await request.post(`admin/form/`, formData);
  if (status === 200) {
    dispatch(removeSpinner());
    dispatch(
      timeoutShowTask(
        language === "PL" ? "Twój mail został wysłany" : "Ваш e-mail надіслано"
      )
    );
  } else {
    dispatch(removeSpinner());
    dispatch(timeoutShowTask(data.message));
  }
};
