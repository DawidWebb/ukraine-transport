import React, { useState, useEffect } from "react";
import styles from "./topArrow.module.scss";

const TopArrow = () => {
  const [windowScroll, setWindowScroll] = useState(false);

  const handdleGoToTopSite = () => {
    window.scroll(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setWindowScroll(true);
      } else {
        setWindowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setWindowScroll]);

  return (
    <div
      className={styles.wrapper}
      style={{ display: `${!windowScroll ? "none" : "block"}` }}
      onClick={handdleGoToTopSite}
    >
      <div className={styles.info}>Top</div>
      <div className={styles.arrow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(TopArrow);
