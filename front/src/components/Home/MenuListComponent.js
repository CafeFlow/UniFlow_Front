// 메뉴, 리뷰, 사진, 정보 칸을 따로 뺀 컴포넌트

import React from "react";
import styles from "../Home/Home.module.css";
import pen from "../icons/pen.png";
import ReviewsComponent from "../ReviewsComponent/ReviewsComponent";

const MenuListComponent = ({
  activeTab,
  handleTabClick,
  averRating,
  reviewSize,
  openModal,
  calculatedHeight,
  selectedCafeId,
}) => {
  return (
    <div>
      <div className={styles.menuList}>
        {["메뉴", "리뷰", "사진", "정보"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={
              activeTab === tab
                ? `${styles.menu} ${styles.activeTab}`
                : styles.menu
            }
            style={{ backgroundColor: "white" }}
          >
            <p style={{ margin: "1vh 0 1vh 0" }}>{tab}</p>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab === "메뉴" && <div>서비스 준비 중입니다..</div>}
        {activeTab === "리뷰" && (
          <div>
            <div className={styles.flex1}>
              <div className={styles.flex}>
                <p className={styles.star} style={{ color: "#6156E2" }}>
                  별점 {averRating}
                </p>
                <p className={styles.reviewSize}>•{reviewSize}명 참여</p>
              </div>
              <div>
                <button className={styles.reviewButton} onClick={openModal}>
                  <img src={pen} className={styles.pen}></img>
                  <span className={styles.makeReview}>리뷰 작성</span>
                </button>
              </div>
            </div>

            <div style={{ height: calculatedHeight }}>
              <h3 className={styles.reviewBox}>리뷰 {reviewSize}개</h3>
              <div className={styles.bigContainer1}>
                <ReviewsComponent cafeId={selectedCafeId} />
              </div>
            </div>
          </div>
        )}
        {activeTab === "사진" && <div>서비스 준비 중입니다..</div>}
        {activeTab === "정보" && <div>서비스 준비 중입니다..</div>}
      </div>
    </div>
  );
};

export default MenuListComponent;
