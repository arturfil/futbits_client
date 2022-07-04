import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Button,
  Tooltip,
  Avatar,
  MenuItem,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLogOut } from "../features/account/accountSlice";

const pages = [
  { title: "Home", link: "/" },
  { title: "Games", link: "/games" },
  // { title: "Fields", link: "/fields" },
];
const settings = ["Profile", "Settings"];

export default function NavBar() {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.account);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const logOut = () => {
    localStorage.removeItem("jwt_gochi");
    dispatch(setLogOut());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <List>
                {pages.map((page) => (
                  <Grid key={page.link} item xs={12}>
                    <Link href={page.link}>
                      <Button
                        sx={{ color: "black" }}
                        onClick={handleCloseNavMenu}
                      >
                        {page.title}
                      </Button>
                    </Link>
                  </Grid>
                ))}
              </List>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}>
            <List sx={{display: "flex", justifyContent: 'space-evenly'}}>
              {pages.map((page) => (
                <Link style={{display: "flex", justifyContent: "space-evenly"}} key={page.link} href={page.link}>
                  <Button sx={{ color: "white", mx: 3, textTransform: "capitalize"}}>{page.title}</Button>
                </Link>
              ))}
            </List>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logOut}>
                    <ExitToAppIcon/> Log Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login">
                <Button
                  className="red-button"
                  variant="contained"
                >
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
