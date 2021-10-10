import { useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { auth, getIdToken } from "./firebase";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

function App() {
  const {
    user: { info },
    dispatch,
  } = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch({
          type: "info",
          info: {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
          },
        });
        dispatch({
          type: "idToken",
          idToken: await getIdToken(),
        });
      } else {
        dispatch({
          type: "info",
          info: null,
        });
        dispatch({
          type: "idToken",
          idToken: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="nav-bar">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {info ? (
            <Link to="/me" className="nav-link">
              My profile
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          )}
          <Link to="/about" className="nav-link">
            About
          </Link>
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/me">
            <Profile me={true} />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
