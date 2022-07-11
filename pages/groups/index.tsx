import { Button, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { getAllGroups } from '../../features/groups/groupSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function index() {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector(state => state.groups);
  
  useEffect(() => {
    dispatch(getAllGroups())
  }, [])

  return (
    <Container sx={{marginTop: 10}}>
      <Typography variant="h4" sx={{fontWeight: 600, marginBottom: 3}}>Groups where you belong</Typography>
      <Grid container spacing={3}>
        {groups?.map((group) => (
          <Grid key={group.id} item xs={4} md={4} lg={3}>
            <Paper
              elevation={1}
              key={group.id}
              sx={{
                backgroundColor: "#1a82af",
                minHeight: 140,
                borderRadius: 2,
                minWidth: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container sx={{ padding: 4 }}>
                <Grid xs={12}>
                  <Typography color={`white`} fontWeight={600}>
                    {group.name}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid sx={{marginTop: 3}}>
        <Link href="/groups/createGroup">
          <Button sx={{borderRadius: 5}} variant="contained">Create Group</Button>
        </Link>
      </Grid>
    </Container>
  )
}
