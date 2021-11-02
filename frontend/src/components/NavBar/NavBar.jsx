
import React, {useState} from 'react';
import './NavBar.css';
import logo from '../../images/logo.png';
import {Link} from 'react-router-dom';

export default function NavBar({ info }) {

  const [nav, setNav] = useState(false);

  const changeBackground = () => {
    if(window.scrollY >=50){
      setNav(true);
    }
    else{
      setNav(false);
    }
  }
  console.log(info)
  window.addEventListener('scroll', changeBackground);
  return (
    <nav className={ nav ? 'nav active' : 'nav'}>
      <Link to='/' className='logo'>
        <img src={logo} alt="" />
      </Link>
      <input className='menu__btn' type="checkbox" id='menu-btn'/>
      <label className='menu__icon' for='menubtn'>
        <span className='nav__icon'></span>
      </label>
      <ul className='menu'>
        <li><Link to='/' smooth={true} duration='1000'>Home</Link></li>
        <li><Link to='/about' smooth={true} duration='1000'>About</Link></li>
        <li><a href='#contact__section' behavior='smooth' duration='5000'>Contact</a></li>
        {!info && <li><Link to='/login' smooth={true} duration='1000'>Sign in</Link></li>}
        {info && <li><Link to='/me' smooth={true} duration='1000'>My Profile</Link></li>}
      </ul>
    </nav>
  )
}
