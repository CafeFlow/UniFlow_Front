import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cafeflowLogo from "../icons/cafeflowLogo.png";
import { API_URL } from "../Constant.js";
import styles from "./Home.module.css";

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

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);

    // axios로 가져온 데이터로 마커 생성
    axios
      .get(`${API_URL}/view-map`)
      .then((response) => {
        const data = response.data;

        data.forEach((element) => {
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(element.xmap, element.ymap),
            title: element.name,
          });

          const overlayContent = `
    <div class="${styles.overlayContainer}">
      <div class="${styles.logoContainer}">
        <img class="${styles.logo}" src=${cafeflowLogo} />
        <div class="${styles.cafenameContainer}">
          <h3 class="${styles.CafeName}">${element.name}</h3>
          <span class="${styles.theme}">카페, 스터디</span>
        </div>
      </div>
      <div>
        <h3 class="${styles.seat}">좌석</h3>
        <p class="${styles.count}">${element.count} / 45</p>
        <button id="btn_${element.name}" class="${styles.detailButton}">자세히 알아보기</button>
      </div>
    <div>
`;

          {
            /* <h3 class="${styles.location}">위치</h3>
        <p class="${styles.address}">${element.address}</p> */
          }

          const overlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            map: map,
            position: marker.getPosition(),
          });

          overlay.setMap(null);

          kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
            setTimeout(() => {
              const button = document.getElementById(`btn_${element.name}`);
              if (button) {
                button.addEventListener("click", navigateToReview);
              }
              const detailButton = document.getElementById("detail_button");
              if (detailButton) {
                detailButton.addEventListener("click", navigateToReview);
              }
            }, 0);
          });

          // 지도를 클릭하면 오버레이가 꺼지는 개념인데, 이것을 설정하게 되면 리뷰페이지로 이동이 안됨

          // kakao.maps.event.addListener(map, "click", function () {
          //   overlay.setMap(null);
          // });

          kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
            setTimeout(() => {
              const button = document.getElementById(`btn_${element.name}`);
              if (button) {
                button.addEventListener("click", navigateToReview);
              }
            }, 0);
          });
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
      <div className={styles.buttonContainer}>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: selectedButton === "세종대" ? "white" : "#046EED",
            color: selectedButton === "세종대" ? "#046EED" : "white",
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
            backgroundColor: selectedButton === "건국대" ? "white" : "#046EED",
            color: selectedButton === "건국대" ? "#046EED" : "white",
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
    </>
  );
};

export default Home;
