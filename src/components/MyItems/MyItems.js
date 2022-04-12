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
  const needsItem = useSelector((store) => store.needsItem);

  const navigate = useNavigate();

  const [isAddVechicleModalOpen, setIsAddVechicleModalOpen] = useState(false);

  const handleAddVechicle = () => {
    setIsAddVechicleModalOpen(true);
  };
  const handleShowAllVechicle = () => {
    if (kindOfItem === "have") {
      navigate("/have-transport");
    } else if (kindOfItem === "needs") {
      navigate("/need-transport");
    }
  };

  const transportViev = transportItem.map((item) => {
    if (item.userId === localStorage.id) {
      return (
        <TransportItem
          key={item._id}
          item={item}
          kindOfItem={kindOfItem}
          buttons={true}
        />
      );
    }
  });

  const needsViev = needsItem.map((item) => {
    if (item.userId === localStorage.id) {
      return (
        <TransportItem
          key={item._id}
          item={item}
          kindOfItem={kindOfItem}
          buttons={true}
        />
      );
    }
  });

  const selectedViev = kindOfItem === "have" ? transportViev : needsViev;

  const title =
    kindOfItem === "have"
      ? language[0] === "PL"
        ? VECHICLE_ITEMS_LG[0].pl
        : VECHICLE_ITEMS_LG[0].ua
      : language[0] === "PL"
      ? NEEDS_ITEMS_LG[0].pl
      : NEEDS_ITEMS_LG[0].ua;

  const operationButtons =
    kindOfItem === "have" ? (
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
      <>
        <Button
          type="button"
          name={
            language[0] === "PL" ? NEEDS_ITEMS_LG[2].pl : NEEDS_ITEMS_LG[2].ua
          }
          onClick={handleAddVechicle}
        />
        <Button
          type="button"
          name={
            language[0] === "PL" ? NEEDS_ITEMS_LG[3].pl : NEEDS_ITEMS_LG[3].ua
          }
          onClick={handleShowAllVechicle}
        />
      </>
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h2>{title}</h2>
        <div className={styles.operation}>{operationButtons}</div>
        <div className={styles.itemsViev}>{selectedViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
        kindOfItem={kindOfItem}
      />
    </div>
  );
};
export default React.memo(MyItems);
