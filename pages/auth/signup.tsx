import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState, MouseEvent } from 'react'
import { setUser, signupUser } from '../../features/account/accountSlice'
import { useAppDispatch } from '../../store/hooks'

export default function Signup() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  })

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(signupUser(user));
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
          Sign Up
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
            <TextField
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
              fullWidth
              label="first name"
              type="text"
              placeholder="first name"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setUser({ ...user, last_name: e.target.value })}
              fullWidth
              label="last name"
              type="text"
              placeholder="last name"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth onClick={handleSubmit} variant="contained">
              Sign Up
            </Button>
          </Grid>
          
          <Grid  item xs={6}>
            <Typography>
              Already have an account?
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography color="blue">
              <Link href="/auth/login" style={{color: "blue!important", textDecoration: 'underline'}}>Sign In here! </Link>
            </Typography>
          </Grid>

        </Grid>
      </Grid>
    </Container>
  )
}
