import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  return (
    <SSRProvider>
      <CookiesProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CookiesProvider>
    </SSRProvider>
  );
}

export default MyApp;
