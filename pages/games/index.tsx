import { Container, Typography } from '@mui/material'
import React from 'react'

export default function index() {
  return (
    <Container sx={{marginTop: 20}}>
        <Typography variant="h4">
            Soccer Games
        </Typography>
    </Container>
  )
}

index.requiredAuth = true;