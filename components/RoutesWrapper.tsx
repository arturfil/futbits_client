import React, { useEffect } from "react";
import { getUserByToken, setLogIn } from "../features/account/accountSlice";
import { useAppDispatch } from "../store/hooks";

export default function RoutesWrapper({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tkn = localStorage.getItem("jwt_gochi");
    if (!tkn) return;
    
    if (JSON.parse(tkn).token) {
      dispatch(setLogIn(true));
      dispatch(getUserByToken());
    }
  }, []);

  return <>{children}</>;
}
