import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.header__container}>
      <div className={styles.header}>
        <h2>Broaden Your</h2>
        <h1>
          <span className="neonText">Networking</span> With Us
        </h1>
        <p className={styles.details}>Build your network via excess swipes</p>
        <Link to="/login" className={styles.header__btn}>
          Join Us
        </Link>
      </div>
    </div>
  );
}

export default Header;
