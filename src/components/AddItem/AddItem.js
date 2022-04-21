import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { addTransport, addNeeds } from "../../data/actions";
import { Button, Modal } from "../../components";
import {
  GENERAL_BTN_EXIT,
  GENERAL_BTN_FORW,
  GENERAL_REQUIRED_INFO,
  KIND_TRANSPORT_LG,
  DATE_AVAILABILITY_LG,
  CITIES_TRANSPORT_LG,
  PARAMS_TARNSPORT_LG,
} from "../../assets/languages";
import styles from "./addItem.module.scss";

const AddItem = ({
  isAddVechicleModalOpen,
  setIsAddVechicleModalOpen,
  kindOfItem,
}) => {
  const language = useSelector((store) => store.language);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );

  const dispatch = useDispatch();

  const required = (value) =>
    value
      ? undefined
      : language[0] === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;

  const handleOnCloseAddVechicleModal = () => {
    setIsAddVechicleModalOpen(false);
  };

  const handleOnSubmit = (values) => {
    const transportData = {
      userId: localStorage.id,
      loadCity: values.loadCity,
      delCity: values.delCity,
      startDate: values.startDate,
      endDate: values.endDate,
      kindOfTruck: !values.kindOfTruck ? "" : values.kindOfTruck,
      weight: !values.weight ? "" : values.weight,
      package: !values.package ? "" : values.package,
      quanity: values.quanity,
      describe: !values.describe ? "" : values.describe,
      contact: values.contact,
      kindOfTransport: values.kindOfTransport,
    };

    if (kindOfItem === "have") {
      dispatch(addTransport(transportData));
    } else {
      dispatch(addNeeds(transportData));
    }
    setIsAddVechicleModalOpen(false);
  };

  return (
    <Modal isModalOpen={isAddVechicleModalOpen}>
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
              <div className={styles.transport}>
                <div className={styles.stage}>
                  <div>1</div>
                </div>
                <div className={styles.element}>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="pepole"
                    id="pepole"
                    validate={required}
                  />{" "}
                  <label htmlFor="pepole">
                    {language[0] === "PL"
                      ? KIND_TRANSPORT_LG[1].pl
                      : KIND_TRANSPORT_LG[1].ua}
                  </label>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="heavy"
                    id="heavy"
                  />{" "}
                  <label htmlFor="heavy">
                    {language[0] === "PL"
                      ? KIND_TRANSPORT_LG[0].pl
                      : KIND_TRANSPORT_LG[0].ua}
                  </label>
                </div>
              </div>
              <div className={styles.dates}>
                <div className={styles.stage}>
                  <div>2</div>
                </div>
                <div
                  className={styles.element}
                  style={{
                    display: `${!values.kindOfTransport ? "none" : "flex"}`,
                  }}
                >
                  <label>
                    {language[0] === "PL"
                      ? DATE_AVAILABILITY_LG[0].pl
                      : DATE_AVAILABILITY_LG[0].ua}
                    <Field
                      name="startDate"
                      component="input"
                      type="date"
                      value="startDate"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.startDate ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? DATE_AVAILABILITY_LG[1].pl
                      : DATE_AVAILABILITY_LG[1].ua}
                    <Field
                      name="endDate"
                      component="input"
                      type="date"
                      value="endDate"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.endDate ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                </div>
              </div>

              <div className={styles.cities}>
                <div className={styles.stage}>
                  <div>3</div>
                </div>
                <div
                  className={styles.element}
                  style={{
                    display: `${!values.endDate ? "none" : "flex"}`,
                  }}
                >
                  <label>
                    {language[0] === "PL"
                      ? CITIES_TRANSPORT_LG[0].pl
                      : CITIES_TRANSPORT_LG[0].ua}
                    <Field
                      name="loadCity"
                      component="input"
                      type="text"
                      value="loadCity"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.loadCity ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? CITIES_TRANSPORT_LG[1].pl
                      : CITIES_TRANSPORT_LG[1].ua}
                    <Field
                      name="delCity"
                      component="input"
                      type="text"
                      value="delCity"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.delCity ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className={styles.parametrs}>
                <div className={styles.stage}>
                  <div>4</div>
                </div>
                <div
                  className={styles.element}
                  style={{
                    display: `${
                      !values.delCity || values.kindOfTransport === "pepole"
                        ? "none"
                        : "flex"
                    }`,
                  }}
                >
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[0].pl
                      : PARAMS_TARNSPORT_LG[0].ua}
                    <Field
                      name="kindOfTruck"
                      component="input"
                      type="text"
                      value="kindOfTruck"
                      style={{
                        backgroundColor: `${
                          values.kindOfTruck
                            ? "rgb(222, 222, 24)"
                            : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[1].pl
                      : PARAMS_TARNSPORT_LG[1].ua}
                    <Field
                      name="weight"
                      component="input"
                      type="number"
                      value="weight"
                      min="100"
                      max="24000"
                      style={{
                        backgroundColor: `${
                          values.weight ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[2].pl
                      : PARAMS_TARNSPORT_LG[2].ua}
                    <Field
                      name="package"
                      component="input"
                      type="text"
                      value="package"
                      style={{
                        backgroundColor: `${
                          values.package ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className={styles.additional}>
                <div className={styles.stage}>
                  <div>5</div>
                </div>
                <div
                  className={styles.element}
                  style={{
                    display: `${!values.delCity ? "none" : "flex"}`,
                  }}
                >
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[3].pl
                      : PARAMS_TARNSPORT_LG[3].ua}
                    <Field
                      name="quanity"
                      component="input"
                      type="number"
                      value="quanity"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.quanity ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[4].pl
                      : PARAMS_TARNSPORT_LG[4].ua}
                    <Field
                      name="describe"
                      component="textarea"
                      type="text"
                      cols="30"
                      rows="5"
                      maxLength="300"
                      value="describe"
                      style={{
                        backgroundColor: `${
                          values.describe ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {language[0] === "PL"
                      ? PARAMS_TARNSPORT_LG[5].pl
                      : PARAMS_TARNSPORT_LG[5].ua}
                    <Field
                      name="contact"
                      component="textarea"
                      type="text"
                      cols="30"
                      rows="2"
                      maxLength="100"
                      value="contact"
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.contact ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                </div>
              </div>
              <div className={styles.buttons}>
                <div>
                  <Button
                    type="button"
                    name={
                      language[0] === "PL"
                        ? GENERAL_BTN_EXIT.pl
                        : GENERAL_BTN_EXIT.ua
                    }
                    onClick={handleOnCloseAddVechicleModal}
                  />
                </div>
                <div
                  style={{
                    display: `${!values.contact ? "none" : "block"}`,
                  }}
                >
                  <Button
                    type="submit"
                    name={
                      language[0] === "PL"
                        ? GENERAL_BTN_FORW.pl
                        : GENERAL_BTN_FORW.ua
                    }
                  />
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};

export default React.memo(AddItem);
