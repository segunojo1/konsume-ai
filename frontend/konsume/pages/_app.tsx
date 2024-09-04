import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import { SetupProvider } from '../context/SetupContext';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from "next/router";
import nProgress from "nprogress";
import '../styles/nprogress.css';
import { MainLayoutContextProvider } from "@/context/LayoutContext";
import { ChatBotContextProvider } from "@/context/ChatBotContext";
import { MealsContextProvider } from "@/context/MealsContext";
import { DashboardContextProvider } from "@/context/DashboardContext";
import { ScannerContextProvider } from "@/context/ScannerContext";
import { TimetableProvider } from "@/context/TimetableContext";
import { BlogContextProvider } from "@/context/BlogContext";

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
    <BlogContextProvider>
      <TimetableProvider>
        <SetupProvider>
          <DashboardContextProvider>
            <MealsContextProvider>
              <ScannerContextProvider>
                <ChatBotContextProvider>
                  <MainLayoutContextProvider>
                    <AnyComponent {...pageProps} />
                  </MainLayoutContextProvider>
                </ChatBotContextProvider>
              </ScannerContextProvider>
            </MealsContextProvider>
          </DashboardContextProvider>
        </SetupProvider>
      </TimetableProvider>
      </BlogContextProvider>
      <ToastContainer />
    </>
  )
}
