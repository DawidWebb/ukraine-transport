import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { editTransport } from "../../data/actions";
import { Button, Modal } from "../../components";
import {
  GENERAL_REQUIRED_INFO,
  GENERAL_BTN_CLOSE,
  GENERAL_BTN_FORW,
  KIND_TRANSPORT_LG,
  DATE_AVAILABILITY_LG,
  CITIES_TRANSPORT_LG,
  PARAMS_TARNSPORT_LG,
} from "../../assets/languages";
import styles from "./editItem.module.scss";

const EditItem = ({ id, item, isEditModalOpen, setIsEditModalOpen }) => {
  const language = useSelector((store) => store.language);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const dispatch = useDispatch();

  const startDate = new Date(item.startDate).toISOString().split("T")[0];
  const endDate = new Date(item.endDate).toISOString().split("T")[0];

  const required = (value) =>
    value
      ? undefined
      : language[0] === "PL"
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
      kindOfTransport: values.kindOfTransport,
    };

    dispatch(editTransport(transportData));
    setIsEditModalOpen(false);
  };

  return (
    <Modal isModalOpen={isEditModalOpen}>
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
                <label>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="pepole"
                    initialValue={item.kindOfTransport}
                    validate={required}
                  />{" "}
                  {language[0] === "PL"
                    ? KIND_TRANSPORT_LG[1].pl
                    : KIND_TRANSPORT_LG[1].ua}
                </label>
                <label>
                  <Field
                    name="kindOfTransport"
                    component="input"
                    type="radio"
                    value="heavy"
                    initialValue={item.kindOfTransport}
                  />{" "}
                  {language[0] === "PL"
                    ? KIND_TRANSPORT_LG[0].pl
                    : KIND_TRANSPORT_LG[0].ua}
                </label>
              </div>
              <div className={styles.dates}>
                <label>
                  {language[0] === "PL"
                    ? DATE_AVAILABILITY_LG[0].pl
                    : DATE_AVAILABILITY_LG[0].ua}
                  <Field
                    name="startDate"
                    component="input"
                    type="date"
                    value="startDate"
                    initialValue={startDate}
                    validate={required}
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
                    initialValue={endDate}
                    validate={required}
                  />{" "}
                </label>
              </div>
              <div className={styles.cities}>
                <label>
                  {language[0] === "PL"
                    ? CITIES_TRANSPORT_LG[0].pl
                    : CITIES_TRANSPORT_LG[0].ua}
                  <Field
                    name="loadCity"
                    component="input"
                    type="text"
                    value="loadCity"
                    initialValue={item.loadCity}
                    validate={required}
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
                    initialValue={item.delCity}
                    validate={required}
                  />{" "}
                </label>
              </div>
              <div
                className={styles.parametrs}
                style={{
                  display: `${
                    !values.delCity || values.kindOfTransport === "pepole"
                      ? "none"
                      : "block"
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
                    initialValue={item.kindOfTruck}
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
                    initialValue={item.weight}
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
                    initialValue={item.package}
                  />{" "}
                </label>
              </div>
              <div className={styles.additional}>
                <label>
                  {language[0] === "PL"
                    ? PARAMS_TARNSPORT_LG[3].pl
                    : PARAMS_TARNSPORT_LG[3].ua}
                  <Field
                    name="quanity"
                    component="input"
                    type="number"
                    value="quanity"
                    initialValue={item.quanity}
                    validate={required}
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
                    initialValue={item.describe}
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
                    initialValue={item.contact}
                    validate={required}
                  />{" "}
                </label>
              </div>
              <div className={styles.buttons}>
                <div>
                  <Button
                    type="button"
                    name={
                      language[0] === "PL"
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

export default EditItem;
