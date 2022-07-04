import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/NavBar'
import AuthGuard from '../components/AuthGuard'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { setLoggedIn } from '../features/account/accountSlice'
import RoutesWrapper from '../components/RoutesWrapper'

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requiredAuth?: boolean
}

function MyApp(props: AppProps) {
  const { 
    Component,
    pageProps,
  } : {Component: NextApplicationPage; pageProps: any} = props;

  return (
    <Provider store={store}>
      <RoutesWrapper {...pageProps}>
        <NavBar/>
        <ToastContainer theme="colored" position="bottom-right"/>
        {Component.requiredAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ): (
          <Component {...pageProps} />
        )}
      </RoutesWrapper>
    </Provider>
  )
}

export default MyApp
