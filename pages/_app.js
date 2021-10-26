import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar/>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
