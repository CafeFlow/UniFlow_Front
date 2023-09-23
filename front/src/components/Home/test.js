import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cafeflowLogo from "../icons/cafeflowLogo.png";
import { API_URL } from "../Constant.js";
import styles from "./Home.module.css";
import searchButton from "../icons/searchButton.png";
import line from "../icons/line.png";

const { kakao } = window;

const Home = () => {
  const [center, setCenter] = useState({
    lat: 37.550433,
    lng: 127.074055,
  });

  const navigate = useNavigate();

  const navigateToReview = () => {
    console.log("asd");
    navigate("/review");
  };

  const [selectedButton, setSelectedButton] = useState("세종대");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(""); // 모달에 표시될 내용

  // 마커 클릭 이벤트 핸들러
  const handleOverlayClick = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  // 마커에서 닫기 버튼
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    // axios로 가져온 데이터로 마커 생성
    axios
      .get(`${API_URL}/view-map`)
      .then((response) => {
        const data = response.data;

        data.forEach((element) => {
          const overlayContent = `
          <div id="overlay_${element.name}" class="${styles.overlayContainer}">
            <div class="${styles.logoContainer}">
                <img class="${styles.logo}" src=${cafeflowLogo} />
                <h2 class="${styles.CafeName}">${element.name}</h2>
            </div>
        <div>`;

          {
            // <div>
            //   <h3 class="${styles.seat}">좌석</h3>
            //   <p class="${styles.count}">${element.count} / 45</p>
            // <span class="${styles.theme}">카페, 스터디</span>;
            // </div>;
            /* <button id="btn_${element.name}" class="${styles.detailButton}">자세히 알아보기</button> */
          }

          const overlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            map: map,
            position: new kakao.maps.LatLng(element.xmap, element.ymap),
          });

          // Overlay에 클릭 이벤트 부착
          setTimeout(() => {
            const overlayElem = document.getElementById(
              `overlay_${element.name}`
            );
            if (overlayElem) {
              overlayElem.addEventListener("click", () => {
                handleOverlayClick(overlayContent);
              });
            }
          }, 0);
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }, [center]);

  useEffect(() => {
    axios
      .get(`${API_URL}/view-map`)
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={styles.title}>
        <p className={styles.h2}>CafeFlow</p>
        <p className={styles.p}>
          카페플로우를 통해 카페 내 현재 사람 수를 확인하세요.
        </p>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.search_container}>
          <input className={styles.search_input} />
          <img src={line} className={styles.line} />
          <img src={searchButton} className={styles.magnifier_icon} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          style={{
            marginRight: "10px",
            borderRadius: "32px",
            borderColor: selectedButton === "세종대" ? "#F96356" : "#D7CCCB",
          }}
          className={styles.univButton}
          onClick={() => {
            setCenter({ lat: 37.550433, lng: 127.074055 });
            setSelectedButton("세종대"); // 선택된 버튼 업데이트
          }}
        >
          <p>세종대</p>
        </button>
        <button
          style={{
            borderRadius: "32px",
            borderColor: selectedButton === "건국대" ? "#F96356" : "#D7CCCB",
          }}
          className={styles.univButton}
          onClick={() => {
            setCenter({ lat: 37.54313, lng: 127.077501 });
            setSelectedButton("건국대"); // 선택된 버튼 업데이트
          }}
        >
          <p>건국대</p>
        </button>
      </div>
      <div className={styles.bigContainer}>
        <div className={styles.container}>
          <div className={styles.leftAd}>광고</div>
          <div id="map" className={styles.centerMap}></div>
          <div className={styles.rightAd}>광고</div>
        </div>
        <div className={styles.mobileunderAd}>밑 광고</div>
      </div>
      <div
        className={`${styles.modal} ${isModalVisible ? styles.showModal : ""}`}
      >
        <button onClick={handleCloseModal}>닫기</button>
        <div dangerouslySetInnerHTML={{ __html: modalContent }}></div>
      </div>
    </>
  );
};

export default Home;
