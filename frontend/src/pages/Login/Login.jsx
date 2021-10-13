import { useContext } from "react";
// import { signIn } from "../../firebase";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import SignIn from "../../components/SignIn/SignIn"
// import axios from "axios";

export default function Login() {
  const {
    user: { info },
  } = useContext(AuthContext);

  if (info) return <Redirect to="/" />;

  return (
    <div>
      <SignIn />
    </div>
  );
}
