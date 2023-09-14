import React from "react";
import cafeflowLogo from "../icons/cafeflowLogo.png";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={cafeflowLogo}></img>
      <h1 className={styles.name} onClick={goHome}>
        Cafe Flow
      </h1>
    </div>
  );
};

export default Header;
