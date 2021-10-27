import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
      <Footer />
    </div>
  );
}

export default MyApp;
