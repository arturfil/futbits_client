import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export default function AddMember() {
  return (
    <Container sx={{marginTop: 10}}>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{margin: '0 auto', }} variant="h4" fontWeight={600}>Add member</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: 5,
            justifyContent: "center",
            borderRadius: 3,
            minWidth: 400,
            maxWidth: 1000,
            margin: "20px auto",
            backgroundColor: "lightgrey"
          }}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Member</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="default" value={`default`} onChange={(e => console.log("test"))}/>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained">Add Member To Group</Button>
            </Grid>
          </Grid>
        </Grid>  
      </Grid>
    </Container>
  )
}
