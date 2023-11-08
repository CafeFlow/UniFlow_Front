import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../Rating/Rating";
import styles from "./ReviewModal.module.css"; // 가정한 스타일시트 파일 경로
import close from "../icons/close.png";
import { API_URL } from "../Constant";

const ReviewModal = ({ isOpen, onClose, cafeId }) => {
  const [rating, setRating] = useState(0); // 별점 상태
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태 추가

  // 리뷰 전송 함수
  const handleConfirm = async () => {
    // 서버에 전송할 데이터 객체
    const reviewData = {
      rate: rating,
      comments: reviewText,
    };

    try {
      const response = await axios.post(
        `${API_URL}/${cafeId}/reviews`,
        reviewData
      );

      console.log(response.data); // 응답 로깅
      console.log("댓글 작성 성공!");
      window.alert("댓글 작성 성공!");
      setReviewText(""); // textarea의 내용을 초기화
      // 성공 시 모달 닫기
      handleClose();
    } catch (error) {
      console.error("리뷰를 전송하는 중 오류가 발생했습니다.", error);
      console.log(cafeId);
    }
  };

  // 모달 애니메이션을 위한 상태
  const [modalClass, setModalClass] = useState(styles.hidden);

  // isOpen 상태가 변경될 때마다 애니메이션 상태를 업데이트
  useEffect(() => {
    if (isOpen) {
      setModalClass(""); // 모달을 보이게 한다.
    } else {
      setModalClass(styles.hidden); // 모달을 숨김.
    }
  }, [isOpen]);

  // 모달을 닫을 때의 처리.
  const handleClose = () => {
    setModalClass(styles.hidden); // 먼저 모달을 아래로 슬라이드
    setTimeout(onClose, 300); // CSS 애니메이션 시간 후에 모달 상태를 변경
  };

  if (!isOpen && modalClass === styles.hidden) return null;

  return (
    <div className={`${styles.reviewModal} ${modalClass}`}>
      <div className={styles.modalContent}>
        <div className={styles.reviewBoxTop}>
          <div className={styles.reviewTitle}>
            <h3 className={styles.reviewTop}>리뷰작성</h3>
          </div>
          <div className={styles.closeButton}>
            <img
              className={styles.close}
              src={close}
              onClick={handleClose}
              alt="Close"
            ></img>
          </div>
        </div>
        <div className={styles.about}>
          <p>
            <span style={{ fontWeight: "bold" }} className={styles.highlight}>
              딕셔너리
            </span>
            에 대한 별점을 남겨주세요.
            <span className={styles.highlight}>*</span>
          </p>
        </div>
        <Rating rating={rating} setRating={setRating} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className={styles.highlight}>카페에 대한 리뷰를 남겨주세요.</p>
        </div>
        <div className={styles.reviewInputBox}>
          <textarea
            className={styles.reviewInput}
            value={reviewText}
            placeholder="리뷰를 작성하세요. (리뷰 작성은 선택사항입니다)"
            onChange={(e) => setReviewText(e.target.value)} // 입력값을 상태에 업데이트
          ></textarea>
        </div>
        <div className={styles.bottomButton}>
          <button className={styles.button1} onClick={handleClose}>
            <p className={styles.pretendard}>취소</p>
          </button>
          {/* button2에 onConfirm 달아야함 */}
          <button className={styles.button2} onClick={handleConfirm}>
            <p className={styles.pretendard}>확인</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
