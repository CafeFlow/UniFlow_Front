import React from "react";
import cafeflowLogo from "../icons/CafeFlow.png";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      {/* <button className={styles.emptybutton}></button> */}
      <button className={styles.button1} onClick={goHome}></button>
      <button className={styles.button2}></button>
      {/* <h1 className={styles.name} onClick={goHome}>
        Cafe Flow
      </h1> */}
    </div>
  );
};

export default Header;
