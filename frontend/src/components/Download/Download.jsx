import React from "react";
import styles from "./Download.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

function Download() {
  return (
    <div className={styles.dl__heading}>
      <h1>
        Available on <span>IOS</span> and <span>Android</span>
      </h1>
      <p className={styles.details}>Download Apps on your phone</p>
      <div className={styles.dl__btns}>
        <a href="#" className={styles.dl__btn1}>
          <FontAwesomeIcon className={styles.dl__icon} icon={faApple} />{" "}
          Download
        </a>
        <a href="#" className={styles.dl__btn2}>
          <FontAwesomeIcon className={styles.dl__icon} icon={faGooglePlay} />{" "}
          Download
        </a>
      </div>
    </div>
  );
}

export default Download;
