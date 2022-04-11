import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AddItem, Button, TransportItem } from "../../components";
import {
  ADD_BTN_LG,
  VECHICLE_ITEMS_LG,
  NEEDS_ITEMS_LG,
} from "../../assets/languages";
import styles from "./myItems.module.scss";

const MyItems = () => {
  const kindOfItem = useSelector((store) => store.kindOfItem);
  const language = useSelector((store) => store.language);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const transportItem = useSelector((store) => store.transportItem);

  const navigate = useNavigate();

  const [isAddVechicleModalOpen, setIsAddVechicleModalOpen] = useState(false);

  const handleAddVechicle = () => {
    setIsAddVechicleModalOpen(true);
  };
  const handleShowAllVechicle = () => {
    navigate("/have-transport");
  };
  const myTransportItemsViev = transportItem.map((item) => {
    if (item.userId === localStorage.id) {
      return <TransportItem key={item._id} item={item} buttons={true} />;
    }
  });

  const title =
    kindOfItem === "vechicles"
      ? language[0] === "PL"
        ? VECHICLE_ITEMS_LG[0].pl
        : VECHICLE_ITEMS_LG[0].ua
      : language[0] === "PL"
      ? NEEDS_ITEMS_LG[0].pl
      : NEEDS_ITEMS_LG[0].ua;

  const operationButtons = "vehicles" ? (
    <>
      <Button
        type="button"
        name={
          language[0] === "PL"
            ? VECHICLE_ITEMS_LG[2].pl
            : VECHICLE_ITEMS_LG[2].ua
        }
        onClick={handleAddVechicle}
      />
      <Button
        type="button"
        name={
          language[0] === "PL"
            ? VECHICLE_ITEMS_LG[3].pl
            : VECHICLE_ITEMS_LG[3].ua
        }
        onClick={handleShowAllVechicle}
      />
    </>
  ) : (
    ""
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h2>{title}</h2>
        <div className={styles.operation}>{operationButtons}</div>
        <div className={styles.itemsViev}>{myTransportItemsViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
      />
    </div>
  );
};
export default React.memo(MyItems);
