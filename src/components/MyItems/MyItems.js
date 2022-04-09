import React from "react";
import { useSelector } from "react-redux";
import { VECHICLE_ITEMS_LG, NEEDS_ITEMS_LG } from "../../assets/languages";
import styles from "./myItems.module.scss";

const MyItems = () => {
  const kindOfItem = useSelector((store) => store.kindOfItem);
  const language = useSelector((store) => store.language);

  const title =
    kindOfItem === "vechicls"
      ? language[0] === "PL"
        ? VECHICLE_ITEMS_LG[0].pl
        : VECHICLE_ITEMS_LG[0].ua
      : language[0] === "PL"
      ? NEEDS_ITEMS_LG[0].pl
      : NEEDS_ITEMS_LG[0].ua;
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};
export default React.memo(MyItems);
