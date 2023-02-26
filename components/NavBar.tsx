import React, {  } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";

// icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOutlineIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlineIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { setLogIn } from "../features/account/accountSlice";

interface Props {
  display: boolean
  setDisplay: Function
}

export default function NavBar({display, setDisplay}: Props) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.account);
  

  const logOut = () => {
    localStorage.removeItem("jwt_gochi");
    dispatch(setLogIn(false));
  };

  return (
    <Box 
      className="menu"
      sx={{display: "flex", 
        justifyContent: "end",
        padding: 2
        }}
    > 
      <Box sx={{display:"flex", }}>
        <IconButton>
          {/* {themeColor === "dark" ? (
            <LightModeOutlinedIcon/>
            ): (
            <DarkModeOutlinedIcon/>
          )} */}
        </IconButton>
        <IconButton>
          <NotificationsOutlineIcon/>
        </IconButton>
        <IconButton>
          <SettingsOutlineIcon/>
        </IconButton>
        <IconButton>
          <PersonOutlineIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}
