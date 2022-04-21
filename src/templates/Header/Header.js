import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../components";
import { cookieCheck, itemCheck, setLang } from "../../data/actions";
import styles from "./header.module.scss";

const Header = () => {
  const language = useSelector((store) => store.language);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cookieCheck());
    dispatch(itemCheck());
  }, [dispatch]);

  const handleOnChangeLanguage = () => {
    if (language[0] === "PL") {
      dispatch(setLang(["UA"]));
    } else {
      dispatch(setLang(["PL"]));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.logoName}>
          <p>#TransForUkraine</p>
        </div>

        <div className={styles.menu}>
          <Menu />
        </div>
        <div
          className={styles.language}
          onClick={handleOnChangeLanguage}
          style={{
            backgroundImage: `${
              language[0] === "PL"
                ? "url(../images/ua.jpg)"
                : "url(../images/pl.jpg)"
            }`,
          }}
        ></div>
        <div className={styles.userInfo}>
          {!localStorage ? (
            ""
          ) : (
            <p>
              {localStorage.name}{" "}
              {language[0] === "PL" ? "zalogowany" : "Зареєстровано"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
