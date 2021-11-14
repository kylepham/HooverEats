import { useContext } from "react";
import { signIn } from "../../firebase";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const {
    user: { info },
  } = useContext(AuthContext);

  if (info) return <Redirect to="/" />;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>Login</div>
        <div className={styles.content}>
          <div>
            <button className={styles.btn} onClick={signIn}>
              <FontAwesomeIcon className={styles.login__icon} icon={faGoogle} />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
