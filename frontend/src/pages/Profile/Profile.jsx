import { useContext, useEffect, useState } from "react";
import { signOut } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";
import { Redirect } from "react-router";
import styles from "./Profile.module.css";
import { getProfile } from "../../utils";

export default function Profile() {
  const {
    user: { info },
  } = useContext(AuthContext);
  const { socketConnected } = useContext(SocketContext);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const test = async () => {
      setUserInfo(await getProfile());
    };

    test();
  }, []);

  const onChange = (e) => {
    if (e.target.checked) setUserInfo({ ...userInfo, type: e.target.value });
  };

  if (!socketConnected) return <Redirect to="/" />;

  return (
    <div>
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <img src={info.photo} alt="" />
          <p className={styles.profile__badge}>
            {userInfo?.gradYear ? "STUDENT" : "FALCUTY"}
          </p>
        </div>
        <div className={styles.profile__bio}>
          <h1>{userInfo?.name}</h1>
          <div className={styles.profile__info}>
            <p>
              Class: <span>{userInfo?.gradYear}</span>
            </p>
            <p>
              Major: <span>{userInfo?.major || "null"}</span>
            </p>
            <p>
              Hobbies: <span>Hoang Pham and Andy Le</span>
            </p>
          </div>
          <div className={styles.profile__status}>
            <p>Current Status: </p>
            <div>
              <input
                type="radio"
                id="giver"
                name="status"
                value="GIVER"
                checked={userInfo?.type === "GIVER"}
                onChange={onChange}
              />
              <label htmlFor="giver">Giver</label>
            </div>
            <div>
              <input
                type="radio"
                id="receiver"
                name="status"
                value="RECEIVER"
                checked={userInfo?.type === "RECEIVER"}
                onChange={onChange}
              />
              <label htmlFor="receiver">Receiver</label>
            </div>
            <div>
              <input
                type="radio"
                id="neither"
                name="status"
                value="NEITHER"
                checked={userInfo?.type === "NEITHER"}
                onChange={onChange}
              />
              <label htmlFor="neither">Neither</label>
            </div>
          </div>
          <div className={styles.profile__update}>
            <button type="submit">Update My Status</button>
            <p>5 times left</p>
          </div>
        </div>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
