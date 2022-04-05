import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransports } from "../../data/actions";
import { AddItem, Button, TransportItem } from "../../components";
import {
  TITLE_LG,
  INFO_LG,
  SEARCH_LG,
  ADD_BTN_LG,
  SHOW_BTN_LG,
} from "../../assets/languages/haveTransportLg";
import styles from "./haveTransport.module.scss";

const HaveTransport = () => {
  const language = useSelector((store) => store.language);
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const transportItem = useSelector((store) => store.transportItem);

  const transportItemsViev = !transportItem
    ? ""
    : transportItem.map((item) => <TransportItem key={item._id} item={item} />);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransports());
  }, [dispatch]);

  const [isAddVechicleModalOpen, setIsAddVechicleModalOpen] = useState(false);

  const handleAddVechicle = () => {
    setIsAddVechicleModalOpen(true);
  };

  const handleShowMyVechicle = () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.info}>
          <h2>{language[0] === "PL" ? TITLE_LG.pl : TITLE_LG.ua}</h2>
          <p
            style={{
              display: `${!cookie && !localStorage ? "block" : "none"}`,
            }}
          >
            {language[0] === "PL" ? INFO_LG.pl : INFO_LG.ua}
          </p>
          <form>
            <input
              type="text"
              placeholder={language[0] === "PL" ? SEARCH_LG.pl : SEARCH_LG.ua}
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
            name={language[0] === "PL" ? ADD_BTN_LG.pl : ADD_BTN_LG.ua}
            onClick={handleAddVechicle}
          />
          <Button
            type="button"
            name={language[0] === "PL" ? SHOW_BTN_LG.pl : SHOW_BTN_LG.ua}
            onClick={handleShowMyVechicle}
          />
        </div>
        <div className={styles.itemsViev}>{transportItemsViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
      />
    </div>
  );
};

export default React.memo(HaveTransport);
