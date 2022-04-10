import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransports, setKindOfItem } from "../../data/actions";
import { AddItem, Button, TransportItem } from "../../components";
import {
  TITLE_LG,
  INFO_LG,
  EMPTY_LG,
  SEARCH_LG,
  ADD_BTN_LG,
  SHOW_BTN_LG,
  KIND_TRANSPORT_LG,
} from "../../assets/languages/haveTransportLg";
import styles from "./haveTransport.module.scss";

const HaveTransport = () => {
  const language = useSelector((store) => store.language);
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const transportItem = useSelector((store) => store.transportItem);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isAddVechicleModalOpen, setIsAddVechicleModalOpen] = useState(false);
  const [selectedCity, setSeteltedCity] = useState("");
  const [kindOfTransport, setSelectedTransport] = useState("all");

  const foundItems = [];
  const items = () => {
    if (!transportItem.length) {
      return;
    } else if (kindOfTransport === "all") {
      transportItem.map((item) => foundItems.push(item));
    } else if (kindOfTransport === "heavy") {
      transportItem.map((item) => {
        if (item.kindOfTransport === kindOfTransport) {
          foundItems.push(item);
        }
      });
    } else if (kindOfTransport === "pepole") {
      transportItem.map((item) => {
        if (item.kindOfTransport === kindOfTransport) {
          foundItems.push(item);
        }
      });
    }
    return foundItems;
  };
  items();

  useEffect(() => {
    dispatch(getAllTransports());
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
          return <TransportItem key={item._id} item={item} buttons={false}/>;
        } else if (
          item.loadCity.toUpperCase().includes(selectedCity.toUpperCase()) ||
          item.delCity.toUpperCase().includes(selectedCity.toUpperCase())
        ) {
          return <TransportItem key={item._id} item={item} />;
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
            name={language[0] === "PL" ? ADD_BTN_LG.pl : ADD_BTN_LG.ua}
            onClick={handleAddVechicle}
          />
          <Button
            type="button"
            name={language[0] === "PL" ? SHOW_BTN_LG.pl : SHOW_BTN_LG.ua}
            onClick={handleShowMyVechicle}
            id="vechicles"
          />
        </div>
        <div className={styles.itemsViev}>{transportItemsSearchByCityViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
      />
    </div>
  );
};

export default React.memo(HaveTransport);
