import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.footer__icons}>
          <FontAwesomeIcon className={styles.footer__icon} icon={faTwitter} />
          <FontAwesomeIcon className={styles.footer__icon} icon={faFacebook} />
          <FontAwesomeIcon className={styles.footer__icon} icon={faInstagram} />
        </div>
        <div className={styles.footer__copyright}>
          <p>© Copyright 2021 HooverEats</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
