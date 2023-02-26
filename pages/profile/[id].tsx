import {
    Button,
    Container,
    Grid,
    Paper,
    TableHead,
    Typography,
  } from "@mui/material";
  import Link from "next/link";
import { useRouter } from "next/router";
  import React, { useEffect } from "react";
  import DataCard from "../../components/DataCard";
  import ReportTile from "../../components/ReportTile";
  import { getProfileFromUserId } from "../../features/profile/profileSlice";
  import { getAllReportsOfUser } from "../../features/reports/reportsSlice";
  import { useAppDispatch, useAppSelector } from "../../store/hooks";
  
  export default function userProfile() {
    const router = useRouter();
    const { profile } = useAppSelector((state) => state.profile);
    const { reports } = useAppSelector((state) => state.report);
    const { user } = useAppSelector((state) => state.account);
    const id = router.query["id"];
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!id) return;
      dispatch(getProfileFromUserId(id));
      dispatch(getAllReportsOfUser(id));
    }, [id]);
  
    return (
      <Container sx={{ marginTop: 10, marginBottom: 10 }}>
        <Typography variant="h4" fontWeight={600}>
          Your Profile
        </Typography>
  
        <Grid container component={Paper} sx={{ padding: 2, marginTop: 5, marginBottom: 5 }}>
          <Grid item xs={6}>Name: </Grid>
          <Grid item xs={6}>
            <Typography>{user?.first_name}</Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>Nationality:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography> {profile?.nationality}</Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>Age:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography> {profile?.age}</Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>Level:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography> {profile?.level}</Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>Gender:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography> {profile?.gender}</Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>Position:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography> {profile?.position}</Typography>
          </Grid>
        </Grid>
  
        <Grid container>
          <Typography variant="h5" fontWeight={600}>Reports</Typography>
        </Grid>      
  
        <Grid container sx={{display: 'flex', justifyContent: "flex-end"}}>
          <Link href="/reports/addReport">
            <Button variant="contained" disableElevation sx={{borderRadius: 8}}>Create Report</Button>
          </Link>
        </Grid>
  
        <Grid container sx={{marginTop: 2}}> 
          { reports && reports.map(r => (
              <Grid key={r.id} item xs={12} md={12} lg={12} sx={{margin: '10px 0'}}>
                <ReportTile report={r} />
              </Grid>
            ))
          }
        </Grid>
  
      </Container>
    );
  }
  
  userProfile.requiredAuth = true;