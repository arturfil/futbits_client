import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { getAllFields } from '../../features/fields/fieldSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function index() {
    const dispatch = useAppDispatch();
    const { fields } = useAppSelector(state => state.field);

    useEffect(() => {
        dispatch(getAllFields())
    }, [])

  return (
    <Container sx={{marginTop: 10}}>
        <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
            <Link href="/fields/createfield">
                <Button variant="contained">Create Field</Button>
            </Link>
        </Grid>
        <Typography sx={{fontWeight: 600}} variant="h4">Fields</Typography>
        { fields ? (
            fields?.map(field => (
                <Typography key={field.id}>{field.name}</Typography>
            ))) : (
                <Typography>No Fields Created Yet</Typography>
            )
        }
    </Container>
  )
}
