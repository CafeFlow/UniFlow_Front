import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Header from "../Header/Header";
import styles from "./Home.module.css";
import { API_URL } from "../Constant";
import ReviewModal from "../ReviewModal/ReviewModal";
import InfoModal from "../InfoModal/InfoModal";
import seatGreen from "../icons/seatGreen.png";
import seatRed from "../icons/seatRed.png";
import seatYellow from "../icons/seatYellow.png";
import filledGreen from "../icons/filledGreen.png";
import filledYellow from "../icons/filledYellow.png";
import filledRed from "../icons/filledRed.png";
import line from "../icons/line.png";
import CafeFlow from "../icons/CafeFlow.png";
import circle from "../icons/circle.png";
import CafeInfoModal from "./CafeInfoModal";
import CafeInfoMobileModal from "./CafeInfoMobileModal";
import UnivButton from "./UnivButton";
import KakaoChatButton from "../KakaoChatButton/KakaoChatButton";

const { kakao } = window;

const Home = ({
  setIsTestButtonClicked,
  isTestButtonClicked,
  setIsModalVisible,
  isModalVisible,
  cafeId,
}) => {
  const [reviews, setReviews] = useState([]); // 리뷰들을 저장할 상태
  const [reviewSize, setReviewSize] = useState(0);
  const [averRating, setAverRating] = useState(0);
  const [selectedCafeId, setSelectedCafeId] = useState(null);
  const [center, setCenter] = useState({
    lat: 37.560836,
    lng: 126.937171,
  });
  const [mapHeight, setMapHeight] = useState("100vh");
  const [activeTab, setActiveTab] = useState("메뉴");
  const [selectedButton, setSelectedButton] = useState("세종대");
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("카페");

  const [hideUI, setHideUI] = useState(false);
  const [moveUp, setMoveUp] = useState(false);

  const [modalData, setModalData] = useState({
    name: "",
    count: 0,
    address: "",
  });
  const [seatImagePath, setSeatImagePath] = useState("");

  const [showMessage, setShowMessage] = useState(true);

  // 리뷰 작성 modal 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);

  // 모바일 modal에서 클릭됐을때 모달이 화면 끝까지 올라오게 함
  const [nameClicked, setNameClicked] = useState(false);

  const handleNameClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setNameClicked(!nameClicked);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // setCenter({ lat: 37.560836, lng: 126.937171 }); // 학식 버튼 클릭 시 연세대로 좌표 변경
  };

  // 서버로부터 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/${selectedCafeId}/reviews`);
      setReviews(response.data.reviewList); // 상태에 리뷰 데이터 저장
      setReviewSize(response.data.reviewSize); // 리뷰 개수 상태 저장
      setAverRating(response.data.averRating); // 평균 평점 상태 저장
      console.log(response.data);
    } catch (error) {
      // console.error("리뷰를 가져오는 중 오류가 발생했습니다", error);
    }
  };

  useEffect(() => {
    if (selectedCafeId) {
      fetchReviews();
    }
  }, [selectedCafeId]); // selectedCafeId가 변경될 때만 fetchReviews를 호출

  // 컴포넌트가 마운트될 때 리뷰 데이터를 가져옵니다.
  useEffect(() => {
    fetchReviews();
  }, [cafeId]);

  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  const handleCafeClick = (id) => {
    setSelectedCafeId(id); // 클릭된 카페의 ID로 상태 업데이트
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 버튼 클릭 시 실행되는 함수
  const handleUnivButtonClick = (lat, lng, univName) => {
    setCenter({ lat, lng });
    setSelectedButton(univName);
    setHideUI(true); // UI 숨김 상태 변경
    // setMoveUp(true); // UI 움직임 상태 변경
    setIsTestButtonClicked(true);
    setShowMessage(false);
    setMapHeight("80vh");
  };

  useEffect(() => {
    const getSeatImagePath = (count) => {
      if (count <= 30) {
        return seatGreen;
      } else if (count >= 31 && count <= 60) {
        return seatYellow;
      } else {
        return seatRed;
      }
    };

    setSeatImagePath(getSeatImagePath(modalData.count));
  }, [modalData]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 비활성화
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 스크롤 활성화
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행됨을 의미

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal2 = () => {
    setModalOpen(false);
  };
  //////////////////////////////////////////////////////////

  const closeModal = () => {
    console.log("modal 종료!");
    setIsModalVisible(false);
    setIsTestButtonClicked(false);
    setNameClicked(false); // 모달을 축소하기 위해 nameClicked 상태를 false로 설정

    // 모달 창 종료 시 이미지와 글자색이 원래대로 돌아감
    if (activeOverlay) {
      const prevLogoImage = activeOverlay.querySelector(`.${styles.logo}`);
      const prevCafeName = activeOverlay.querySelector(`.${styles.CafeName}`);
      if (prevLogoImage.src.includes(filledRed)) {
        prevLogoImage.src = seatRed;
        activeOverlay.style.backgroundColor = "";
        prevCafeName.style.color = "black";
      } else if (prevLogoImage.src.includes(filledYellow)) {
        prevLogoImage.src = seatYellow;
        activeOverlay.style.backgroundColor = "";
        prevCafeName.style.color = "black";
      } else if (prevLogoImage.src.includes(filledGreen)) {
        prevLogoImage.src = seatGreen;
        activeOverlay.style.backgroundColor = "";
        prevCafeName.style.color = "black";
      }

      setActiveOverlay(null); // activeOverlay 상태를 null로 초기화
    }
  };

  const copyAddressToClipboard = () => {
    if (modalData.address) {
      // 주소가 존재하는 경우 클립보드에 복사
      navigator.clipboard.writeText(modalData.address).then(
        function () {
          // 복사 성공
          console.log("주소가 클립보드에 복사되었습니다.");
          alert("주소가 클립보드에 복사되었습니다!");
        },
        function (err) {
          // 복사 실패
          alert("주소 복사에 실패했습니다!");
          console.error("주소 복사에 실패했습니다: ", err);
        }
      );
    }
  };

  useEffect(() => {
    if (window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.onload = () => {
        const key = process.env.REACT_APP_KAKAO_KEY;
        window.Kakao.init(key);
      };
      document.head.appendChild(script);
    }
  }, []);

  const kakaoChat = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: "_ibrXG", // 여기에 채널의 고유 ID를 입력하세요.
      });
    }
  };
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
        console.log(data);

        Array.from(data).forEach((element) => {
          let seatImage;
          if (element.count <= 30) {
            seatImage = seatGreen;
          } else if (element.count >= 31 && element.count <= 60) {
            seatImage = seatYellow;
          } else {
            seatImage = seatRed;
          }

          let borderColor;

          if (element.count <= 30) {
            borderColor = "#00F29B";
          } else if (element.count >= 31 && element.count <= 60) {
            borderColor = "#FFC85F";
          } else {
            borderColor = "#F96356";
          }

          const overlayContainer = document.createElement("div");
          overlayContainer.id = `overlay_${element.name}`;
          overlayContainer.className = styles.overlayContainer;
          overlayContainer.style.borderColor = "lightgray";

          const logoContainer = document.createElement("div");
          logoContainer.className = styles.logoContainer;

          const logoImage = document.createElement("img");
          logoImage.className = styles.logo;
          logoImage.src = seatImage;

          const cafeName = document.createElement("p");
          cafeName.className = styles.CafeName;
          cafeName.innerText = element.name;

          logoContainer.appendChild(logoImage);
          logoContainer.appendChild(cafeName);
          overlayContainer.appendChild(logoContainer);

          overlayContainer.addEventListener("click", function () {
            setIsModalVisible(true);
            handleCafeClick(element.id); // id값을 넘겨주기 위해 클릭 이벤트에 ID 전달
            setModalData({
              name: element.name,
              count: element.count,
              address: element.address,
            });
            // setIsTestButtonClicked(true);
            setActiveOverlay(overlayContainer);
            setIsTestButtonClicked(true);

            // // count 값에 따른 이미지와 텍스트 색상 설정
            // if (element.count <= 30) {
            //   logoImage.src = filledGreen;
            //   overlayContainer.style.backgroundColor = "#00F29B";
            // } else if (element.count >= 31 && element.count <= 60) {
            //   logoImage.src = filledYellow;
            //   overlayContainer.style.backgroundColor = "#FFC85F";
            // } else {
            //   logoImage.src = filledRed;
            //   overlayContainer.style.backgroundColor = "#F96356";
            // }
            // cafeName.style.color = "white";
          });

          const overlay = new kakao.maps.CustomOverlay({
            content: overlayContainer,
            map: map,
            position: new kakao.maps.LatLng(element.xmap, element.ymap),
          });
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }, [center]);

  const calculatedHeight = `calc(100vh + ${reviewSize * 30}px)`;
  return (
    <>
      {/* 데스크탑 버전 */}
      {isPc && (
        <>
          <div
            className={`${styles.title} ${hideUI ? styles.hideElement : ""}`}
          >
            <div className={styles.flex2}>
              <div className={styles.flex}>
                <img src={CafeFlow} className={styles.desktopLogo}></img>
                <p className={styles.h2}>Uni.flow</p>
                <div className={styles.flex} style={{ marginLeft: "1vw" }}>
                  <UnivButton
                    name="세종대"
                    isSelected={selectedButton === "세종대"}
                    onClick={() =>
                      handleUnivButtonClick(37.550433, 127.074055, "세종대")
                    }
                  />
                  <UnivButton
                    name="연세대"
                    isSelected={selectedButton === "연세대"}
                    onClick={() =>
                      handleUnivButtonClick(37.564572, 126.9386, "연세대")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {isPc && (
        <>
          <div
            className={
              isModalVisible
                ? styles.buttonContainer
                : moveUp
                ? `${styles.buttonContainer} ${styles.moveUp}`
                : styles.buttonContainer
            }
          >
            <div className={styles.flex}>
              <img src={circle} className={styles.circle}></img>
              <span className={styles.p}>
                Uni.flow를 통해 카페 내 현재 사람 수를 확인하세요
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.flex}>
                {/* <p>대학교 선택</p> */}
                {/* <hr className={styles.hr} /> */}
              </div>
            </div>
          </div>
          <hr
            style={{
              width: "100%",
              border: "1px solid #F7F4F4",
              marginTop: "2vh",
              marginBottom: "-1vh",
            }}
          />
        </>
      )}

      {/* 데스크탑 버전 */}
      {isPc && (
        <CafeInfoModal
          isModalVisible={isModalVisible}
          modalData={modalData}
          closeModal={closeModal}
          copyAddressToClipboard={copyAddressToClipboard}
          averRating={averRating}
          reviewSize={reviewSize}
          seatImagePath={seatImagePath}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          openModal={openModal}
          calculatedHeight={calculatedHeight}
          selectedCafeId={selectedCafeId}
          nameClicked={nameClicked}
          handleNameClick={handleNameClick}
        />
      )}

      {isMobile && (
        <>
          <Header
            isTestButtonClicked={isTestButtonClicked}
            isModalVisible={isModalVisible}
            handleUnivButtonClick={handleUnivButtonClick}
            selectedButton={selectedButton}
          />
          <div
            className={
              isModalVisible
                ? styles.buttonContainer
                : moveUp
                ? `${styles.buttonContainer} ${styles.moveUp}`
                : styles.buttonContainer
            }
          >
            <div className={styles.choose}>
              {/* <img
                src={line}
                style={{
                  height: "2vh",
                  padding: "0 2vw 0 2vw",
                  width: "0.3vw",
                }}
              ></img> */}
              <div className={styles.chooseContainer}>
                <button
                  className={
                    selectedCategory === "카페"
                      ? styles.selectedButton
                      : styles.chooseButton
                  }
                  onClick={() => handleCategoryClick("카페")}
                >
                  <p className={styles.chooseCategory}>카페</p>
                </button>
                <button
                  className={
                    selectedCategory === "학식"
                      ? styles.selectedButton
                      : styles.chooseButton
                  }
                  onClick={() => handleCategoryClick("학식")}
                >
                  <p className={styles.chooseCategory}>학식</p>
                </button>
                <button
                  className={
                    selectedCategory === "독서실"
                      ? styles.selectedButton
                      : styles.chooseButton
                  }
                  onClick={() => handleCategoryClick("독서실")}
                >
                  <p className={styles.chooseCategory}>독서실</p>
                </button>
              </div>
              <button
                onClick={kakaoChat}
                className={styles.KakaoChatButton}
              ></button>
            </div>
          </div>
        </>
      )}

      <div
        className={
          isModalVisible
            ? styles.bigContainer
            : moveUp
            ? `${styles.bigContainer} ${styles.moveUp}`
            : styles.bigContainer
        }
      >
        <div className={styles.container}>
          {/* <div className={styles.leftAd}>광고</div> */}
          <div id="map" className={styles.centerMap}></div>
          <InfoModal />
          {/* <div className={styles.rightAd}>광고</div> */}
        </div>
        <div
          className={
            isTestButtonClicked ? styles.mobileunderAd2 : styles.mobileunderAd
          }
        >
          {/* <DisplayAds /> */}
        </div>
      </div>

      <ReviewModal
        cafeId={selectedCafeId}
        isOpen={modalOpen}
        openModal={openModal}
        closeModal={closeModal}
        onClose={closeModal2}
        cafeName={modalData.name}
      />

      {isMobile && (
        <>
          <CafeInfoMobileModal
            isModalVisible={isModalVisible}
            nameClicked={nameClicked}
            closeModal={closeModal}
            handleNameClick={handleNameClick}
            modalData={modalData}
            copyAddressToClipboard={copyAddressToClipboard}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            openModal={openModal}
            calculatedHeight={calculatedHeight}
            selectedCafeId={selectedCafeId}
            seatImagePath={seatImagePath}
            averRating={averRating}
            reviewSize={reviewSize}
          />
        </>
      )}
    </>
  );
};

export default Home;
