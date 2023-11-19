import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CafeFlow from "../icons/CafeFlow.png";
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
    <div className={styles.container}>
      <img src={CafeFlow} className={styles.logo}></img>
      <p className={styles.uniflow}>Uni.flow</p>
    </div>
  );
};

export default Intro;
