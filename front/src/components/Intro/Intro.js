import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import intro from "../icons/Intro.png";
import styles from "../Intro/Intro.module.css";

const Intro = () => {
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setIsHeaderVisible(false);

    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* {isHeaderVisible && <Header />} */}
      <img src={intro} className={styles.logo}></img>
    </div>
  );
};

export default Intro;
