import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"

function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className="footer__icons">
          <FontAwesomeIcon className='footer__icon' icon={faTwitter}/>
          <FontAwesomeIcon className='footer__icon' icon={faFacebook}/>
          <FontAwesomeIcon className='footer__icon' icon={faInstagram}/>
        </div>
        <div className="footer__copyright">
          <p>© Copyright 2021 HooverEats</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
