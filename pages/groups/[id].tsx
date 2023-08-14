import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getSingleGroup } from '../../features/groups/groupSlice'
import { getAllMembers } from '../../features/members/memberSlice'
import { getAllReportsOfGroup } from '../../features/reports/reportsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function Group() {
  const { members } = useAppSelector(state => state.members);
  const { reports } = useAppSelector(state => state.report);
  const { singleGroup } = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query["id"];

  useEffect(() => {
    if (!id) return;
    dispatch(getAllMembers(id))
    dispatch(getSingleGroup(id))
    dispatch(getAllReportsOfGroup(id))
  }, [id, dispatch])

  return (
    <Container sx={{marginTop: 10}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{singleGroup?.name}</Typography>
          </Grid>

          <Grid item xs={6} sx={{display: 'flex', justifyContent: "flex-start"}}>
            <Link href={`/games/creategame/${id}`}>
              <Button 
                variant="contained" 
                disableElevation 
                sx={{
                    mr: 1, borderRadius: 8,
                    backgroundImage: "linear-gradient(90deg, #ffaa66, #ffaa00)"
                }}>
                  Create Games
              </Button>
            </Link>

          </Grid>
          <Grid item xs={6} sx={{display: 'flex', justifyContent: "flex-end"}}>
            <Link href={`/reports/addreports/${id}`}>
              <Button variant="contained" disableElevation sx={{
                mr: 1, borderRadius: 8,
                backgroundColor: "#1bcab6"
              }}>Create Report</Button>
            </Link>
            <Link href={`/groups/addmembers/${id}`}>
              <Button variant="contained" disableElevation 
                sx={{
                    borderRadius: 8,
                    backgroundColor: "#1bcab6"
              }}>Add Member To Group</Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <TableContainer 
              component={Paper} 
              elevation={0} 
              sx={{border: '1px solid lightgrey'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" 
                        fontSize={16} fontWeight={600}>Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" 
                        fontSize={16} fontWeight={600}>Member Type</Typography>
                    </TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members && members?.map(mem => (
                    <TableRow key={mem.id}>
                      <TableCell>{mem.first_name} {mem.last_name}</TableCell>
                      <TableCell>{mem.member_type }</TableCell>
                      <TableCell>
                        <Link href={`/profile/${mem?.user_id}`}>
                          <Button sx={{
                            backgroundColor: "#1bcab6"
                          }} variant="contained" disableElevation>View Player</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {JSON.stringify(reports)}
          </Grid>
        </Grid>

    </Container>
  )
}
