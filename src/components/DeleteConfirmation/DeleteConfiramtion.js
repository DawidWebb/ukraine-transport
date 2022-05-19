import React from "react";
import { Button, Modal } from "..";
import { useDispatch, useSelector } from "react-redux";
import { delTransport, delNeeds, deleteUser } from "../../data/actions";
import {
  GENERAL_DELETE_CONFORMATION_LG,
  GENERAL_BTN_EXIT,
  GENERAL_BTN_DEL,
} from "../../assets/languages";
import styles from "./deleteConfirmation.module.scss";

const DeleteConfirmation = ({
  isDeleteConfirmationModalOpen,
  setIsDeleteConfirmationModalOpen,
  elementToDel,
}) => {
  const sessionStorege = useSelector((store) => store.sessionStorege);

  const mainInfo =
    sessionStorege === "PL"
      ? GENERAL_DELETE_CONFORMATION_LG.pl
      : GENERAL_DELETE_CONFORMATION_LG.ua;

  const closeBtnName =
    sessionStorege === "PL" ? GENERAL_BTN_EXIT.pl : GENERAL_BTN_EXIT.ua;

  const delBtnName =
    sessionStorege === "PL" ? GENERAL_BTN_DEL.pl : GENERAL_BTN_DEL.ua;

  const dispatch = useDispatch();

  const handleCloseDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(false);
  };

  const handleDeleteSelectedElement = () => {
    if (elementToDel.kindOfItem === "have") {
      dispatch(delTransport(elementToDel.idElementToDel));
    } else if (elementToDel.kindOfItem === "need") {
      dispatch(delNeeds(elementToDel.idElementToDel));
    } else if (elementToDel.kindOfItem === "user") {
      const userData = {
        id: elementToDel.idElementToDel,
        language: sessionStorege,
      };
      dispatch(deleteUser(userData));
    }

    setIsDeleteConfirmationModalOpen(false);
  };

  return (
    <Modal isModalOpen={isDeleteConfirmationModalOpen}>
      <div className={styles.wrapper}>
        <div className={styles.information}>
          <p>{mainInfo}</p>
        </div>
        <div className={styles.buttons}>
          <Button
            name={closeBtnName}
            type="button"
            onClick={handleCloseDeleteConfirmationModal}
          />
          <Button
            name={delBtnName}
            type="button"
            onClick={handleDeleteSelectedElement}
          />
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(DeleteConfirmation);
