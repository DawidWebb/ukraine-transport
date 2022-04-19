import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../data/actions";
import { Form, Field } from "react-final-form";
import { Button, Modal } from "../../components";
import {
  GENERAL_BTN_FORW,
  GENERAL_BTN_CLOSE,
  ADD_USER_LG,
  LOST_PASS_LG,
  GENERAL_REQUIRED_INFO,
} from "../../assets/languages";

import styles from "./loginPannel.module.scss";

const LoginPannel = ({ isLoginPannelOpen, setIsLoginPannelOpen }) => {
  const options = useMemo(
    () => ({
      isLoginPannelOpen,
      setIsLoginPannelOpen,
    }),
    [isLoginPannelOpen, setIsLoginPannelOpen]
  );
  const language = useSelector((store) => store.language);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const required = (value) =>
    value
      ? undefined
      : language[0] === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;

  const handleOnCloseLoginPannel = () => {
    options.setIsLoginPannelOpen(false);
  };

  const handleOnSubmit = (values) => {
    const userData = {
      login: values.login,
      password: values.password,
    };

    dispatch(userLogin(userData));
    dispatch(userLogin(userData));
    if (user) {
      options.setIsLoginPannelOpen(false);
    }
  };

  return (
    <Modal isModalOpen={options.isLoginPannelOpen}>
      <div className={styles.wrapper}>
        <Form
          onSubmit={handleOnSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              className={styles.form}
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
              <div className={styles.element}>
                <Field name="login" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.login ? <p>Login</p> : <p></p>}
                      <input type="text" {...input} placeholder="Login" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.element}>
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.password ? <p>Hasło</p> : <p></p>}
                      <input type="password" {...input} placeholder="Hasło" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.buttons}>
                <Button
                  type="button"
                  name={
                    language[0] === "PL"
                      ? GENERAL_BTN_CLOSE.pl
                      : GENERAL_BTN_CLOSE.ua
                  }
                  onClick={handleOnCloseLoginPannel}
                />
                <Button
                  type="submit"
                  name={
                    language[0] === "PL"
                      ? GENERAL_BTN_FORW.pl
                      : GENERAL_BTN_FORW.ua
                  }
                />
              </div>
            </form>
          )}
        />
        <div className={styles.operations}>
          <Link to="/" onClick={handleOnCloseLoginPannel}>
            {language[0] === "PL" ? LOST_PASS_LG.pl : LOST_PASS_LG.ua}
          </Link>
          <Link to="/add-user" onClick={handleOnCloseLoginPannel}>
            {language[0] === "PL" ? ADD_USER_LG.pl : ADD_USER_LG.ua}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(LoginPannel);
