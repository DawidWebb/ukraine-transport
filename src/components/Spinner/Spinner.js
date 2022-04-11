import React from "react";
import { useSelector } from "react-redux";
import styles from "./spinner.module.scss";

const Spinner = () => {
  const spinner = useSelector((store) => store.spinner);

  // const spinner = true;

  const spinnerViev = spinner ? (
    <div className={styles.wrapper}>
      <div className={styles.ldioSpinner}>
        <div className={styles.ldio4afailmojnt}>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
  return <>{spinnerViev}</>;
};
export default React.memo(Spinner);
