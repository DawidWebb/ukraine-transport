import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, lostPassword } from "../../data/actions";
import { Form, Field } from "react-final-form";
import { Button, Modal } from "../../components";
import {
  GENERAL_BTN_FORW,
  GENERAL_BTN_CLOSE,
  ADD_USER_LG,
  LOST_PASS_LG,
  GENERAL_REQUIRED_INFO,
  LOGIN_LG,
  PASS_LG,
  LOST_PASS_MASS_LG,
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
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [isLostPassPannelVisible, setIsLostPassPannelVisible] = useState(false);

  const required = (value) =>
    value
      ? undefined
      : sessionStorege === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;

  const handleOnCloseLoginPannel = () => {
    options.setIsLoginPannelOpen(false);
    setIsLostPassPannelVisible(false);
  };

  const handleOnSubmit = (values) => {
    if (!isLostPassPannelVisible) {
      const userData = {
        login: values.login,
        password: values.password,
        language: sessionStorege,
      };

      dispatch(userLogin(userData));
    } else {
      const userData = {
        login: values.login,
        language: sessionStorege,
      };
      dispatch(lostPassword(userData));
    }
    if (user) {
      options.setIsLoginPannelOpen(false);
    }
  };

  const handleOpenLostPasswordPannel = () => {
    setIsLostPassPannelVisible(true);
  };

  return (
    <Modal isModalOpen={options.isLoginPannelOpen}>
      {!isLostPassPannelVisible ? (
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
                        {values.login ? <p>login</p> : <p></p>}
                        <input
                          type="text"
                          {...input}
                          placeholder={
                            sessionStorege === "PL" ? LOGIN_LG.pl : LOGIN_LG.ua
                          }
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className={styles.element}>
                  <Field name="password" validate={required}>
                    {({ input, meta }) => (
                      <div>
                        {values.password ? <p>hasło</p> : <p></p>}
                        <input
                          type="password"
                          {...input}
                          placeholder={
                            sessionStorege === "PL" ? PASS_LG.pl : PASS_LG.ua
                          }
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className={styles.buttons}>
                  <Button
                    type="button"
                    name={
                      sessionStorege === "PL"
                        ? GENERAL_BTN_CLOSE.pl
                        : GENERAL_BTN_CLOSE.ua
                    }
                    onClick={handleOnCloseLoginPannel}
                  />
                  <Button
                    type="submit"
                    name={
                      sessionStorege === "PL"
                        ? GENERAL_BTN_FORW.pl
                        : GENERAL_BTN_FORW.ua
                    }
                  />
                </div>
              </form>
            )}
          />
          <div className={styles.operations}>
            <Link to="/" onClick={handleOpenLostPasswordPannel}>
              {sessionStorege === "PL" ? LOST_PASS_LG.pl : LOST_PASS_LG.ua}
            </Link>
            <Link to="/add-user" onClick={handleOnCloseLoginPannel}>
              {sessionStorege === "PL" ? ADD_USER_LG.pl : ADD_USER_LG.ua}
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <h4>
            {sessionStorege === "PL"
              ? LOST_PASS_MASS_LG.pl
              : LOST_PASS_MASS_LG.ua}
          </h4>
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
                        {values.login ? <p>login</p> : <p></p>}
                        <input
                          type="text"
                          {...input}
                          placeholder={
                            sessionStorege === "PL" ? LOGIN_LG.pl : LOGIN_LG.ua
                          }
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className={styles.buttons}>
                  <Button
                    type="button"
                    name={
                      sessionStorege === "PL"
                        ? GENERAL_BTN_CLOSE.pl
                        : GENERAL_BTN_CLOSE.ua
                    }
                    onClick={handleOnCloseLoginPannel}
                  />
                  <Button
                    type="submit"
                    name={
                      sessionStorege === "PL"
                        ? GENERAL_BTN_FORW.pl
                        : GENERAL_BTN_FORW.ua
                    }
                  />
                </div>
              </form>
            )}
          />
        </div>
      )}
    </Modal>
  );
};

export default React.memo(LoginPannel);
