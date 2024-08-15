import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import { SetupProvider } from '../context/SetupContext';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from "next/router";
import nProgress from "nprogress";
import '../styles/nprogress.css';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
    <SetupProvider>
      <AnyComponent {...pageProps} />
    </SetupProvider>
    <ToastContainer />
    </>
  ) 
}
