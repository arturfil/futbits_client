import { Container, Grid, Paper, TableHead, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { getProfileFromUserId } from '../../features/profile/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function index() {
  const { profile } = useAppSelector(state => state.profile);
  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user?.id) return;
    dispatch(getProfileFromUserId(user?.id!))
  }, [user?.id])

  return (
    <Container sx={{marginTop: 10}}>
      
      <Typography variant="h4" fontWeight={600}>Your Profile</Typography>
      
      <Grid container component={Paper} sx={{padding: 2, marginTop: 5}}>
        <Grid xs={6}>Name: </Grid>
        <Grid xs={6}>
          <Typography>{user?.first_name}</Typography>
        </Grid>

        <Grid xs={6}>
          <Typography>Nationality:</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography> {profile?.nationality}</Typography>
        </Grid>

        <Grid xs={6}>
          <Typography>Age:</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography> {profile?.age}</Typography>
        </Grid>

        <Grid xs={6}>
          <Typography>Level:</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography> {profile?.level}</Typography>
        </Grid>
        
        <Grid xs={6}>
          <Typography>Gender:</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography> {profile?.gender}</Typography>
        </Grid>
        
        <Grid xs={6}>
          <Typography>Position:</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography> {profile?.position}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
