import React from "react";
import styles from "./Header.module.css";
import styles1 from "../Home/Home.module.css";
import uniflow from "../icons/Uniflow.png";

const Header = ({
  isTestButtonClicked,
  location,
  selectedButton,
  handleUnivButtonClick,
}) => {
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
        isTestButtonClicked ? styles.container : styles.container
      } ${styles.hideOnDesktop}`}
    >
      <div style={{ display: "flex", alignItems: "center", marginLeft: "4%" }}>
        <button className={styles.button1} onClick={goHome}></button>
        {/* <p className={styles.cafeflowText}>Uni.flow</p> */}
        <img src={uniflow} className={styles.uniflow}></img>
      </div>
      <button
        style={{
          marginRight: "10px",
          borderRadius: "32px",
          borderColor: selectedButton === "세종대" ? "#6156E2" : "#D7CCCB",
        }}
        className={styles1.univButton}
        onClick={() => handleUnivButtonClick(37.550433, 127.074055, "세종대")}
      >
        <p className={styles1.school}>세종대</p>
      </button>
      {/* <button
        style={{
          borderRadius: "32px",
          borderColor: selectedButton === "건국대" ? "#6156E2" : "#D7CCCB",
        }}
        className={styles1.univButton}
        onClick={() => handleUnivButtonClick(37.54313, 127.077501, "건국대")}
      >
        <p className={styles1.school}>건국대</p>
      </button> */}
    </div>
  );
};

export default Header;
