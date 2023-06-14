import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Input from "@mui/joy/Input";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState, MouseEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../features/account/accountSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, errors } = useAppSelector((state) => state.account);
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(loginUser({ email: user.email, password: user.password }));
    setUser({
      email: "",
      password: "",
    });
    router.push("/");
  }

  return (
    <div className="login-body">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="submit" style={{ display: "none" }} />
        <Container sx={{ paddingTop: "100px" }}>
          <Grid
            className="login-container"
            container
            spacing={3}
            sx={{
              backgroundColor: "lightgrey",
              maxWidth: "600px",
              pr: 10,
              pt: 3,
              pb: 5,
              pl: 7,
              borderRadius: 2,
              m: "0 auto",
            }}
          >
            {errors.length > 0 && (
              <Grid item xs={12}>
                <Alert severity="error">{errors}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography
                className="title"
                sx={{ m: "20px auto 0 auto", fontWeight: 600 }}
                variant="h3"
              >
                Sign In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                value={user.email}
                type="text"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="login-input"
                placeholder="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="login-input"
                placeholder="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth className="button">
                Login
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Don't have an account yet? 
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                color={'blue'}
              >
                <Link
                  href="/auth/signup"
                  style={{
                    textDecoration: "underline",
                    color: "blue"
                  }}
                >
                  Sign Up here!
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
}
