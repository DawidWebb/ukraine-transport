import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../components";
import { setLang } from "../../data/actions";
import styles from "./header.module.scss";

const Header = () => {
  const language = useSelector((store) => store.language);
  const dispatch = useDispatch();

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
        <div className={styles.logoName}></div>
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
        <Menu />
      </div>
    </div>
  );
};

export default Header;
