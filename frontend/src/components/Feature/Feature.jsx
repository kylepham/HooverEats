import React from 'react';
import './Feature.css';
import FeatureBox from '../FeatureBox/FeatureBox';
import fimage1 from '../../images/handshake.svg';
import fimage2 from '../../images/graduation.svg';
import fimage3 from '../../images/work.svg';
import fimage4 from '../../images/books.svg';

function Feature() {
  return (
    <div className='features'>
      <h1>Benefits</h1>
      <div className='a__container'>
        <FeatureBox image={fimage1} title='Connect' content='Build up networking'/>
        <FeatureBox image={fimage2} title='Hack DePauw' content='Connect with upperclassmen'/>
        <FeatureBox image={fimage3} title='Work' content="Find internship's references"/>
        <FeatureBox image={fimage4} title='Study' content='Find study buddies'/>
      </div>
    </div>
  )
}

export default Feature
