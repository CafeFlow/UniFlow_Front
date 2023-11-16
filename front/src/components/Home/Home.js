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
import close from "../icons/close.png";
import filledGreen from "../icons/filledGreen.png";
import filledYellow from "../icons/filledYellow.png";
import filledRed from "../icons/filledRed.png";
import line from "../icons/line.png";
import CafeFlow from "../icons/CafeFlow.png";
import circle from "../icons/circle.png";
import seperateLine from "../icons/seperateLine.png";
import pen from "../icons/pen.png";
import pan1 from "../icons/pan1.jpeg";
import pan2 from "../icons/pan2.jpeg";
import pan3 from "../icons/pan3.jpeg";
import ReviewsComponent from "../ReviewsComponent/ReviewsComponent";

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
    lat: 37.550433,
    lng: 127.074055,
  });

  const [mapHeight, setMapHeight] = useState("100vh");
  const [activeTab, setActiveTab] = useState("메뉴");
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

  // 리뷰 작성 modal 열고 닫기
  const [modalOpen, setModalOpen] = useState(false);

  // 모바일 modal에서 클릭됐을때 모달이 화면 끝까지 올라오게 함
  const [nameClicked, setNameClicked] = useState(false);

  const handleNameClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setNameClicked(!nameClicked);
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

  // 지난 시간을 표기해주는 함수
  const timeAgo = (dateString) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInSeconds = Math.round((now - reviewDate) / 1000);
    const diffInMinutes = Math.round(diffInSeconds / 60);
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);

    if (diffInHours < 24) {
      if (diffInHours === 1) return "1시간 전";
      return `${diffInHours}시간 전`;
    } else if (diffInDays <= 7) {
      if (diffInDays === 1) return "1일 전";
      return `${diffInDays}일 전`;
    } else {
      // 7일 이상이면 '2023-11-06' 형태로 표시
      return reviewDate.toLocaleDateString("ko-KR");
    }
  };

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
            setIsTestButtonClicked(true);

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

  const calculatedHeight = `calc(100vh + ${reviewSize * 25}px)`;
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
                  <button
                    style={{
                      marginRight: "5px",
                      borderRadius: "32px",
                      borderColor:
                        selectedButton === "세종대" ? "#6156E2" : "#D7CCCB",
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
                      borderColor:
                        selectedButton === "연세대" ? "#6156E2" : "#D7CCCB",
                    }}
                    className={styles.univButton}
                    onClick={() =>
                      handleUnivButtonClick(37.564572, 126.9386, "연세대")
                    }
                  >
                    <p className={styles.school}>연세대</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* 모바일 버전 */}
      {isMobile && (
        <>
          <Header
            isTestButtonClicked={isTestButtonClicked}
            isModalVisible={isModalVisible}
            handleUnivButtonClick={handleUnivButtonClick}
            selectedButton={selectedButton}
          />
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={circle} className={styles.circle}></img>
              <span className={styles.p}>
                Uni.flow를 통해 카페 내 현재 사람 수를 확인하세요
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* <span className={styles.choose}>대학교 선택</span>
            <img
              src={line}
              style={{
                height: "2vh",
                margin: "0 0.5vw 0 0.5vw",
                width: "0.1vw",
              }}
            ></img> */}
              <div className={styles.flex}>
                {/* <p>대학교 선택</p> */}
                <hr className={styles.hr} />
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
          <div className={styles.choose}>
            <p style={{ margin: "0px" }}>공간 선택</p>
            <img
              src={line}
              style={{
                height: "2vh",
                // margin: "0 0.5vw 0 0.5vw",
                padding: "0 2vw 0 2vw",
                width: "0.3vw",
              }}
            ></img>
            <button className={styles.chooseButton}>
              <p>카페</p>
            </button>
            {/* <button
              className={styles.chooseButton}
              style={{ marginLeft: "2%" }}
            >
              <p>학식</p>
            </button> */}
          </div>
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

      {/* 데스크탑 버전 */}
      {isPc && (
        <div
          className={`${styles.modal} ${isModalVisible ? styles.visible : ""}`}
        >
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
                <p style={{ margin: "0px", color: "#6156E2" }}>
                  별점 {averRating}
                </p>
                <hr className={styles.hr} />
                <p style={{ margin: "0px", color: "#796262" }}>
                  리뷰 {reviewSize}
                </p>
              </div>
            </div>
            <div className={styles.div2}>
              <p
                style={{
                  fontSize: "1em",
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
              <p style={{ fontSize: "1em", color: "#796262" }}>
                &nbsp;/&nbsp;45
              </p>
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
                      <button
                        className={styles.reviewButton}
                        onClick={openModal}
                      >
                        <img src={pen} style={{ width: "2vw" }}></img>
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
        </div>
      )}
      <ReviewModal
        cafeId={selectedCafeId}
        isOpen={modalOpen}
        onClose={closeModal2}
        cafeName={modalData.name}
      />

      {isMobile && (
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
            className={`${styles.modal} ${
              isModalVisible ? styles.visible : ""
            } ${nameClicked ? styles.expanded : ""}`}
          >
            <div className={styles.div1} onClick={handleNameClick}>
              <div>
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Pretendard",
                    marginBottom: "0.5vh",
                    fontSize: "1.3em",
                  }}
                >
                  {modalData.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
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
                      modalData.count <= 15
                        ? "#00F29B"
                        : modalData.count > 15 && modalData.count <= 31
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
              <p>영업 중&nbsp;</p>
              <img
                src={line}
                style={{
                  height: "2vh",
                  margin: "0 0.5vw 0 0.5vw",
                  width: "0.3vw",
                }}
              ></img>
              <p style={{ color: "#444444" }}>&nbsp;23:00에 영업종료</p>
            </div>
            <div className={styles.div3}>
              <p style={{ color: "#444444" }}>{modalData.address}</p>
              <button
                className={styles.copyButton}
                onClick={copyAddressToClipboard}
              ></button>
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
                {activeTab === "메뉴" && <div>서비스 준비 중입니다..</div>}
                {activeTab === "리뷰" && (
                  <div>
                    <div className={styles.flex1}>
                      <div className={styles.flex}>
                        <p className={styles.star} style={{ color: "#6156E2" }}>
                          별점 {averRating}
                        </p>
                        <p className={styles.reviewSize}>
                          •{reviewSize}명 참여
                        </p>
                      </div>
                      <div>
                        <button
                          className={styles.reviewButton}
                          onClick={openModal}
                        >
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
          </div>
        </>
      )}
    </>
  );
};

export default Home;
