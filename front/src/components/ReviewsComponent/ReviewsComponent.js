import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../ReviewsComponent/ReviewsComponent.module.css";
import starr from "../icons/starr.png";
import { API_URL } from "../Constant";

const ReviewsComponent = ({ cafeId }) => {
  const [reviews, setReviews] = useState([]); // 리뷰들을 저장할 상태
  const [reviewSize, setReviewSize] = useState(0);
  const [averRating, setAverRating] = useState(0);

  // 서버로부터 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/${cafeId}/reviews`);
      setReviews(response.data.reviewList); // 상태에 리뷰 데이터 저장
      setReviewSize(response.data.reviewSize); // 리뷰 개수 상태 저장
      setAverRating(response.data.averRating); // 평균 평점 상태 저장
      console.log(response.data);
    } catch (error) {
      console.error("리뷰를 가져오는 중 오류가 발생했습니다", error);
      console.log(cafeId);
    }
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInSeconds = Math.round((now - reviewDate) / 1000);
    const diffInMinutes = Math.round(diffInSeconds / 60);
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);

    if (diffInHours < 1) {
      if (diffInMinutes < 1) {
        return "방금 전";
      } else if (diffInMinutes === 1) {
        return "1분 전";
      } else {
        return `${diffInMinutes}분 전`;
      }
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays <= 7) {
      if (diffInDays === 1) {
        return "1일 전";
      } else {
        return `${diffInDays}일 전`;
      }
    } else {
      // 7일 이상이면 'YYYY-MM-DD' 형태로 표시
      return reviewDate.toLocaleDateString("ko-KR");
    }
  };

  // 컴포넌트가 마운트될 때 리뷰 데이터를 가져옵니다.
  useEffect(() => {
    fetchReviews();
  }, [cafeId]);

  return (
    <div>
      <div className={styles.bigContainer}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.container}>
            <div className={styles.container2}>
              <div className={styles.flex}>
                <div>
                  <p className={styles.unKnown}>익명{review.reviewNum}</p>
                </div>
                &nbsp;
                <div>
                  <p className={styles.time}>{timeAgo(review.regiDate)}</p>
                </div>
              </div>
              <div
                className={styles.flex}
                style={{ gap: "10%", marginRight: "1vw" }}
              >
                <img
                  src={starr}
                  className={styles.starr}
                  alt="Rating Star"
                ></img>
                <p className={styles.rate}>{review.rate}</p>
              </div>
            </div>
            <div className={styles.commentBox}>
              <p className={styles.comment}>{review.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsComponent;
