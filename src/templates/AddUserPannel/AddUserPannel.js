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
  ADD_USER_PASS_REQUIRE,
  ADD_USER_RODO_LG,
  ADD_USER_CONDITIONS_LG,
} from "../../assets/languages";

import styles from "./addUserPannel.module.scss";

const AddUserPannel = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
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
            sessionStorege === "PL"
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
      language: sessionStorege,
      rodo: values.rodo,
      conditions: values.conditions,
    };
    dispatch(addUser(userData));
    navigate("/");
  };

  const passwordChanged = (value) => {
    const strongRegex = new RegExp(
      "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
      "g"
    );
    const mediumRegex = new RegExp(
      "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
      "g"
    );
    const enoughRegex = new RegExp("(?=.{8,}).*", "g");

    if (!value) {
      return sessionStorege === "PL"
        ? ADD_USER_PASS_REQUIRE[0].pl
        : ADD_USER_PASS_REQUIRE[0].ua;
    } else if (false === enoughRegex.test(value)) {
      return sessionStorege === "PL"
        ? ADD_USER_PASS_REQUIRE[1].pl
        : ADD_USER_PASS_REQUIRE[1].ua;
    } else if (strongRegex.test(value)) {
      return sessionStorege === "PL" ? (
        <p style={{ color: "green" }}>{ADD_USER_PASS_REQUIRE[4].pl}</p>
      ) : (
        <p style={{ color: "green" }}>{ADD_USER_PASS_REQUIRE[4].ua}</p>
      );
    } else if (mediumRegex.test(value)) {
      return sessionStorege === "PL" ? (
        <p style={{ color: "blue" }}>{ADD_USER_PASS_REQUIRE[3].pl}</p>
      ) : (
        <p style={{ color: "blue" }}>{ADD_USER_PASS_REQUIRE[3].ua}</p>
      );
    } else {
      return sessionStorege === "PL"
        ? ADD_USER_PASS_REQUIRE[2].pl
        : ADD_USER_PASS_REQUIRE[2].ua;
    }
  };

  const required = (value) =>
    value
      ? undefined
      : sessionStorege === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;
  return (
    <div className={styles.wrapper}>
      <h2>
        {sessionStorege === "PL" ? ADD_USER_TITLE_LG.pl : ADD_USER_TITLE_LG.ua}
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
                          {sessionStorege === "PL"
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
                          sessionStorege === "PL"
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
                          {sessionStorege === "PL"
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
                          sessionStorege === "PL"
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
                <Field name="password" validate={passwordChanged}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        type="password"
                        max="20"
                        {...input}
                        placeholder={
                          sessionStorege === "PL"
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
                          {sessionStorege === "PL"
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
                          sessionStorege === "PL"
                            ? ADD_USER_RE_PASS_LG.pl
                            : ADD_USER_RE_PASS_LG.ua
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.element}>
                <Field name="rodo" type="checkbox" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.check}>
                      <label htmlFor="rodo">
                        <input type="checkbox" id="rodo" {...input} />

                        <p
                          style={{
                            color: !values.rodo
                              ? "rgb(242, 29, 29)"
                              : "rgb(2, 152, 2)",
                          }}
                        >
                          {sessionStorege === "PL"
                            ? ADD_USER_RODO_LG.pl
                            : ADD_USER_RODO_LG.ua}
                        </p>
                      </label>
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.element}>
                <Field name="conditions" type="checkbox" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.check}>
                      <label htmlFor="conditions">
                        <input type="checkbox" id="conditions" {...input} />

                        <p
                          style={{
                            color: !values.conditions
                              ? "rgb(242, 29, 29)"
                              : "rgb(2, 152, 2)",
                          }}
                        >
                          {sessionStorege === "PL"
                            ? ADD_USER_CONDITIONS_LG.pl
                            : ADD_USER_CONDITIONS_LG.ua}
                        </p>
                      </label>
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.buttons}>
                <Button
                  type="button"
                  name={
                    sessionStorege === "PL"
                      ? GENERAL_BTN_EXIT.pl
                      : GENERAL_BTN_EXIT.ua
                  }
                  onClick={handleOnGoToStart}
                />
                <Button
                  type="submit"
                  name={
                    sessionStorege === "PL"
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
