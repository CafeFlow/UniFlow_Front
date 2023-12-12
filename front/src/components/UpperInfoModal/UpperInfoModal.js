import { useEffect, useState } from "react";
import circle from "../icons/circle.png";
import closeicon from "../icons/close.png";

const UpperInfoModal = () => {
  const [isclose1, setIsClose1] = useState(true);

  const handleClose = () => {
    setIsClose1(false);
  };

  if (!isclose1) return null; // isVisible이 false일 경우 null 반환하여 모달을 표시하지 않음

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "10%",
        justifyContent: "space-around",
        // position: "fixed",
        // top: "14vh",
        backgroundColor: "white",
        zIndex: "2",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={circle} style={{ width: "6vw", height: "auto" }} />
        <p style={{ marginLeft: "2vw" }}>아이콘을 눌러 인원수를 확인하세요!</p>
      </div>
      <img
        src={closeicon}
        style={{ width: "auto", height: "3vh" }}
        onClick={handleClose}
      />
    </div>
  );
};

export default UpperInfoModal;
