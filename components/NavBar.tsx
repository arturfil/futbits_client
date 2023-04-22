import React from "react";
import { Box, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";

// icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlineIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlineIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import { setLogIn } from "../features/account/accountSlice";

interface Props {
  display: boolean;
  setDisplay: Function;
}

export default function NavBar({ display, setDisplay }: Props) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.account);

  const logOut = () => {
    localStorage.removeItem("jwt_gochi");
    dispatch(setLogIn(false));
  };

  return (
    <Box
      className="topbar"
      sx={{ display: "flex", justifyContent: "start", padding: 2 }}
    >
      <MenuOutlinedIcon
        sx={{ color: "#6d6d6d" }}
        className="menu"
        onClick={() => setDisplay(!display)}
      />
    </Box>
  );
}
