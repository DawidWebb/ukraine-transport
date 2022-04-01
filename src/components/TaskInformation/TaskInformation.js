import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../components";

import styles from "./taskInformation.module.scss";

const TaskInformation = () => {
  const task = useSelector((store) => store.task[0]);

  return (
    <Modal isModalOpen={task.isModalOpen}>
      <div className={styles.wrapper}>
        <div className={styles.inside}>
          <p>{task.task}</p>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(TaskInformation);
