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
  const [display, setDisplay] = useState<boolean>(false);

  const toggleMenu = () => setDisplay(!display);

  const logOut = () => {
    localStorage.removeItem("jwt_gochi");
    dispatch(setLogOut());
  };

  return (
    <Grid
      xs={ display ? 3 : 0}
      sx={{
        px: 3,
        backgroundColor: "#1a82af",
        height: "100vh",
        color: "white",
        fontWeight: 600,
      }}
    >
      <MenuIcon onClick={toggleMenu} />
      <Grid style={{ display: display ? "flex" : "none" }} 
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
