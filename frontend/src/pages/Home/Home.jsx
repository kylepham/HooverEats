import Download from "../../components/Download/Download";
import Feature from "../../components/Feature/Feature";
import Header from "../../components/Header/Header";
import About from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Feature />
      <Download />
      <About />
      <Footer />
    </div>
  );
}
