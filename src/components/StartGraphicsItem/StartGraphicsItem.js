import React from "react";
import { START_GRAPH_ITEMS } from "../../assets/languages/startLg";
import styles from "./startGraphics.module.scss";

const StartGraphicsItem = () => {
  const graphsViev = START_GRAPH_ITEMS.map((item) => (
    <div key={item.id}>{item.svg}</div>
  ));

  return <div className={styles.wrapper}>{graphsViev}</div>;
};

export default React.memo(StartGraphicsItem);
