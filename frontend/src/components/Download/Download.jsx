import React from "react";
import './Download.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Download() {
  return (
    <div className="download">
      <div className="dl-heading">
        <h1>
          Available on <span>IOS</span> and <span>Android</span>
        </h1>
        <p className="details">Download Apps on your phone</p>
        <div className="dl-btns">
          <a href="#" className="dl-btn1">
          <FontAwesomeIcon icon={['fab', 'fa-apple']} />  Download
          </a>
          <a href="#" className="dl-btn2">
          <FontAwesomeIcon icon={['fab', 'fa-google-play']} />Download
          </a>
      </div>
      </div>
    </div>
  );
}

export default Download;
