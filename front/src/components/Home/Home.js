import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import Header from "../Header/Header";
import styles from "./Home.module.css";
import { API_URL } from "../Constant";
import ReviewModal from "../ReviewModal/ReviewModal";
import ReviewsComponent from "../ReviewsComponent/ReviewsComponent";
import seatGreen from "../icons/seatGreen.png";
import seatRed from "../icons/seatRed.png";
import seatYellow from "../icons/seatYellow.png";
import searchButton from "../icons/searchButton.png";
import filledGreen from "../icons/filledGreen.png";
import filledYellow from "../icons/filledYellow.png";
import filledRed from "../icons/filledRed.png";
import line from "../icons/line.png";
import mail1 from "../icons/mail1.png";
import DisplayAds from "../DisplayAds/DisplayAds";
import CafeFlow from "../icons/CafeFlow.png";
import circle from "../icons/circle.png";
import seperateLine from "../icons/seperateLine.png";
import pen from "../icons/pen.png";

const { kakao } = window;

const Home = ({
  setIsTestButtonClicked,
  isTestButtonClicked,
  setIsModalVisible,
  isModalVisible,
  cafeId,
}) => {
  const [center, setCenter] = useState({
    lat: 37.550433,
    lng: 127.074055,
  });
  const isPc = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  const [activeTab, setActiveTab] = useState("메뉴");
  const [selectedCafeId, setSelectedCafeId] = useState(null);

  const handleCafeClick = (id) => {
    setSelectedCafeId(id); // 클릭된 카페의 ID로 상태 업데이트
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [selectedButton, setSelectedButton] = useState("세종대");
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [hideUI, setHideUI] = useState(false);
  const [moveUp, setMoveUp] = useState(false);

  const [modalData, setModalData] = useState({
    name: "",
    count: 0,
    address: "",
  });
  const [seatImagePath, setSeatImagePath] = useState("");

  const [showMessage, setShowMessage] = useState(true);

  // 버튼 클릭 시 실행되는 함수
  const handleUnivButtonClick = (lat, lng, univName) => {
    setCenter({ lat, lng });
    setSelectedButton(univName);
    setHideUI(true); // UI 숨김 상태 변경
    setMoveUp(true); // UI 움직임 상태 변경
    setIsTestButtonClicked(true);
    setShowMessage(false);
  };

  useEffect(() => {
    const getSeatImagePath = (count) => {
      if (count <= 15) {
        return seatGreen;
      } else if (count > 15 && count <= 31) {
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

  // 리뷰 작성 modal 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);

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
          // console.log(element.count);
          // console.log(element.id);
          let seatImage;
          if (element.count <= 15) {
            seatImage = seatGreen;
          } else if (element.count > 15 && element.count <= 31) {
            seatImage = seatYellow;
          } else {
            seatImage = seatRed;
          }

          let borderColor;

          if (element.count <= 15) {
            borderColor = "#F96356";
          } else if (element.count > 15 && element.count <= 31) {
            borderColor = "#FFC85F";
          } else {
            borderColor = "#00F29B";
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

            // count 값에 따른 이미지와 텍스트 색상 설정
            if (element.count <= 15) {
              logoImage.src = filledGreen;
              overlayContainer.style.backgroundColor = "#00F29B";
            } else if (element.count > 15 && element.count <= 31) {
              logoImage.src = filledYellow;
              overlayContainer.style.backgroundColor = "#FFC85F";
            } else {
              logoImage.src = filledRed;
              overlayContainer.style.backgroundColor = "#F96356";
            }
            cafeName.style.color = "white";
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
                <p className={styles.h2}>CafeFlow</p>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.search_container}>
                  <input
                    className={`${styles.search_input} ${
                      hideUI ? styles.hideElement : ""
                    }`}
                  />
                  <img
                    src={line}
                    className={`${styles.line} ${
                      hideUI ? styles.hideElement : ""
                    }`}
                  />
                  <img
                    src={searchButton}
                    className={`${styles.magnifier_icon} ${
                      hideUI ? styles.hideElement : ""
                    }`}
                  />
                </div>
                <img src={mail1} className={styles.mail1}></img>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 모바일 버전 */}
      {!isModalVisible && isMobile && (
        <>
          <Header />
          <div
            className={`${styles.title} ${hideUI ? styles.hideElement : ""}`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={CafeFlow} className={styles.desktopLogo}></img>
              <p className={styles.h2}>CafeFlow</p>
            </div>
          </div>
          {showMessage && (
            <div className={styles.confirm}>
              <p className={styles.p}>
                카페플로우를 통해 카페 내 현재 사람 수를 확인하세요
              </p>
            </div>
          )}
          <div className={styles.inputContainer}>
            <div className={styles.search_container}>
              <input
                className={`${styles.search_input} ${
                  hideUI ? styles.hideElement : ""
                }`}
              />
              <img
                src={line}
                className={`${styles.line} ${hideUI ? styles.hideElement : ""}`}
              />
              <img
                src={searchButton}
                className={`${styles.magnifier_icon} ${
                  hideUI ? styles.hideElement : ""
                }`}
              />
            </div>
          </div>
        </>
      )}
      {isPc && (
        <div
          className={
            isModalVisible
              ? styles.buttonContainer
              : moveUp
              ? `${styles.buttonContainer} ${styles.moveUp}`
              : styles.buttonContainer
          }
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={circle} className={styles.circle}></img>
            <span className={styles.p}>
              카페플로우를 통해 카페 내 현재 사람 수를 확인하세요
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className={styles.choose}>대학교 선택</span>
            <img
              src={line}
              style={{
                height: "2vh",
                margin: "0 0.5vw 0 0.5vw",
                width: "0.1vw",
              }}
            ></img>
            <button
              style={{
                marginRight: "5px",
                borderRadius: "32px",
                borderColor:
                  selectedButton === "세종대" ? "#F96356" : "#D7CCCB",
              }}
              className={styles.univButton}
              onClick={() =>
                handleUnivButtonClick(37.550433, 127.074055, "세종대")
              }
            >
              <p className={styles.school}>세종대</p>
            </button>
            <button
              style={{
                marginRight: "5px",
                borderRadius: "32px",
                borderColor:
                  selectedButton === "건국대" ? "#F96356" : "#D7CCCB",
              }}
              className={styles.univButton}
              onClick={() =>
                handleUnivButtonClick(37.54313, 127.077501, "건국대")
              }
            >
              <p className="school">건국대</p>
            </button>
            <button
              style={{
                borderRadius: "32px",
                borderColor:
                  selectedButton === "연세대" ? "#F96356" : "#D7CCCB",
              }}
              className={styles.univButton}
              onClick={() =>
                handleUnivButtonClick(37.564572, 126.9386, "연세대")
              }
            >
              <p className="school">연세대</p>
            </button>
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className={
            isModalVisible
              ? styles.buttonContainer
              : moveUp
              ? `${styles.buttonContainer} ${styles.moveUp}`
              : styles.buttonContainer
          }
        >
          <button
            style={{
              marginRight: "10px",
              borderRadius: "32px",
              borderColor: selectedButton === "세종대" ? "#F96356" : "#D7CCCB",
            }}
            className={styles.univButton}
            onClick={() =>
              handleUnivButtonClick(37.550433, 127.074055, "세종대")
            }
          >
            <p className={styles.school}>세종대</p>
          </button>
          <button
            style={{
              borderRadius: "32px",
              borderColor: selectedButton === "건국대" ? "#F96356" : "#D7CCCB",
            }}
            className={styles.univButton}
            onClick={() =>
              handleUnivButtonClick(37.54313, 127.077501, "건국대")
            }
          >
            <p className="school">건국대</p>
          </button>
          {isModalVisible && (
            <div className={styles.modalBackdrop} onClick={closeModal}></div>
          )}
        </div>
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
      {isPc && (
        <div
          className={`${styles.modal} ${isModalVisible ? styles.visible : ""}`}
        >
          <button className={styles.closeButton} onClick={closeModal}></button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "15%",
            }}
          >
            <div className={styles.div1}>
              <h2 className={styles.modalCafeName}>{modalData.name}</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: "0px", color: "red" }}>별점</p>
                <hr className={styles.hr} />
                {/* 추후 API 통신을 통해 서버에서 리뷰를 가져와 변경할 예정 */}
                <p style={{ margin: "0px", color: "#796262" }}>리뷰 490</p>
              </div>
            </div>
            <div className={styles.div2}>
              <p
                style={{
                  fontSize: "1.3em",
                  color:
                    modalData.count <= 15
                      ? "#00F29B"
                      : modalData.count > 15 && modalData.count <= 31
                      ? "#FFC85F"
                      : "#F96356",
                }}
              >
                {modalData.count}
              </p>
              <p style={{ fontSize: "1.3em", color: "#796262" }}>
                &nbsp;/&nbsp;45
              </p>
              <img
                src={seatImagePath}
                alt="Seat Status"
                style={{ height: "3vh", marginLeft: "1vw" }}
              />
            </div>
          </div>
          <div className={styles.div4}>
            {/* 추후 API 통신을 통해 서버에서 영업시간을 가져와 그에 따른 영업 유무 변경할 예정 */}
            <p style={{ marginLeft: "2%" }}>영업 중</p>
            <hr className={styles.hr} />
            {/* 추후 API 통신을 통해 서버에서 시간을 가져와 변경할 예정 */}
            <p style={{ color: "#796262" }}>23:00에 영업종료</p>
          </div>
          <div className={styles.div3}>
            {/* <span style={{ marginTop: "2vh" }}>주소</span> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className={styles.address}>{modalData.address}</p>
              <button
                className={styles.copyButton}
                onClick={copyAddressToClipboard}
              ></button>
            </div>
          </div>
          <img src={seperateLine} className={styles.seperateLine}></img>
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
                  style={{
                    backgroundColor: "white",
                    // border: "none",
                  }}
                >
                  <p style={{ margin: "1vh 0 1vh 0" }}>{tab}</p>
                </button>
              ))}
            </div>
            <div className={styles.tabContent}>
              {activeTab === "메뉴" && <div>메뉴 내용</div>}
              {activeTab === "리뷰" && (
                <div>
                  <div className={styles.flex1}>
                    <div className={styles.flex}>
                      <p style={{ color: "red" }}>별점 4.0</p>•<p>350명 참여</p>
                    </div>
                    <div>
                      <button
                        className={styles.reviewButton}
                        onClick={openModal}
                      >
                        <img src={pen} style={{ width: "2vw" }}></img>
                        <span className={styles.makeReview}>리뷰 작성</span>
                      </button>
                    </div>
                  </div>
                  <ReviewsComponent cafeId={selectedCafeId} />
                </div>
              )}
              {activeTab === "사진" && <div>사진 내용</div>}
              {activeTab === "정보" && <div>정보 내용</div>}
            </div>
          </div>
        </div>
      )}
      <ReviewModal
        cafeId={selectedCafeId}
        isOpen={modalOpen}
        onClose={closeModal2}
      />

      {isMobile && (
        <>
          <Header />
          <div
            className={`${styles.modal} ${
              isModalVisible ? styles.visible : ""
            }`}
          >
            <div className={styles.div1}>
              <h2 style={{ margin: "0px", fontFamily: "Pretendard" }}>
                {modalData.name}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: "0px", color: "red" }}>별점 4.0</p>
                <img
                  src={line}
                  style={{
                    height: "2vh",
                    margin: "0 0.5vw 0 0.5vw",
                    width: "0.1vw",
                  }}
                ></img>
                {/* 추후 API 통신을 통해 서버에서 리뷰를 가져와 변경할 예정 */}
                <p style={{ margin: "0px", color: "#796262" }}> 리뷰 490</p>
              </div>
              <div className={styles.div2}>
                <p
                  style={{
                    fontSize: "1.3em",
                    color:
                      modalData.count <= 15
                        ? "#00F29B"
                        : modalData.count > 15 && modalData.count <= 31
                        ? "#FFC85F"
                        : "#F96356",
                  }}
                >
                  {modalData.count}
                </p>
                <p style={{ fontSize: "1.3em", color: "#796262" }}>
                  &nbsp;/&nbsp;45
                </p>
                <img
                  src={seatImagePath}
                  alt="Seat Status"
                  style={{ height: "3vh", marginLeft: "10px" }}
                />
              </div>
            </div>
            <div className={styles.div4}>
              {/* 추후 API 통신을 통해 서버에서 영업시간을 가져와 그에 따른 영업 유무 변경할 예정 */}
              <p>영업 중</p>
              <hr className={styles.hr} />
              {/* 추후 API 통신을 통해 서버에서 시간을 가져와 변경할 예정 */}
              <p style={{ color: "#796262" }}>23:00에 영업종료</p>
            </div>
            <div className={styles.div3}>
              <span>주소</span>
              <div>
                <p style={{ color: "#796262" }}>{modalData.address}</p>
                <button
                  className={styles.copyButton}
                  onClick={copyAddressToClipboard}
                ></button>
              </div>
            </div>
            {isModalVisible && (
              <div className={styles.modalBackdrop} onClick={closeModal}></div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
