import "../styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
