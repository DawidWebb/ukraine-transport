import React from "react";
import { useSelector } from "react-redux";
import { START_TITLE_LG } from "../../assets/languages";
import styles from "./startViev.module.scss";

const StartViev = () => {
  const language = useSelector((store) => store.language);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.startPic}>
          <div>
            <h2>
              {language[0] === "PL"
                ? START_TITLE_LG[0].pl
                : START_TITLE_LG[0].ua}
            </h2>
            <h3>
              {language[0] === "PL"
                ? START_TITLE_LG[1].pl
                : START_TITLE_LG[1].ua}
            </h3>
          </div>
        </div>
        <div className={styles.startInfo}></div>
      </div>
    </div>
  );
};

export default StartViev;
