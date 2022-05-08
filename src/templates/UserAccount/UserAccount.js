import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, ChangePassword, DeleteConfirmation } from "../../components";
import {
  USER_ACCOUNT_BUTTONS_LG,
  USER_ACCOUNT_TITLE_LG,
} from "../../assets/languages";
import styles from "./userAccount.module.scss";

const UserAccount = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [isDelConfirmModalOpen, setIsDelConfirmModalOpen] = useState(false);
  const [elementToDel, setElementToDel] = useState(false);

  const handleClickButtonById = (e) => {
    if (e.target.id === "user-button-change") {
      setIsChangePassModalOpen(true);
    } else if (e.target.id === "user-button-del") {
      setElementToDel({
        kindOfItem: "user",
        idElementToDel: localStorage.id,
      });
      setIsDelConfirmModalOpen(true);
    } else if (e.target.id === "user-button-activity") {
    }
  };

  const buttonsViev = USER_ACCOUNT_BUTTONS_LG.map((item) => (
    <Button
      key={item.id}
      type="button"
      name={sessionStorege === "PL" ? item.pl : item.ua}
      id={item.id}
      onClick={handleClickButtonById}
    />
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h2>
          {sessionStorege === "PL"
            ? USER_ACCOUNT_TITLE_LG.pl
            : USER_ACCOUNT_TITLE_LG.ua}
        </h2>
        <div className={styles.buttons}>{buttonsViev}</div>
        <div className={styles.activity}></div>
      </div>
      <ChangePassword
        isModalOpen={isChangePassModalOpen}
        setIsModalOpen={setIsChangePassModalOpen}
      />
      <DeleteConfirmation
        isDeleteConfirmationModalOpen={isDelConfirmModalOpen}
        setIsDeleteConfirmationModalOpen={setIsDelConfirmModalOpen}
        elementToDel={elementToDel}
      />
    </div>
  );
};

export default React.memo(UserAccount);
