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
import MenuIcon from "@mui/icons-material/Menu";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLogOut } from "../features/account/accountSlice";

const pages = [
  { title: "Home", link: "/" },
  { title: "Games", link: "/games" },
  { title: "Fields", link: "/fields"},
  { title: "Groups", link: "/groups"}
];
const settings = [
  {title: "Profile", link: "/profile"}, 
  {title: "Settings", link: "/settings"}
];

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
    <AppBar position="static" sx={{backgroundColor: '#fafafa', width: "100vw", color: "black"}}>
      <Container fixed>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <SportsSoccerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: 'black'}} />
          <Box sx={{display: {xs: 'none'}}}>
            <Typography
              variant="h6"
              noWrap
              color="black"
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: 'none',
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              FutBit
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              color: "black",
              textDecoration: "none",
            }}
          >
            FutBit
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }}}>
            <List sx={{display: "flex", justifyContent: 'space-evenly'}}>
              {pages.map((page) => (
                <Link style={{display: "flex", justifyContent: "space-evenly"}} key={page.link} href={page.link}>
                  <Button sx={{ color: "black", mx: 3, textTransform: "capitalize"}}>{page.title}</Button>
                </Link>
              ))}
            </List>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon sx={{ color: "black" }} />
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
                    <MenuItem key={setting.link} onClick={handleCloseUserMenu}>
                      <Typography component={Link} href={setting.link} textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logOut}>
                    <ExitToAppIcon/> Log Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/auth/login">
                <Button
                  className="red-button"
                  variant="contained"
                  sx={{color: 'black', textTransform: 'capitalize'}}
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
