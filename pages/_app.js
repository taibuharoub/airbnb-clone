import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import "../styles/globals.css";

// show a progress bar when the page is loading or when we change routes(pages)
const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50", //give it a z-index of 50 so that its always on top
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
