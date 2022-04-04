import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components";
import {
  HAVE_TITLE_LG,
  HAVE_INFO_LG,
  HAVE_SEARCH_LG,
  HAVE_ADD_BTN_LG,
  HAVE_SHOW_BTN_LG,
} from "../../assets/languages/haveTransportLg";
import styles from "./haveTransport.module.scss";

const HaveTransport = () => {
  const language = useSelector((store) => store.language);
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );

  const handleAddVechicle = () => {};

  const handleShowMyVechicle = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.info}>
          <h2>{language[0] === "PL" ? HAVE_TITLE_LG.pl : HAVE_TITLE_LG.ua}</h2>
          <p
            style={{
              display: `${!cookie && !localStorage ? "block" : "none"}`,
            }}
          >
            {language[0] === "PL" ? HAVE_INFO_LG.pl : HAVE_INFO_LG.ua}
          </p>
          <form>
            <input
              type="text"
              placeholder={
                language[0] === "PL" ? HAVE_SEARCH_LG.pl : HAVE_SEARCH_LG.ua
              }
            />
          </form>
        </div>
        <div
          className={styles.operation}
          style={{
            display: `${!cookie && !localStorage ? "none" : "flex"}`,
          }}
        >
          <Button
            type="button"
            name={
              language[0] === "PL" ? HAVE_ADD_BTN_LG.pl : HAVE_ADD_BTN_LG.ua
            }
            onClick={handleAddVechicle}
          />
          <Button
            type="button"
            name={
              language[0] === "PL" ? HAVE_SHOW_BTN_LG.pl : HAVE_SHOW_BTN_LG.ua
            }
            onClick={handleShowMyVechicle}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HaveTransport);
