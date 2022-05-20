import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, DeleteConfirmation, EditItem } from "../../components";
import {
  HEAVY_TRANSPORT_LG,
  PEOPLE_TRANSPORT_LG,
  BUTTONS_TRANSPORT_LG,
} from "../../assets/languages";
import styles from "./transportItem.module.scss";

const TransportItem = ({ item, buttons, kindOfItem }) => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const cookie = useSelector((store) => store.cookie[0].isCookie);

  const [isSelectedViev, setIsSelectedViev] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [elementToDel, setElementToDel] = useState(false);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);

  const handleOpenSelectedViev = () => {
    setIsSelectedViev(!isSelectedViev);
  };

  const handleOnOpenEditModule = () => {
    setIsEditModalOpen(true);
  };

  const handleOnDeleteItem = (e) => {
    const elementToDel = {
      idElementToDel: e.target.id,
      kindOfItem: kindOfItem,
    };
    setElementToDel(elementToDel);
    setIsDeleteConfirmationModalOpen(true);
  };

  const titleHave =
    item.kindOfTransport === "heavy"
      ? sessionStorege === "PL"
        ? HEAVY_TRANSPORT_LG[0].pl
        : HEAVY_TRANSPORT_LG[0].ua
      : sessionStorege === "PL"
      ? PEOPLE_TRANSPORT_LG[0].pl
      : PEOPLE_TRANSPORT_LG[0].ua;

  const titleNeed =
    item.kindOfTransport === "heavy"
      ? sessionStorege === "PL"
        ? HEAVY_TRANSPORT_LG[6].pl
        : HEAVY_TRANSPORT_LG[6].ua
      : sessionStorege === "PL"
      ? PEOPLE_TRANSPORT_LG[3].pl
      : PEOPLE_TRANSPORT_LG[3].ua;

  const selectedTitle = kindOfItem === "have" ? titleHave : titleNeed;

  const routes =
    sessionStorege === "PL"
      ? HEAVY_TRANSPORT_LG[1].pl
      : HEAVY_TRANSPORT_LG[1].ua;

  const dates =
    sessionStorege === "PL"
      ? HEAVY_TRANSPORT_LG[2].pl
      : HEAVY_TRANSPORT_LG[2].ua;

  const weight =
    item.kindOfTransport === "heavy"
      ? sessionStorege === "PL"
        ? HEAVY_TRANSPORT_LG[3].pl
        : HEAVY_TRANSPORT_LG[3].ua
      : "";

  const packages =
    item.kindOfTransport === "heavy"
      ? sessionStorege === "PL"
        ? HEAVY_TRANSPORT_LG[4].pl
        : HEAVY_TRANSPORT_LG[4].ua
      : "";

  const quanity =
    item.kindOfTransport === "heavy"
      ? sessionStorege === "PL"
        ? HEAVY_TRANSPORT_LG[5].pl
        : HEAVY_TRANSPORT_LG[5].ua
      : sessionStorege === "PL"
      ? PEOPLE_TRANSPORT_LG[1].pl
      : PEOPLE_TRANSPORT_LG[1].ua;

  const offerContact =
    !localStorage && !cookie
      ? ""
      : sessionStorege === "PL"
      ? `${PEOPLE_TRANSPORT_LG[2].pl}: ${item.contact}`
      : `${PEOPLE_TRANSPORT_LG[2].ua}: ${item.contact}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.onClickViev} onClick={handleOpenSelectedViev}>
          <h3>
            {selectedTitle}: {item.kindOfTruck}
          </h3>
          <div className={styles.routes}>
            <p>{routes}:</p>
            <p>
              {item.loadCity} - {item.delCity}
            </p>
          </div>
          <div className={styles.dates}>
            <p>{dates}:</p>
            <p>
              {new Date(item.startDate).toLocaleDateString()} -{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div
          className={styles.selectedViev}
          style={{ display: `${isSelectedViev ? "flex" : "none"}` }}
          onClick={handleOpenSelectedViev}
        >
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
          <div className={styles.describe}>
            <p>{item.describe}</p>
            <p>{offerContact}</p>
          </div>
        </div>
        {!buttons ? (
          ""
        ) : (
          <div className={styles.buttons}>
            <Button
              onClick={handleOnDeleteItem}
              id={item._id}
              name={
                sessionStorege === "PL"
                  ? BUTTONS_TRANSPORT_LG[0].pl
                  : BUTTONS_TRANSPORT_LG[0].ua
              }
            />
            <Button
              onClick={handleOnOpenEditModule}
              name={
                sessionStorege === "PL"
                  ? BUTTONS_TRANSPORT_LG[1].pl
                  : BUTTONS_TRANSPORT_LG[1].ua
              }
            />
          </div>
        )}
      </div>
      <EditItem
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        item={item}
        id={item._id}
        kindOfItem={kindOfItem}
      />
      <DeleteConfirmation
        isDeleteConfirmationModalOpen={isDeleteConfirmationModalOpen}
        setIsDeleteConfirmationModalOpen={setIsDeleteConfirmationModalOpen}
        elementToDel={elementToDel}
      />
    </div>
  );
};

export default React.memo(TransportItem);
