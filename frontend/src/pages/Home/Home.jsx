import { useContext, useEffect } from "react";
// import styles from "./Home.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Home() {
  const {
    user: { info },
  } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Thí í homepage</h1>
      {info && <h2>You're logged in. Your name is {info.name}</h2>}
    </div>
  );
}
