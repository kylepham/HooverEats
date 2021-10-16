import React from 'react'
import aboutimage from '../../images/about.png'

function About() {
  return (
    <div className='about'>
      <div className="about-image">
        <img src={aboutimage} alt="" />
      </div>
      <div className='about-text'> 
        <h1>Learn more about us</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Quod eveniet a repellat tempore dolores, dolore quasi alias recusandae 
        amet doloribus est officiis natus rerum consequuntur corporis sunt 
        obcaecati unde eius!</p>
        <button>READ MORE</button>
      </div>
    </div>
  )
}

export default About
