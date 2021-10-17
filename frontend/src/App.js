import { useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth, getIdToken } from "./firebase";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";

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
        <NavBar info={info} />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/me">
            <Profile me={true} />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
