import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../assets/languages";
import styles from "./haveTransport.module.scss";

const HaveTransport = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
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
        return foundItems;
      });
    } else if (kindOfTransport === "pepole") {
      transportItem.map((item) => {
        if (item.kindOfTransport === kindOfTransport) {
          foundItems.push(item);
        }
        return foundItems;
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

  const transportItemsSearchByCityViev = !foundItems.length ? (
    <h3>{sessionStorege === "PL" ? EMPTY_LG.pl : EMPTY_LG.ua}</h3>
  ) : (
    foundItems.reverse().map((item) => {
      if (selectedCity === "") {
        return (
          <TransportItem
            key={item._id}
            item={item}
            buttons={false}
            kindOfItem="have"
          />
        );
      } else if (
        item.loadCity.toUpperCase().includes(selectedCity.toUpperCase()) ||
        item.delCity.toUpperCase().includes(selectedCity.toUpperCase())
      ) {
        return <TransportItem key={item._id} item={item} kindOfItem="have" />;
      }
    })
  );

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
        <div className={styles.transportMenu}>
          <div className={styles.info}>
            <h3>{sessionStorege === "PL" ? TITLE_LG[0].pl : TITLE_LG[0].ua}</h3>
            <p
              style={{
                display: `${!cookie && !localStorage ? "block" : "none"}`,
              }}
            >
              {sessionStorege === "PL" ? INFO_LG[0].pl : INFO_LG[0].ua}
            </p>
          </div>
          <div className={styles.forms}>
            <form>
              <input
                type="text"
                placeholder={
                  sessionStorege === "PL" ? SEARCH_LG.pl : SEARCH_LG.ua
                }
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
                  {sessionStorege === "PL"
                    ? KIND_TRANSPORT_LG[2].pl
                    : KIND_TRANSPORT_LG[2].ua}
                </option>
                <option value="heavy">
                  {" "}
                  {sessionStorege === "PL"
                    ? KIND_TRANSPORT_LG[0].pl
                    : KIND_TRANSPORT_LG[0].ua}
                </option>
                <option value="pepole">
                  {" "}
                  {sessionStorege === "PL"
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
              name={
                sessionStorege === "PL" ? ADD_BTN_LG[0].pl : ADD_BTN_LG[0].ua
              }
              onClick={handleAddVechicle}
            />
            <Button
              type="button"
              name={
                sessionStorege === "PL" ? SHOW_BTN_LG[0].pl : SHOW_BTN_LG[0].ua
              }
              onClick={handleShowMyVechicle}
              id="have"
            />
          </div>
        </div>
        <div className={styles.itemsViev}>{transportItemsSearchByCityViev}</div>
      </div>
      <AddItem
        isAddVechicleModalOpen={isAddVechicleModalOpen}
        setIsAddVechicleModalOpen={setIsAddVechicleModalOpen}
        kindOfItem="have"
      />
    </div>
  );
};

export default React.memo(HaveTransport);
