import React from 'react';
import aboutimage from '../../images/about.jpeg';
import './About.css';

function About() {
  return (
    <div className='about'>
      <img className="about__image" src={aboutimage} alt="" />
      <div className='about__text'> 
        <h1>Learn more about us</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Quod eveniet a repellat tempore dolores, dolore quasi alias recusandae 
        amet doloribus est officiis natus rerum consequuntur corporis sunt 
        obcaecati unde eius!</p>
        <a href="#" className="about__btn">READ MORE</a>
      </div>
    </div>
  )
}

export default About
