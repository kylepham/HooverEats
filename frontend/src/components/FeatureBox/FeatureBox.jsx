import React from 'react';
import './FeatureBox.css';

function FeatureBox(props) {
  return (
    <div className='a__box'>
      <div className="a__b-img">
        <img src={props.image} alt="" />
      </div>
      <div className="a__b-text">
        <h2>{props.title}</h2>
        <p>{props.content}</p>
      </div>
    </div>
  )
}

export default FeatureBox
