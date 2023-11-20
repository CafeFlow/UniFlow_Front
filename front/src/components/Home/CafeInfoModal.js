// 왼쪽에서 나오는 modal, 카페 정보 및 리뷰 칸들이 있는 Modal임

import React from "react";
import styles from "../Home/Home.module.css";
import line from "../icons/line.png";
import seperateLine from "../icons/seperateLine.png";
import MenuListComponent from "./MenuListComponent";

const CafeInfoModal = ({
  isModalVisible,
  modalData,
  closeModal,
  copyAddressToClipboard,
  averRating,
  reviewSize,
  seatImagePath,
  activeTab,
  handleTabClick,
  openModal,
  calculatedHeight,
  selectedCafeId,
}) => {
  return (
    <div className={`${styles.modal} ${isModalVisible ? styles.visible : ""}`}>
      <button className={styles.closeButton} onClick={closeModal}></button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20%",
        }}
      >
        <div className={styles.div1}>
          <h2 className={styles.modalCafeName}>{modalData.name}</h2>
          <div className={styles.flex}>
            <p style={{ margin: "0px", color: "#6156E2" }}>별점 {averRating}</p>
            <hr className={styles.hr} />
            <p style={{ margin: "0px", color: "#796262" }}>리뷰 {reviewSize}</p>
          </div>
        </div>
        <div className={styles.div2}>
          <p
            style={{
              fontSize: "1em",
              color:
                modalData.count <= 30
                  ? "#00F29B"
                  : modalData.count >= 31 && modalData.count <= 60
                  ? "#FFC85F"
                  : "#F96356",
            }}
          >
            {modalData.count}
          </p>
          <p style={{ fontSize: "1em", color: "#796262" }}>&nbsp;/&nbsp;100</p>
          <img
            src={seatImagePath}
            alt="Seat Status"
            style={{ height: "3vh", marginLeft: "0.5vw" }}
          />
        </div>
      </div>
      <div className={styles.div4}>
        <p style={{ marginLeft: "2%" }}>영업 중</p>
        <img
          src={line}
          style={{
            height: "2vh",
            margin: "0 0.5vw 0 0.5vw",
            width: "0.3vw",
          }}
        ></img>
        <p style={{ color: "#796262" }}>23:00에 영업종료</p>
      </div>
      <div className={styles.div3}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className={styles.address}>{modalData.address}</p>
          <button
            className={styles.copyButton}
            onClick={copyAddressToClipboard}
          ></button>
          <p className={styles.copy}>복사</p>
        </div>
      </div>
      <img src={seperateLine} className={styles.seperateLine}></img>
      <MenuListComponent
        activeTab={activeTab}
        handleTabClick={handleTabClick}
        averRating={averRating}
        reviewSize={reviewSize}
        openModal={openModal}
        calculatedHeight={calculatedHeight}
        selectedCafeId={selectedCafeId}
      />
    </div>
  );
};

export default CafeInfoModal;
