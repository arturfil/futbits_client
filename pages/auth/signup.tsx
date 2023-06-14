import { Input } from "@mui/joy";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState, MouseEvent, FormEvent } from "react";
import { setUser, signupUser } from "../../features/account/accountSlice";
import { useAppDispatch } from "../../store/hooks";

export default function Signup() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(signupUser(user));
  }

  return (
    <div className="login-body">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="submit" style={{ display: "none" }} />
        <Container sx={{ paddingTop: "100px"}}>
          <Grid
            className="login-container"
            container
            spacing={3}
            sx={{
              backgroundColor: "lightgrey",
              maxWidth: "600px",
              pr: 10,
              pl: 7,
              py: 5,
              borderRadius: 2,
              m: "0 auto",
            }}
          >
            <Typography sx={{ fontWeight: 600, marginBottom: 2 }} variant="h3">
              Sign Up
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input
                  sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type="password"
                  placeholder="password"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                  value={user.first_name}
                  type="text"
                  placeholder="first name"
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                  value={user.last_name}
                  fullWidth
                  type="text"
                  placeholder="last name"
                />
              </Grid>

              <Grid item xs={12}>
                <Button className="button" fullWidth type="submit">
                  Sign Up
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Typography>Already have an account?</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                    color={'blue'}
                >
                  <Link
                    href="/auth/login"
                    style={{
                      color: "rgb(00,50,189)",
                      textDecoration: "underline",
                    }}
                  >
                    Sign In here!
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
}
