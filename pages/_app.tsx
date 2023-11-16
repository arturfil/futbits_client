import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import AuthGuard from "../components/AuthGuard";
import { NextPage } from "next";
import RoutesWrapper from "../components/RoutesWrapper";
import { Box } from "@mui/material";
import SideNav from "../components/SideNav";
import { useState } from "react";

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requiredAuth?: boolean;
};

function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <RoutesWrapper {...pageProps}>
        <ToastContainer theme="colored" position="bottom-right" />
        <Box sx={{ display: "flex", flexDirection: "row", mb: "20px", position: "-webkit-sticky", top: "0",}}>
          <Box
            className={!display ? "sidebar-seen sidebar" : "sidebar"}
            sx={{ width: display ? "258px" : "70px", position: "sticky", top: "0"}}
          >
            <SideNav display={display} setDisplay={setDisplay} />
          </Box>
          <Box sx={{ flex: "258px" }}>
            <NavBar display={display} setDisplay={setDisplay} />
            <>
              {Component.requiredAuth ? (
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
              ) : (
                <Component {...pageProps} />
              )}
            </>
          </Box>
        </Box>
      </RoutesWrapper>
    </Provider>
  );
}

export default MyApp;
