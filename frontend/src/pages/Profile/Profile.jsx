import { useContext } from "react";
import { signOut } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router";
import styles from './Profile.module.css';

export default function Profile({ me }) {
  const {
    user: { info },
  } = useContext(AuthContext);

  if (!info) return <Redirect to="/" />;

  return (
    <div>   
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <img src={info.photo} alt="" />
        </div>
        <div className={styles.profile__bio}>
          <h1>Josh Huynh</h1>
          <div className={styles.profile__info}>
            <p>Major: <span>Computer Science</span></p>
            <p>Hobbies: <span>Hoang Pham and Andy Le</span></p>
            <p>Available Swipes: <span>5</span></p>
          </div>
        </div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
