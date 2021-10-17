import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="main">
      <div className="name">
        <h2>Broaden Your</h2>
        <h1>
          <span>NetWorking</span> With Us
        </h1>
        <p className="details">Build your networking via excess swipes</p>
        <div className="header-btns">
          <Link to="/login" className="header-btn">
            Join Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
