import React from "react";
import styles from "./MembersList.module.css";

const MemberTag = ({ image, title, content }) => {
  return (
    <div className={styles.memberTag}>
      <div className={styles.memberTag__img}>
        <img src={image} alt="" />
      </div>
      <div className={styles.memberTag__text}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export const UserTag = ({ image, title, content }) => {
  return (
    <div className={styles.userTag}>
      <div className={styles.memberTag__img}>
        <img src={image} alt="" />
      </div>
      <div className={styles.memberTag__text}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

function MembersList() {
  return (
    <div className={styles.memberList}>
      <h1>Our Team</h1>
      <div className={styles.memberList__container}>
        <MemberTag
          image="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80"
          title="Andy Le"
          content="Java Developer"
        />
        <MemberTag
          image="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80"
          title="Hoang Pham"
          content="Backend Developer"
        />
        <MemberTag
          image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          title="Josh Huynh"
          content="Frontend Developer"
        />
        <MemberTag
          image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          title="Cody Cao"
          content="UI/UX Designer"
        />
      </div>
    </div>
  );
}

export default MembersList;
