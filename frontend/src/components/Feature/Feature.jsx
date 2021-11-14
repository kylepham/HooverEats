import React from "react";
import styles from "./Feature.module.css";
import fimage1 from "../../images/handshake.svg";
import fimage2 from "../../images/graduation.svg";
import fimage3 from "../../images/work.svg";
import fimage4 from "../../images/books.svg";

const FeatureBox = ({ image, title, content }) => {
  return (
    <div className={styles.featureBox}>
      <div className={styles.featureBox__img}>
        <img src={image} alt="" />
      </div>
      <div className={styles.featureBox__text}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

function Feature() {
  return (
    <div className={styles.features}>
      <h1>Benefits</h1>
      <div className={styles.features__container}>
        <FeatureBox
          image={fimage1}
          title="Connect"
          content="Build up networking"
        />
        <FeatureBox
          image={fimage2}
          title="Hack DePauw"
          content="Connect with upperclassmen"
        />
        <FeatureBox
          image={fimage3}
          title="Work"
          content="Find internship's references"
        />
        <FeatureBox
          image={fimage4}
          title="Study"
          content="Find study buddies"
        />
      </div>
    </div>
  );
}

export default Feature;
