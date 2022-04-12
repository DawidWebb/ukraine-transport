import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllNeeds, setKindOfItem } from "../../data/actions";
import { AddItem, Button, TransportItem } from "../../components";
import {
  TITLE_LG,
  INFO_LG,
  EMPTY_LG,
  SEARCH_LG,
  ADD_BTN_LG,
  SHOW_BTN_LG,
  KIND_TRANSPORT_LG,
} from "../../assets/languages/needHaveTransportLg";
import styles from "./needTransport.module.scss";

const NeedTransport = () => {
  const language = useSelector((store) => store.language);
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const needsItem = useSelector((store) => store.needsItem);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isAddVechicleModalOpen, setIsAddVechicleModalOpen] = useState(false);
  const [selectedCity, setSeteltedCity] = useState("");
  const [kindOfTransport, setSelectedTransport] = useState("all");

  const foundItems = [];
  const items = () => {
    if (!needsItem.length) {
      return;
    } else if (kindOfTransport === "all") {
      needsItem.map((item) => foundItems.push(item));
    } else if (kindOfTransport === "heavy") {
      needsItem.map((item) => {
        if (item.kindOfTransport === kindOfTransport) {
          foundItems.push(item);
        }
      });
    } else if (kindOfTransport === "pepole") {
      needsItem.map((item) => {
        if (item.kindOfTransport === kindOfTransport) {
          foundItems.push(item);
        }
      });
    }
    return foundItems;
  };
  items();

  useEffect(() => {
    dispatch(getAllNeeds());
  }, [dispatch]);

  const handleChangeCity = (e) => {
    e.preventDefault();
    setSeteltedCity(e.target.value);
  };

  const handleChangeTransport = (e) => {
    e.preventDefault();
    setSelectedTransport(e.target.value);
  };

  const transportItemsSearchByCityViev = !foundItems.length
    ? language[0] === "PL"
      ? EMPTY_LG.pl
      : EMPTY_LG.ua
    : foundItems.map((item) => {
        if (selectedCity === "") {
          return (
            <TransportItem
              key={item._id}
              item={item}
              buttons={false}
              kindOfItem="need"
            />
          );
        } else if (
          item.loadCity.toUpperCase().includes(selectedCity.toUpperCase()) ||
          item.delCity.toUpperCase().includes(selectedCity.toUpperCase())
        ) {
          return <TransportItem key={item._id} item={item} kindOfItem="need" />;
        }
      });

  const handleAddVechicle = () => {
    setIsAddVechicleModalOpen(true);
  };

  const handleShowMyVechicle = (e) => {
    dispatch(setKindOfItem(e.target.id));
    navigate("/my-items");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.info}>
          <h2>{language[0] === "PL" ? TITLE_LG[1].pl : TITLE_LG[1].ua}</h2>
          <p
            style={{
              display: `${!cookie && !localStorage ? "block" : "none"}`,
            }}
          >
            {language[0] === "PL" ? INFO_LG[1].pl : INFO_LG[1].ua}
          </p>
          <form>
            <input
              type="text"
              placeholder={language[0] === "PL" ? SEARCH_LG.pl : SEARCH_LG.ua}
              onChange={handleChangeCity}
            />
          </form>
          <form>
            <select
              name="transportKind"
              id="transportKind"
              onChange={handleChangeTransport}
            >
              <option value="all">
                {" "}
                {language[0] === "PL"
                  ? KIND_TRANSPORT_LG[2].pl
                  : KIND_TRANSPORT_LG[2].ua}
              </option>
              <option value="heavy">
                {" "}
                {language[0] === "PL"
                  ? KIND_TRANSPORT_LG[0].pl
                  : KIND_TRANSPORT_LG[0].ua}
              </option>
              <option value="pepole">
                {" "}
                {language[0] === "PL"
                  ? KIND_TRANSPORT_LG[1].pl
                  : KIND_TRANSPORT_LG[1].ua}
              </option>
            </select>
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
            name={language[0] === "PL" ? ADD_BTN_LG[1].pl : ADD_BTN_LG[1].ua}
            onClick={handleAddVechicle}
          />
          <Button
            type="button"
            name={language[0] === "PL" ? SHOW_BTN_LG[1].pl : SHOW_BTN_LG[1].ua}
            onClick={handleShowMyVechicle}
            id="vechicles"
          />
        </div>
        <div className={styles.itemsViev}>{transportItemsSearchByCityViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
        kindOfItem="need"
      />
    </div>
  );
};

export default React.memo(NeedTransport);
