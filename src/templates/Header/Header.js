import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../components";
import {
  cookieCheck,
  itemCheck,
  sessionItemSet,
  sessionItemCheck,
} from "../../data/actions";
import styles from "./header.module.scss";

const Header = () => {
  const sessionStorege = useSelector((store) => store.sessionStorege);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToStart = () => {
    window.scroll(0, 0);
    navigate("/");
  };

  useEffect(() => {
    dispatch(cookieCheck());
    dispatch(itemCheck());
    dispatch(sessionItemCheck());
  }, [dispatch]);

  const handleOnChangeLanguage = () => {
    if (sessionStorege === "PL") {
      const language = "UA";
      dispatch(sessionItemSet(language));
    } else {
      const language = "PL";
      dispatch(sessionItemSet(language));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.logoName} onClick={handleGoToStart}></div>

        <div className={styles.menu}>
          <Menu />
        </div>
        <div
          className={styles.language}
          onClick={handleOnChangeLanguage}
          style={{
            backgroundImage: `${
              sessionStorege === "PL" || !sessionStorege
                ? "url(../images/ua.jpg)"
                : "url(../images/pl.jpg)"
            }`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Header;
