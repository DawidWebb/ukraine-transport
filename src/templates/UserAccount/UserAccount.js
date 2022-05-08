import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransports, getAllNeeds } from "../../data/actions";
import {
  Button,
  ChangePassword,
  DeleteConfirmation,
  TransportItem,
} from "../../components";
import {
  USER_ACCOUNT_BUTTONS_LG,
  USER_ACCOUNT_TITLE_LG,
  USER_ACCOUNT_ACTIVITY_LG,
} from "../../assets/languages";
import styles from "./userAccount.module.scss";

const UserAccount = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const transportItem = useSelector((store) => store.transportItem);
  const needsItem = useSelector((store) => store.needsItem);

  const dispatch = useDispatch();

  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [isDelConfirmModalOpen, setIsDelConfirmModalOpen] = useState(false);
  const [elementToDel, setElementToDel] = useState(false);
  const [isShowActivity, setIsShowActivity] = useState(false);

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
      dispatch(getAllTransports());
      dispatch(getAllNeeds());
      setIsShowActivity(true);
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

  const myActivitiesHave = !transportItem.length ? (
    <p>
      {sessionStorege === "PL"
        ? USER_ACCOUNT_ACTIVITY_LG[0].pl
        : USER_ACCOUNT_ACTIVITY_LG[0].ua}
    </p>
  ) : (
    transportItem.map((item) => (
      <TransportItem
        key={item._id}
        item={item}
        kindOfItem="have"
        buttons={true}
      />
    ))
  );
  const myActivitiesNeed = !needsItem.length ? (
    <p>
      {sessionStorege === "PL"
        ? USER_ACCOUNT_ACTIVITY_LG[0].pl
        : USER_ACCOUNT_ACTIVITY_LG[0].ua}
    </p>
  ) : (
    needsItem.map((item) => (
      <TransportItem
        key={item._id}
        item={item}
        kindOfItem="need"
        buttons={true}
      />
    ))
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h2>
          {sessionStorege === "PL"
            ? USER_ACCOUNT_TITLE_LG.pl
            : USER_ACCOUNT_TITLE_LG.ua}
        </h2>
        <div className={styles.buttons}>{buttonsViev}</div>
        {isShowActivity ? (
          <div className={styles.activity}>
            <div className={styles.items}>{myActivitiesHave}</div>
            <div className={styles.items}>{myActivitiesNeed}</div>
          </div>
        ) : (
          ""
        )}
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
