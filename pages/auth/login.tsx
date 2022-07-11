import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState, MouseEvent } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(loginUser({email: user.email, password: user.password}));
    setUser({
      email: "",
      password: ""
    })
    router.push("/")
  }

  return (
    <Container sx={{ marginTop: 20 }}>
      <Grid
        sx={{
          padding: 5,
          maxWidth: 500,
          width: 500,
          justifyContent: "center",
          margin: "0 auto",
          borderRadius: 4,
          backgroundColor: "lightgrey",
        }}
      >
        <Typography sx={{ fontWeight: 600, marginBottom: 2 }} variant="h4">
          Login
        </Typography>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
              label="email"
              placeholder="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              fullWidth
              label="password"
              type="password"
              placeholder="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth onClick={handleSubmit} variant="contained">
              Login
            </Button>
          </Grid>
          
          <Grid  item xs={6}>
            <Typography>
              Dont have an account yet?  
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography color="blue">
              <Link href="/auth/signup" style={{color: "blue!important", textDecoration: 'underline'}}>Sign up here! </Link>
            </Typography>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  );
}
