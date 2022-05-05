import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, ChangePassword } from "../../components";
import {
  USER_ACCOUNT_BUTTONS_LG,
  USER_ACCOUNT_TITLE_LG,
} from "../../assets/languages";
import styles from "./userAccount.module.scss";

const UserAccount = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

  const handleClickButtonById = (e) => {
    if (e.target.id === "user-button-change") {
      setIsChangePassModalOpen(true);
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
    </div>
  );
};

export default React.memo(UserAccount);
