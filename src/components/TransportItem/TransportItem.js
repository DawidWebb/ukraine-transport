import React from "react";
import { useSelector } from "react-redux";
import {
  HEAVY_TRANSPORT_LG,
  PEOPLE_TRANSPORT_LG,
} from "../../assets/languages";
import styles from "./transportItem.module.scss";

const TransportItem = ({ item }) => {
  const language = useSelector((store) => store.language);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const cookie = useSelector((store) => store.cookie[0].isCookie);

  const title =
    item.kindOfTransport === "heavy"
      ? language[0] === "PL"
        ? HEAVY_TRANSPORT_LG[0].pl
        : HEAVY_TRANSPORT_LG[0].ua
      : language[0] === "PL"
      ? PEOPLE_TRANSPORT_LG[0].pl
      : PEOPLE_TRANSPORT_LG[0].ua;

  const routes =
    language[0] === "PL" ? HEAVY_TRANSPORT_LG[1].pl : HEAVY_TRANSPORT_LG[1].ua;

  const dates =
    language[0] === "PL" ? HEAVY_TRANSPORT_LG[2].pl : HEAVY_TRANSPORT_LG[2].ua;

  const weight =
    item.kindOfTransport === "heavy"
      ? language[0] === "PL"
        ? HEAVY_TRANSPORT_LG[3].pl
        : HEAVY_TRANSPORT_LG[3].ua
      : "";

  const packages =
    item.kindOfTransport === "heavy"
      ? language[0] === "PL"
        ? HEAVY_TRANSPORT_LG[4].pl
        : HEAVY_TRANSPORT_LG[4].ua
      : "";

  const quanity =
    item.kindOfTransport === "heavy"
      ? language[0] === "PL"
        ? HEAVY_TRANSPORT_LG[5].pl
        : HEAVY_TRANSPORT_LG[5].ua
      : language[0] === "PL"
      ? PEOPLE_TRANSPORT_LG[1].pl
      : PEOPLE_TRANSPORT_LG[1].ua;

  const offerContact =
    !localStorage && !cookie
      ? ""
      : language[0] === "PL"
      ? `${PEOPLE_TRANSPORT_LG[2].pl}: ${item.contact}`
      : `${PEOPLE_TRANSPORT_LG[2].ua}: ${item.contact}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h3>
          {title}: {item.kindOfTruck}
        </h3>
        <div className={styles.routes}>
          <p>{routes}:</p>
          <p>
            {item.loadCity} - {item.delCity}
          </p>
        </div>
        <div className={styles.dates}>
          {dates}:
          <p>
            {new Date(item.startDate).toLocaleDateString()} -{" "}
            {new Date(item.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className={styles.additional}>
          <p>
            {weight} <span>{item.weight}</span>
          </p>
          <p>
            {packages} <span>{item.package}</span>
          </p>
          <p>
            {quanity}: <span>{item.quanity}</span>
          </p>
        </div>
        <div className={styles.descrive}>
          <p>{item.describe}</p>
          <p>{offerContact}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TransportItem);
