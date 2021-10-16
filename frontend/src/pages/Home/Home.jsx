import { useContext, useEffect } from "react";
import Download from "../../components/Download/Download";
import Feature from "../../components/Feature/Feature";
import Header from "../../components/Header/Header";
import { AuthContext } from "../../contexts/AuthContext";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";


export default function Home() {
  const {
    user: { info },
  } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <div>
      {/* <NavBar info={info} /> */}
      <Header/>
      {/* {info && <h2>You're logged in. Your name is {info.name}</h2>} */}
      <Feature />
      <Download/>
      <About/>
      <Contact/>
    </div>
  );
}
