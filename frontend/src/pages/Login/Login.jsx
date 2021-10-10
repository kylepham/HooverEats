import { useContext } from "react";
import { signIn } from "../../firebase";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
// import axios from "axios";

export default function Login() {
  const {
    user: { info },
  } = useContext(AuthContext);

  if (info) return <Redirect to="/" />;

  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}
