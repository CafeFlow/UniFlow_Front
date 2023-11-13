import React from "react";
import styles from "./Header.module.css";

const Header = ({ isTestButtonClicked, location, isModalVisible }) => {
  const goHome = () => {
    window.location.replace("/");
  };

  // console.log(location); // location 객체가 정상적으로 로그에 출력되는지 확인

  // location이 "/"(인트로)일 경우 header가 보이지 않게끔 함
  if (location && location.pathname === "/") {
    return null;
  }

  return (
    <div
      className={`${
        isTestButtonClicked ? styles.container2 : styles.container
      } ${styles.hideOnDesktop}`}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <button className={styles.button1} onClick={goHome}></button>
        {isTestButtonClicked && <p className={styles.cafeflowText}>CafeFlow</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isTestButtonClicked ? (
          <button className={styles.button2}></button>
        ) : (
          <button className={styles.search}></button>
        )}
      </div>
    </div>
  );
};

export default Header;
