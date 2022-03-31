import { useState } from "react";
import { Button } from "..";
import { menu } from "../../assets/languages/menu";
import styles from "./menu.module.scss";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handeOpenCloseMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOnClickButton = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuList = menu.map((item) => (
    <div id={item.id}>
      <Button name={item.pl} id={item.id} onClick={handleOnClickButton} />
    </div>
  ));
  return (
    <div className={styles.wrapper}>
      <div className={styles.inside}>
        <div className={styles.burger} onClick={handeOpenCloseMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
          </svg>
        </div>
        <div
          className={styles.menuMobile}
          style={{ display: `${isMenuOpen ? "flex" : "none"}` }}
        >
          <ul>{menuList}</ul>
        </div>
        <div className={styles.menuDesktop}>
          <ul>{menuList}</ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
