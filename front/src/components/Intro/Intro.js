import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";

import "../Intro/Intro.module.css";

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
    <div style={{ width: "100%", backgroundColor: "black" }}>
      {isHeaderVisible && <Header />}
    </div>
  );
};

export default Intro;
