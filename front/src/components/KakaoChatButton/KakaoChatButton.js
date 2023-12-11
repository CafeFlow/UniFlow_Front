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
      console.log("Kakao SDK is loaded.");
      try {
        window.Kakao.Channel.chat({
          channelPublicId: "_ibrXG", // Replace with your channel's public ID.
        });
      } catch (error) {
        console.error("Error in Kakao chat:", error);
      }
    } else {
      console.error("Kakao SDK is not loaded.");
    }
  };

  return <button onClick={kakaoChat} className={styles.button}></button>;
};

export default KakaoChatButton;
