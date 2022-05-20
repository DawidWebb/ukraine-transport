import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { editTransport, editNeeds } from "../../data/actions";
import { Button, Modal } from "../../components";
import {
  GENERAL_REQUIRED_INFO,
  GENERAL_BTN_CLOSE,
  GENERAL_BTN_FORW,
  EDIT_TITLE_LG,
  DATE_AVAILABILITY_LG,
  CITIES_TRANSPORT_LG,
  PARAMS_TARNSPORT_LG,
} from "../../assets/languages";
import styles from "./editItem.module.scss";

const EditItem = ({
  id,
  item,
  isEditModalOpen,
  setIsEditModalOpen,
  kindOfItem,
}) => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const dispatch = useDispatch();

  const startDate = new Date(item.startDate).toISOString().split("T")[0];
  const endDate = new Date(item.endDate).toISOString().split("T")[0];

  const required = (value) =>
    value
      ? undefined
      : sessionStorege === "PL"
      ? GENERAL_REQUIRED_INFO.pl
      : GENERAL_REQUIRED_INFO.ua;

  const handleOnCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOnSubmit = (values) => {
    const transportData = {
      transportId: id,
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
      kindOfTransport: item.kindOfTransport,
    };
    if (kindOfItem === "have") {
      dispatch(editTransport(transportData));
    } else if (kindOfItem === "need") {
      dispatch(editNeeds(transportData));
    }

    setIsEditModalOpen(false);
  };

  return (
    <Modal isModalOpen={isEditModalOpen}>
      <div className={styles.wrapper}>
        <h3>
          {kindOfItem === "need"
            ? sessionStorege === "PL"
              ? EDIT_TITLE_LG[0].pl
              : EDIT_TITLE_LG[0].ua
            : sessionStorege === "PL"
            ? EDIT_TITLE_LG[1].pl
            : EDIT_TITLE_LG[1].ua}
        </h3>
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
                {/* <div className={styles.element}>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="pepole"
                    id="pepole"
                    initialValue={item.kindOfTransport}
                    validate={required}
                  />{" "}
                  <label htmlFor="pepole">
                    {sessionStorege === "PL"
                      ? KIND_TRANSPORT_LG[1].pl
                      : KIND_TRANSPORT_LG[1].ua}
                  </label>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="heavy"
                    id="heavy"
                    initialValue={item.kindOfTransport}
                  />{" "}
                  <label htmlFor="heavy">
                    {sessionStorege === "PL"
                      ? KIND_TRANSPORT_LG[0].pl
                      : KIND_TRANSPORT_LG[0].ua}
                  </label>
                </div> */}
              </div>
              <div className={styles.dates}>
                <div className={styles.element}>
                  <label>
                    {sessionStorege === "PL"
                      ? DATE_AVAILABILITY_LG[0].pl
                      : DATE_AVAILABILITY_LG[0].ua}
                    <Field
                      name="startDate"
                      component="input"
                      type="date"
                      value="startDate"
                      initialValue={startDate}
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.startDate ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {sessionStorege === "PL"
                      ? DATE_AVAILABILITY_LG[1].pl
                      : DATE_AVAILABILITY_LG[1].ua}
                    <Field
                      name="endDate"
                      component="input"
                      type="date"
                      value="endDate"
                      initialValue={endDate}
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
                <div className={styles.element}>
                  <label>
                    {sessionStorege === "PL"
                      ? CITIES_TRANSPORT_LG[0].pl
                      : CITIES_TRANSPORT_LG[0].ua}
                    <Field
                      name="loadCity"
                      component="input"
                      type="text"
                      value="loadCity"
                      initialValue={item.loadCity}
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.loadCity ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {sessionStorege === "PL"
                      ? CITIES_TRANSPORT_LG[1].pl
                      : CITIES_TRANSPORT_LG[1].ua}
                    <Field
                      name="delCity"
                      component="input"
                      type="text"
                      value="delCity"
                      initialValue={item.delCity}
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
                <div
                  className={styles.element}
                  style={{
                    display: `${
                      item.kindOfTransport === "pepole" ? "none" : "flex"
                    }`,
                  }}
                >
                  <label>
                    {sessionStorege === "PL"
                      ? PARAMS_TARNSPORT_LG[0].pl
                      : PARAMS_TARNSPORT_LG[0].ua}
                    <Field
                      name="kindOfTruck"
                      component="input"
                      type="text"
                      value="kindOfTruck"
                      initialValue={item.kindOfTruck}
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
                    {sessionStorege === "PL"
                      ? PARAMS_TARNSPORT_LG[1].pl
                      : PARAMS_TARNSPORT_LG[1].ua}
                    <Field
                      name="weight"
                      component="input"
                      type="number"
                      value="weight"
                      min="100"
                      max="24000"
                      initialValue={item.weight}
                      style={{
                        backgroundColor: `${
                          values.weight ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {sessionStorege === "PL"
                      ? PARAMS_TARNSPORT_LG[2].pl
                      : PARAMS_TARNSPORT_LG[2].ua}
                    <Field
                      name="package"
                      component="input"
                      type="text"
                      value="package"
                      initialValue={item.package}
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
                <div className={styles.element}>
                  <label>
                    {sessionStorege === "PL"
                      ? PARAMS_TARNSPORT_LG[3].pl
                      : PARAMS_TARNSPORT_LG[3].ua}
                    <Field
                      name="quanity"
                      component="input"
                      type="number"
                      value="quanity"
                      initialValue={item.quanity}
                      validate={required}
                      style={{
                        backgroundColor: `${
                          values.quanity ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {sessionStorege === "PL"
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
                      initialValue={item.describe}
                      style={{
                        backgroundColor: `${
                          values.describe ? "rgb(222, 222, 24)" : "transparent"
                        }`,
                      }}
                    />{" "}
                  </label>
                  <label>
                    {sessionStorege === "PL"
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
                      initialValue={item.contact}
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
                      sessionStorege === "PL"
                        ? GENERAL_BTN_CLOSE.pl
                        : GENERAL_BTN_CLOSE.ua
                    }
                    onClick={handleOnCloseEditModal}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    name={
                      sessionStorege === "PL"
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

export default EditItem;
