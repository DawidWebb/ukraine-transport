import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../data/actions";
import { Form, Field } from "react-final-form";
import { Button, Modal } from "../../components";
import {
  CLOSE_BTN_LG,
  FORRWARD_BTN_LG,
  ADD_USER_LG,
  LOST_PASS_LG,
  WORRNING_LANG,
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
      ? WORRNING_LANG[0].pl
      : WORRNING_LANG[0].ua;

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
                      <input type="text" {...input} placeholder="Login" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                      <p
                        style={{
                          display: `${values.login ? "block" : "none"}`,
                        }}
                      >
                        Login
                      </p>
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.element}>
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input type="password" {...input} placeholder="Hasło" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                      <p
                        style={{
                          display: `${values.password ? "block" : "none"}`,
                        }}
                      >
                        Hasło
                      </p>
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.buttons}>
                <Button
                  type="button"
                  name={
                    language[0] === "PL" ? CLOSE_BTN_LG.pl : CLOSE_BTN_LG.ua
                  }
                  onClick={handleOnCloseLoginPannel}
                />
                <Button
                  type="submit"
                  name={
                    language[0] === "PL"
                      ? FORRWARD_BTN_LG.pl
                      : FORRWARD_BTN_LG.ua
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
          <Link to="/" onClick={handleOnCloseLoginPannel}>
            {language[0] === "PL" ? ADD_USER_LG.pl : ADD_USER_LG.ua}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(LoginPannel);
