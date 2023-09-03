import React, { useEffect } from "react";

import { markerdata } from "../Data/markerData.js";
import styles from "./Home.module.css";

const { kakao } = window;

const Home = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.550433, 127.074055),
      level: 4,
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
  }, []);
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.leftAd}>광고</div>
        <div id="map" className={styles.centerMap}></div>
        <div className={styles.rightAd}>광고</div>
      </div>
      <div className={styles.mobileunderAd}>밑 광고</div>
    </div>
  );
};

export default Home;
