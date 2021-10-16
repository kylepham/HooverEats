import React from 'react'
// import './Header.css';

function Header() {
  return (
    <div className='main'>
      <div className='name'>
        <h2>Broaden Your</h2>
        <h1><span>NetWorking</span> With Us</h1>
        <p className='details'>Build your networking via excess swipes</p>
        <div className='header-btns'>
          <a href="../../pages/Login/Login.jsx" className='header-btn'>Join Us</a>
        </div>
      </div>
    </div>
  )
}

export default Header
