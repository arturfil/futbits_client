import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getSingleGroup } from '../../features/groups/groupSlice'
import { getAllMembers } from '../../features/members/memberSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function Group() {
  const { members } = useAppSelector(state => state.members);
  const { singleGroup } = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query["id"];

  useEffect(() => {
    dispatch(getAllMembers(id))
    dispatch(getSingleGroup(id))
  }, [id])

  return (
    <Container sx={{marginTop: 10}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{singleGroup?.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Link href={`/groups/addmembers/${id}`}>
              <Button variant="contained">Add Member To Group</Button>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Member Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members && members?.map(mem => (
                    <TableRow key={mem.id}>
                      <TableCell>{mem.last_name} {mem.first_name}</TableCell>
                      <TableCell>{mem.member_type }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

    </Container>
  )
}