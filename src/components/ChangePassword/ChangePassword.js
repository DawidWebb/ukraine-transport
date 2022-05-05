import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "../../components";
import { editUser } from "../../data/actions";
import {
  USER_ACCOUNT_CHANGE_PASS_LG,
  USER_ACCOUNT_VALIDATION_LG,
} from "../../assets/languages";
import styles from "./changePassword.module.scss";

const ChangePasword = ({ isModalOpen, setIsModalOpen }) => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );

  const dispatch = useDispatch();

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const [newPass, setNewPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [validationInfo, setValidationInfo] = useState("");

  const setNewPassword = (e) => {
    setNewPass(e.target.value);
  };
  const confirmPassword = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!newPass || !confirmPass) {
      const lackPass =
        sessionStorege === "PL"
          ? USER_ACCOUNT_VALIDATION_LG[0].pl
          : USER_ACCOUNT_VALIDATION_LG[0].ua;

      setValidationInfo(lackPass);
      setTimeout(() => {
        setValidationInfo("");
      }, 4000);
      clearTimeout();
    } else if (newPass !== confirmPass) {
      const diffPass =
        sessionStorege === "PL"
          ? USER_ACCOUNT_VALIDATION_LG[1].pl
          : USER_ACCOUNT_VALIDATION_LG[1].ua;
      setValidationInfo(diffPass);
      setValidationInfo(diffPass);
      setTimeout(() => {
        setValidationInfo("");
      }, 4000);
      clearTimeout();
    } else {
      console.log("OK");
      setValidationInfo("");
      const userData = {
        id: localStorage.id,
        password: newPass,
      };
      dispatch(editUser(userData));
    }
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <h4>
          {sessionStorege === "PL"
            ? USER_ACCOUNT_CHANGE_PASS_LG[0].pl
            : USER_ACCOUNT_CHANGE_PASS_LG[0].ua}
        </h4>
        <form onSubmit={handleOnSubmit}>
          <input
            onChange={setNewPassword}
            type="password"
            placeholder={
              sessionStorege === "PL"
                ? USER_ACCOUNT_CHANGE_PASS_LG[1].pl
                : USER_ACCOUNT_CHANGE_PASS_LG[1].ua
            }
          />
          <input
            onChange={confirmPassword}
            type="password"
            placeholder={
              sessionStorege === "PL"
                ? USER_ACCOUNT_CHANGE_PASS_LG[2].pl
                : USER_ACCOUNT_CHANGE_PASS_LG[2].ua
            }
          />
          <div className={styles.validationInfo}>{validationInfo}</div>
          <div className={styles.buttons}>
            <Button
              type="button"
              name={
                sessionStorege === "PL"
                  ? USER_ACCOUNT_CHANGE_PASS_LG[3].pl
                  : USER_ACCOUNT_CHANGE_PASS_LG[3].ua
              }
              onClick={handleOnCloseModal}
            />
            <Button
              type="submit"
              name={
                sessionStorege === "PL"
                  ? USER_ACCOUNT_CHANGE_PASS_LG[4].pl
                  : USER_ACCOUNT_CHANGE_PASS_LG[4].ua
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default React.memo(ChangePasword);
