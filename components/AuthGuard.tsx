import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { setLogIn } from "../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.account);
  const router = useRouter();

  // const tkn = typeof window ? localStorage.getItem("jwt_gochi") : null;

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let tkn
    if (typeof window !== "undefined") {
     tkn = localStorage.getItem("jwt_gochi")
    }
    if (!tkn) { 
      console.log("No token!", tkn);
      router.push("/auth/login");
      return;
    }
    if (JSON.parse(tkn).token) {
        dispatch(setLogIn(true))
    }
  }

  return isLoggedIn ? <>{children}</> : null;
}
