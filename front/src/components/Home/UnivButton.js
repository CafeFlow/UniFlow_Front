import React from "react";
import styles from "../Home/Home.module.css";

const UnivButton = ({ name, isSelected, onClick }) => {
  return (
    <button
      style={{
        marginRight: "5px",
        borderRadius: "32px",
        borderColor: isSelected ? "#6156E2" : "#D7CCCB",
      }}
      className={styles.univButton}
      onClick={onClick}
    >
      <p className={styles.school}>{name}</p>
    </button>
  );
};

export default UnivButton;
