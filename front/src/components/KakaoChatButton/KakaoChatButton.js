import { useEffect } from "react";
import styles from "../KakaoChatButton/KakaoChatButton.module.css";

const KakaoChatButton = () => {
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
  return <button onClick={kakaoChat} className={styles.button}></button>;
};

export default KakaoChatButton;
