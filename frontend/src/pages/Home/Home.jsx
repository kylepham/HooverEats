import Download from "../../components/Download/Download";
import Feature from "../../components/Feature/Feature";
import Header from "../../components/Header/Header";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";

export default function Home() {
  return (
    <div>
      <Header />
      <Feature />
      <Download />
      <About />
      <Contact />
    </div>
  );
}
