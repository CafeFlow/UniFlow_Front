import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs"; // react-icons 라이브러리를 사용
import styles from "../Rating/Rating.module.css";

const Rating = ({ rating, setRating }) => {
  return (
    <div className={styles.container}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            style={{ backgroundColor: "white", border: "none" }}
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => setRating(index)}
          >
            <BsStarFill
              color={index <= rating ? "#ffc107" : "#e4e5e9"}
              size={24}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
