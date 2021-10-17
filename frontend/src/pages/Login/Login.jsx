import { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import SignIn from "../../components/SignIn/SignIn";

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
