import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { taskMessengerOnly, addUser } from "../../data/actions";
import { Form, Field } from "react-final-form";
import { Button } from "../../components";
import {
  GENERAL_BTN_EXIT,
  GENERAL_BTN_SAVE,
  GENERAL_REQUIRED_INFO,
  ADD_USER_TITLE_LG,
  ADD_USER_NAME_LG,
  ADD_USER_MAIL_LG,
  ADD_USER_PASS_LG,
  ADD_USER_RE_PASS_LG,
  ADD_USER_DIF_PASS_LG,
} from "../../assets/languages";

import styles from "./addUserPannel.module.scss";

const AddUserPannel = () => {
  const language = useSelector((store) => store.language);
  const task = useSelector((store) => store.task);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnGoToStart = () => {
    navigate("/");
  };

  const handleOnSubmit = (values) => {
    if (values.password !== values.repassword) {
      dispatch(
        taskMessengerOnly(
          `${
            language[0] === "PL"
              ? ADD_USER_DIF_PASS_LG.pl
              : ADD_USER_DIF_PASS_LG.ua
          }`
        )
      );
      return;
    }
    const userData = {
      login: values.login,
      password: values.password,
      name: values.name,
      dateofAdd: new Date(),
    };
    dispatch(addUser(userData));
    navigate("/");
  };
  const required = (value) =>
    value
      ? undefined
      : language[0] === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;
  return (
    <div className={styles.wrapper}>
      <h2>
        {language[0] === "PL" ? ADD_USER_TITLE_LG.pl : ADD_USER_TITLE_LG.ua}
      </h2>
      <div className={styles.inside}>
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
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.name ? (
                        <p>
                          {language[0] === "PL"
                            ? ADD_USER_NAME_LG.pl
                            : ADD_USER_NAME_LG.ua}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                      <input
                        type="text"
                        {...input}
                        placeholder={
                          language[0] === "PL"
                            ? ADD_USER_NAME_LG.pl
                            : ADD_USER_NAME_LG.ua
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.element}>
                <Field name="login" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.login ? (
                        <p>
                          {language[0] === "PL"
                            ? ADD_USER_MAIL_LG.pl
                            : ADD_USER_MAIL_LG.ua}
                        </p>
                      ) : (
                        <p></p>
                      )}
                      <input
                        type="text"
                        {...input}
                        placeholder={
                          language[0] === "PL"
                            ? ADD_USER_MAIL_LG.pl
                            : ADD_USER_MAIL_LG.ua
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.element}>
                <Field name="password" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.password ? (
                        <p>
                          {language[0] === "PL"
                            ? ADD_USER_PASS_LG.pl
                            : ADD_USER_PASS_LG.ua}
                        </p>
                      ) : (
                        <p> </p>
                      )}
                      <input
                        type="password"
                        {...input}
                        placeholder={
                          language[0] === "PL"
                            ? ADD_USER_PASS_LG.pl
                            : ADD_USER_PASS_LG.ua
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.element}>
                <Field name="repassword" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      {values.repassword ? (
                        <p>
                          {language[0] === "PL"
                            ? ADD_USER_RE_PASS_LG.pl
                            : ADD_USER_RE_PASS_LG.ua}
                        </p>
                      ) : (
                        <p></p>
                      )}
                      <input
                        type="password"
                        {...input}
                        placeholder={
                          language[0] === "PL"
                            ? ADD_USER_RE_PASS_LG.pl
                            : ADD_USER_RE_PASS_LG.ua
                        }
                      />
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
                      ? GENERAL_BTN_EXIT.pl
                      : GENERAL_BTN_EXIT.ua
                  }
                  onClick={handleOnGoToStart}
                />
                <Button
                  type="submit"
                  name={
                    language[0] === "PL"
                      ? GENERAL_BTN_SAVE.pl
                      : GENERAL_BTN_SAVE.ua
                  }
                />
              </div>
            </form>
          )}
        />
        <div className={styles.info}>{task[0].task}</div>
      </div>
    </div>
  );
};

export default React.memo(AddUserPannel);
