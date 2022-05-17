import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FOOTER_LINKS_LG, FOOTER_INFO_LG } from "../../assets/languages";
import styles from "./footer.module.scss";

const Footer = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.links}>
          <a href="/assets/regulaminPL.pdf" target="blank">
            {sessionStorege === "PL"
              ? FOOTER_LINKS_LG[0].pl
              : FOOTER_LINKS_LG[0].ua}
          </a>
          <Link to={FOOTER_LINKS_LG[1].link}>
            {sessionStorege === "PL"
              ? FOOTER_LINKS_LG[1].pl
              : FOOTER_LINKS_LG[1].ua}
          </Link>
          <Link to={FOOTER_LINKS_LG[2].link}>
            {sessionStorege === "PL"
              ? FOOTER_LINKS_LG[2].pl
              : FOOTER_LINKS_LG[2].ua}
          </Link>
        </div>
        <div className={styles.info}>
          <h3>TransForUkraine</h3>
          <p>
            {sessionStorege === "PL" ? FOOTER_INFO_LG.pl : FOOTER_INFO_LG.ua}
          </p>
        </div>
        <div className={styles.copy}>
          <p>
            &copy;{" "}
            <a href="https://www.tomaszmatras.pl/" target="blank">
              developerweb.pl
            </a>{" "}
            2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
