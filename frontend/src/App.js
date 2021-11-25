import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase";
import { AuthContext } from "./contexts/AuthContext";
import { SocketContext } from "./contexts/SocketContext";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import Chat from "./pages/Chat/Chat";
import {
  getLocalStorage,
  setLocalStorage,
  postAuthInfo,
  getProfile,
} from "./utils";

function App() {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { socketConnected } = useContext(SocketContext);

  useEffect(() => {
    const updateAuthData = (userInfo) => {
      setUserInfo(userInfo);
    };

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (getLocalStorage("uid") !== user.uid)
          setLocalStorage("uid", user.uid);
        await postAuthInfo().then(async () => {
          updateAuthData(await getProfile());
        });
      } else {
        if (getLocalStorage("uid") !== "") setLocalStorage("uid", "");
        updateAuthData(null);
      }
    });
  }, []);

  if (!socketConnected) return <div style={{ color: "white" }}>Nosocket</div>;

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/chat">
          <Chat />
        </Route>

        <Route exact path="/me">
          <Profile />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/contact">
          <Contact />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
