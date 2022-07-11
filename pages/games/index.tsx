import { Container, Typography } from '@mui/material'
import React from 'react'

export default function index() {
  return (
    <Container sx={{marginTop: 10}}>
        <Typography sx={{fontWeight: 600}} variant="h4">
            Soccer Games
        </Typography>
    </Container>
  )
}

index.requiredAuth = true;