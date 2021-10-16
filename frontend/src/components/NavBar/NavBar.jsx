import React, { useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default function NavBar({ info }) {
  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <nav className={`${styles.nav} ${nav ? styles.active : ""}`}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="" />
      </Link>
      <ul className={styles.menu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {!info && (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
        {info && (
          <li>
            <Link to="/me">My Profile</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
