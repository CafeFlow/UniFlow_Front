import React from "react";
import { useState, useEffect } from "react";
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

  // console.log(process.env.REACT_APP_KAKAO_KEY);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("연세대"); // Default to 세종대

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectUniversity = (university) => {
    setSelectedUniversity(university);
    setIsDropdownOpen(false);

    const coordinates =
      university === "세종대" ? [37.550433, 127.074055] : [37.564572, 126.9386];
    handleUnivButtonClick(...coordinates, university);
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
        <img src={uniflow} className={styles.uniflow}></img>
      </div>
      <div className={styles.dropdownContainer}>
        <button className={styles.dropdownItem} onClick={toggleDropdown}>
          <p>{selectedUniversity}</p>
        </button>

        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {selectedUniversity !== "세종대" && (
              <button
                className={styles.dropdownItem}
                onClick={() => selectUniversity("세종대")}
              >
                <p className={styles.font}>세종대</p>
              </button>
            )}
            {selectedUniversity !== "연세대" && (
              <button
                className={styles.dropdownItem}
                onClick={() => selectUniversity("연세대")}
              >
                <p className={styles.font}>연세대</p>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
