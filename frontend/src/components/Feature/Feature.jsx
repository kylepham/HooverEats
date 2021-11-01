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
      <h1>Features</h1>
      <div className='a-container'>
        <FeatureBox image={fimage1} title='Cheap' content=''/>
        <FeatureBox image={fimage2} title='Savings' content=''/>
        <FeatureBox image={fimage3} title='Cheap' content=''/>
        <FeatureBox image={fimage4} title='Share' content=''/>
      </div>
    </div>
  )
}

export default Feature
