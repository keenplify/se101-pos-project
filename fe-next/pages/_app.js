import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;
