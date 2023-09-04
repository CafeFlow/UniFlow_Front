import React, { useEffect, useState } from "react";

import { markerdata } from "../Data/markerData.js";
import styles from "./Home.module.css";

const { kakao } = window;

const Home = () => {
  const [center, setCenter] = useState({
    lat: 37.550433,
    lng: 127.074055,
  });

  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: center.level,
    };

    const map = new kakao.maps.Map(container, options);

    markerdata.forEach((element) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(element.lat, element.lng),
        title: element.title,
      });

      const overlay = new kakao.maps.CustomOverlay({
        content: element.overlayContent,
        map: map,
        position: marker.getPosition(),
      });

      // 처음에는 오버레이를 보이지 않게 설정
      overlay.setMap(null);

      kakao.maps.event.addListener(marker, "click", function () {
        // 마커 클릭시 오버레이 표시
        overlay.setMap(map);
      });

      kakao.maps.event.addListener(map, "click", function () {
        // 지도 클릭시 오버레이 숨김
        overlay.setMap(null);
      });
    });
  }, [center]);
  return (
    <>
      <div className={styles.buttonContainer}>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: selectedButton === "세종대" ? "#C9C3F7" : "",
          }}
          className={styles.univButton}
          onClick={() => {
            setCenter({ lat: 37.550433, lng: 127.074055 });
            setSelectedButton("세종대"); // 선택된 버튼 업데이트
          }}
        >
          세종대
        </button>
        <button
          style={{
            backgroundColor: selectedButton === "건국대" ? "#C9C3F7" : "",
          }}
          className={styles.univButton}
          onClick={() => {
            setCenter({ lat: 37.54313, lng: 127.077501 });
            setSelectedButton("건국대"); // 선택된 버튼 업데이트
          }}
        >
          건국대
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
