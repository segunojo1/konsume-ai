import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import { SetupProvider } from '../context/SetupContext';

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
