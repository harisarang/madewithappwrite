import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
