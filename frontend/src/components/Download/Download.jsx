import React from "react";
import './Download.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons"


function Download() {
  return (
    <div className="download">
      <div className="dl__heading">
        <h1>
          Available on <span>IOS</span> and <span>Android</span>
        </h1>
        <p className="details">Download Apps on your phone</p>
        <div className="dl__btns">
          <a href="#" className="dl__btn1">
          <FontAwesomeIcon className='dl__icon' icon={faApple}/>  Download
          </a>
          <a href="#" className="dl__btn2">
          <FontAwesomeIcon className='dl__icon' icon={faGooglePlay}/> Download
          </a>
      </div>
      </div>
    </div>
  );
}

export default Download;
