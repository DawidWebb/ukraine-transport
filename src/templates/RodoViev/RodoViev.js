import React from "react";
import { useSelector } from "react-redux";
import { RODO_AND_COOKIE_LG } from "../../assets/languages";
import styles from "./rodoViev.module.scss";

const RodoViev = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <h1> {sessionStorege === "PL" ? "Polityka RODO" : "Політика GDPR"}</h1>
        <h3>
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[0].titlePl
            : RODO_AND_COOKIE_LG[0].titleUa}
        </h3>
        <p>
          {" "}
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[0].pl
            : RODO_AND_COOKIE_LG[0].ua}
        </p>
        <a href="mailto:tomasz.matras@developerweb.pl">
          tomasz.matras@developerweb.pl
        </a>
        <p>
          {" "}
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[1].pl
            : RODO_AND_COOKIE_LG[1].ua}
        </p>
        <h3>
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[2].titlePl
            : RODO_AND_COOKIE_LG[2].titleUa}
        </h3>
        <p>
          {" "}
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[2].pl
            : RODO_AND_COOKIE_LG[2].ua}
        </p>
        <h3>
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[3].titlePl
            : RODO_AND_COOKIE_LG[3].titleUa}
        </h3>
        <p>
          {" "}
          {sessionStorege === "PL"
            ? RODO_AND_COOKIE_LG[3].pl
            : RODO_AND_COOKIE_LG[3].ua}
        </p>
      </div>
    </div>
  );
};

export default React.memo(RodoViev);
