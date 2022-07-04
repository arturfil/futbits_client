import { Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { setLoggedIn } from '../features/account/accountSlice'
import { useAppDispatch } from '../store/hooks'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <Container sx={{marginTop: 10}}>
      <Typography sx={{fontWeight: 600}} variant="h4">Home Page</Typography>
    </Container>
  )
}

export default Home
