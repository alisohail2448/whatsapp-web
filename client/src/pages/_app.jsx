import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers.js";
import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>Whatsapp</title>
        <link rel="short icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#111b21",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </StateProvider>
  );
}
