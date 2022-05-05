import React from "react";
import { useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button } from "../../components";
import {
  ADD_USER_NAME_LG,
  CONTACT_MENU_LG,
  ADD_USER_MAIL_LG,
  CONTACT_FORM_OPTIONS_LG,
  GENERAL_REQUIRED_INFO,
  GENERAL_BTN_EXIT,
  GENERAL_BTN_SAVE,
  ADD_USER_RODO_LG,
  ADD_USER_CONDITIONS_LG,
} from "../../assets/languages";
import styles from "./contactViev.module.scss";

const ContactViev = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);

  const optionViev = CONTACT_FORM_OPTIONS_LG.map((item) => (
    <option key={item.id} value={item.id}>
      {sessionStorege === "PL" ? item.pl : item.ua}
    </option>
  ));

  const handleOnSubmit = (values) => {};

  const required = (value) =>
    value
      ? undefined
      : sessionStorege === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;

  return (
    <div className={styles.wrapper}>
      <div className={styles.picture}>
        <h3>
          {sessionStorege === "PL"
            ? CONTACT_MENU_LG[0].pl
            : CONTACT_MENU_LG[0].ua}
        </h3>
      </div>
      <div className={styles.inside}>
        <div className={styles.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
          </svg>
          <p>
            {" "}
            {sessionStorege === "PL"
              ? CONTACT_MENU_LG[1].pl
              : CONTACT_MENU_LG[1].ua}
          </p>
        </div>
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
                <Field name="email" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        type="email"
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
                <Field name="title" component="select">
                  {optionViev}
                </Field>
              </div>
              <div className={styles.element}>
                <Field name="info" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <textarea
                        placeholder={
                          sessionStorege === "PL"
                            ? CONTACT_MENU_LG[2].pl
                            : CONTACT_MENU_LG[2].ua
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.element}>
                <Field
                  name="rodoConditions"
                  type="checkbox"
                  validate={required}
                >
                  {({ input, meta }) => (
                    <div className={styles.check}>
                      <label htmlFor="rodo-conditions">
                        <input
                          type="checkbox"
                          id="rodo-conditions"
                          {...input}
                        />

                        <p
                          style={{
                            color: !values.rodoConditions
                              ? "rgb(242, 29, 29)"
                              : "rgb(2, 152, 2)",
                          }}
                        >
                          {sessionStorege === "PL"
                            ? CONTACT_MENU_LG[3].pl
                            : CONTACT_MENU_LG[3].ua}
                        </p>
                      </label>
                    </div>
                  )}
                </Field>
              </div>

              <div className={styles.buttons}>
                <Button
                  type="submit"
                  name={
                    sessionStorege === "PL"
                      ? CONTACT_MENU_LG[4].pl
                      : CONTACT_MENU_LG[4].ua
                  }
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default React.memo(ContactViev);
