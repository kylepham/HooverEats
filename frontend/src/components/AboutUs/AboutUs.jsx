import React from 'react';
import aboutimage from '../../images/about.jpeg';
import styles from './AboutUs.module.css';

function About() {
  return (
    <div className={styles.about}>
      <img className={styles.about__image} src={aboutimage} alt="" />
      <div className={styles.about__text}> 
        <h1>About Us</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Quod eveniet a repellat tempore dolores, dolore quasi alias recusandae 
        amet doloribus est officiis natus rerum consequuntur corporis sunt 
        obcaecati unde eius!</p>
        <a href="/about" className={styles.about__btn}>READ MORE</a>
      </div>
    </div>
  )
}

export default About
