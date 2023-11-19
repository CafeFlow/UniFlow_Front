import { useEffect, useState } from "react";
import styles from "../InfoModal/InfoModal.module.css";

import seatRed from "../icons/seatRed.png";
import seatGreen from "../icons/seatGreen.png";
import seatYellow from "../icons/seatYellow.png";
import close from "../icons/close.png";

const InfoModal = () => {
  const [isclose, setIsClose] = useState(true);

  const handleClose = () => {
    setIsClose(false);
  };

  if (!isclose) return null; // isVisible이 false일 경우 null 반환하여 모달을 표시하지 않음

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <img src={seatGreen} className={styles.seat} />
        <p className={styles.percentage}>&nbsp;50% 이하</p>
      </div>
      <div className={styles.container2}>
        <img src={seatYellow} className={styles.seat} />
        <p className={styles.percentage}>&nbsp;50~79%이하</p>
      </div>
      <div className={styles.container2}>
        <img src={seatRed} className={styles.seat} />
        <p className={styles.percentage}>&nbsp;80% 이상</p>
      </div>
      <img src={close} className={styles.close} onClick={handleClose}></img>
    </div>
  );
};

export default InfoModal;
