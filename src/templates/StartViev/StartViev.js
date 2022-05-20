import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StartGraphicsItem } from "../../components";
import {
  START_TITLE_LG,
  START_LINKS_LG,
  START_INFO_LG,
} from "../../assets/languages";
import styles from "./startViev.module.scss";

const StartViev = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.startPic}>
          <div>
            <h2>
              {sessionStorege === "PL"
                ? START_TITLE_LG[0].pl
                : START_TITLE_LG[0].ua}
            </h2>
            <h3>
              {sessionStorege === "PL"
                ? START_TITLE_LG[1].pl
                : START_TITLE_LG[1].ua}
            </h3>
          </div>
        </div>
        <div className={styles.startInfo}>
          <h2>
            {sessionStorege === "PL"
              ? START_INFO_LG[0].pl
              : START_INFO_LG[0].ua}
          </h2>
          <div className={styles.graphics}>
            <StartGraphicsItem />
          </div>
          <h3>
            {sessionStorege === "PL"
              ? START_INFO_LG[1].pl
              : START_INFO_LG[1].ua}
          </h3>
          <h3>
            {sessionStorege === "PL"
              ? START_INFO_LG[2].pl
              : START_INFO_LG[2].ua}
          </h3>
        </div>
        <div className={styles.startLinks}>
          <Link to="/need-transport">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z" />
            </svg>
            <p>
              {sessionStorege === "PL"
                ? START_LINKS_LG[0].pl
                : START_LINKS_LG[0].ua}
            </p>
          </Link>
          <Link to="/have-transport">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
            <p>
              {sessionStorege === "PL"
                ? START_LINKS_LG[1].pl
                : START_LINKS_LG[1].ua}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartViev;
