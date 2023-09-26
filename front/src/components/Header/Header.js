import React from "react";
import cafeflowLogo from "../icons/CafeFlow.png";
import search from "../icons/search.png";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isTestButtonClicked }) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className={isTestButtonClicked ? styles.container2 : styles.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className={styles.button1} onClick={goHome}></button>
        {isTestButtonClicked && <p className={styles.cafeflowText}>CafeFlow</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isTestButtonClicked ? (
          <>
            <button className={styles.search}></button>
          </>
        ) : (
          <button className={styles.button2}></button>
        )}
      </div>
    </div>
  );
};

export default Header;
