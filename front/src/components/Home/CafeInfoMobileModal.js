// 카페 overlaycontainer를 눌렀을때 밑에서 올라오는 modal

import React from "react";
import styles from "../Home/Home.module.css";
import close from "../icons/close.png";
import line from "../icons/line.png";
import seperateLine from "../icons/seperateLine.png";
import MenuListComponent from "./MenuListComponent";

const MobileCafeModal = ({
  isModalVisible,
  nameClicked,
  closeModal,
  modalData,
  handleNameClick,
  activeTab,
  copyAddressToClipboard,
  handleTabClick,
  openModal,
  calculatedHeight,
  selectedCafeId,
  seatImagePath,
  averRating,
  reviewSize,
}) => {
  return (
    <>
      {isModalVisible && (
        <button
          className={`${styles.closeContainer} ${
            nameClicked ? styles.expanded : ""
          }`}
          onClick={closeModal}
        >
          <img src={close} className={styles.close} />
          <p className={styles.closeLetter}>닫기</p>
        </button>
      )}
      <div
        className={`${styles.modal} ${isModalVisible ? styles.visible : ""} ${
          nameClicked ? styles.expanded : ""
        }`}
      >
        <div className={styles.div1} onClick={handleNameClick}>
          <div>
            <p className={styles.name}>{modalData.name}</p>
            <div className={styles.flex}>
              <p style={{ margin: "0px", color: "#6156E2" }}>
                별점 {averRating}&nbsp;
              </p>
              <p style={{ margin: "0px", color: "#444444" }}>
                •&nbsp;리뷰 {reviewSize}
              </p>
            </div>
          </div>
          <div className={styles.div2}>
            <p
              style={{
                fontSize: "1.3em",
                fontFamily: "ABeeZee",
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
            <p
              style={{
                fontSize: "1.3em",
                color: "#796E6E",
                fontFamily: "ABeeZee",
              }}
            >
              &nbsp;/&nbsp;100
            </p>
            <img
              src={seatImagePath}
              alt="Seat Status"
              style={{ height: "3vh", marginLeft: "1vw" }}
            />
          </div>
        </div>
        <div className={styles.div4}>
          <p style={{ marginTop: "1vh" }}>영업 중&nbsp;</p>
          <img
            src={line}
            style={{
              height: "2vh",
              margin: "0 0.5vw 0 0.5vw",
              width: "0.3vw",
            }}
          ></img>
          <p style={{ color: "#444444", marginTop: "1vh" }}>
            &nbsp;23:00에 영업종료
          </p>
        </div>
        {/* <div className={styles.div3}>
          <p style={{ color: "#444444" }}>{modalData.address}</p>
          <button
            className={styles.copyButton}
            onClick={copyAddressToClipboard}
          ></button>
        </div> */}
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
    </>
  );
};

export default MobileCafeModal;
