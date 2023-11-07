import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logOut } from "../features/account/accountSlice";

// import icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GrassIcon from "@mui/icons-material/Grass";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Item from "./Item";

interface Props {
  display: boolean;
  setDisplay: Function;
}

export default function SideNav({ display, setDisplay }: Props) {
  const [name, setName] = useState("Home");
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.account);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          backgroundImage: "linear-gradient(20deg, #517479, #293b5d)",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 3 }}>
          {display && (
            <Typography
              sx={{ color: "white" }}
              variant="h5"
              fontWeight={"bold"}
            >
              FutBit
            </Typography>
          )}
          {!display ? (
            <MenuOutlinedIcon
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => setDisplay(!display)}
            />
          ) : (
            <CloseIcon
              sx={{ color: "white", cursor: "pointer" }}
              onClick={() => setDisplay(!display)}
            />
          )}
        </Box>
        <Box sx={{ mx: display ? 5 : 2, mt: 2 }}>
          <Item
            display={display}
            title="Home"
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={name}
            setSelected={setName}
          />
          <Item
            display={display}
            title="Fields"
            to="/fields"
            icon={<GrassIcon />}
            selected={name}
            setSelected={setName}
          />
          <Item
            display={display}
            title="Profile"
            to={`/profile/${user?.id}`}
            icon={<AccountCircleIcon />}
            selected={name}
            setSelected={setName}
          />
          <Item
            display={display}
            title="Groups"
            to="/groups"
            icon={<GroupsIcon />}
            selected={name}
            setSelected={setName}
          />
          <Item
            display={display}
            title="Games"
            to="/games"
            icon={<SportsSoccerIcon />}
            selected={name}
            setSelected={setName}
          />
          {!isLoggedIn ? (
            <Item
              display={display}
              title="Login"
              to="/auth/login"
              icon={<LoginIcon />}
              selected={name}
              setSelected={setName}
            />
          ) : (
            <IconButton
              onClick={() => dispatch(logOut())}
              sx={{ color: "lightgrey" }}
            >
              <LogoutIcon />
              <Typography
                sx={{ display: display ? "flex" : "none", mt: 0.5, ml: 2 }}
              >
                {" "}
                Log Out
              </Typography>
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
}
