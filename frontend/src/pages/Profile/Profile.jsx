import { useContext } from "react";
import { signOut } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { Redirect } from "react-router";

export default function Profile({ me }) {
  const {
    user: { info },
  } = useContext(AuthContext);

  if (!info) return <Redirect to="/" />;

  return (
    <div>
      <p>Hle</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
