import React from "react";

import styles from "../Review/Review.module.css";
const Review = () => {
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.leftAd}>광고</div>
        <div className={styles.center}>
          <div className={styles.review}>
            <h2>카페명</h2>
            <p>평점</p>
          </div>
          <div></div>
        </div>
        <div className={styles.rightAd}>광고</div>
      </div>
      <div className={styles.mobileunderAd}>밑 광고</div>
    </div>
  );
};

export default Review;
