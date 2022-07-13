import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLogOut } from "../features/account/accountSlice";

export default function SideNav() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(state => state.account);
  const [display, setDisplay] = useState<boolean>(true);

  const toggleMenu = () => setDisplay(!display);

  const logOut = () => {
    localStorage.removeItem("jwt_gochi");
    dispatch(setLogOut());
  };

  return (
    <Grid
      item
      xs={ display ? 6 : 0}
      md={ display ? 2 : 0}
      sx={{
        py: 3,
        px: 3,
        display: {xs: 6, md: 2},
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        boxShadow: "0 2px 2px 2px lightgrey",
        fontWeight: 600,
      }}
    >
      <MenuIcon sx={{color: "white"}} onClick={toggleMenu} />
      <Grid style={{ display: display ? "flex" : "none", margin: "0 auto" }} 
        sx={{flexDirection: 'column'}}
      >
        <Grid
          sx={{
            display: 'flex',
            margin: "20px 0",
            justifyContent: "left",
          }}
          item
        >
          <Link href="/">Home</Link>
        </Grid>
        <Grid
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "left",
          }}
          item
        >
          <Link href="/groups">Groups</Link>
        </Grid>
        <Grid
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "left",
          }}
          item
        >
          <Link href="/games">Games</Link>
        </Grid>
        <Grid
          sx={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "left",
          }}
          item
        >
        { loggedIn ? (
          <Grid onClick={logOut} sx={{ 
            cursor: "pointer", 
            display: "block",
          }}>
              <ExitToAppIcon />
          </Grid>

        ) : (
          <Grid>
            <Link href="/auth/login">
              <Button className="red-button" variant="contained">Log In</Button>
            </Link>
          </Grid>  
        )

        }
        </Grid>
      </Grid>
    </Grid>
  );
}
