import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Report } from '../../interfaces/Report';
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createReport } from "../../features/reports/reportsSlice";
import { toast } from "react-toastify";

export default function AddReport() {
  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const [report, setReport] = useState<Report>({
    user_id: "",
    game_id: "",
    assists: 0,
    goals: 0,
    attendance: 0,
    man_of_the_match: 0,
    attitude: "",
    involvement: 0
  });

  useEffect(() => {
    if (!user?.id) return;
    setReport({...report, user_id: user.id})
  }, [user?.id])

  function handleSubmit() {
    for(let val of Object.values(report)) {
      if ((typeof(val) === "string" && val === "") || (typeof(val) === "number" && val === 0)) {
        toast.error("No field can be empty");
        return;
      }
    }
    dispatch(createReport(report));
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
        Add Report
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            onChange={(e) => setReport({ ...report, user_id: e.target.value })}
            value={report.user_id}
            fullWidth
            label="user_id"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={(e) => setReport({ ...report, game_id: e.target.value })}
            value={report.game_id}
            fullWidth
            label="game_id"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={report.assists}
            onChange={e => setReport({...report, assists: parseInt(e.target.value)})}
            fullWidth
            label="assists"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={report.goals}
            label="goals"
            onChange={e => setReport({...report, goals: parseInt(e.target.value)})}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={report.attendance}
            onChange={e => setReport({...report, attendance: parseInt(e.target.value)})}
            fullWidth
            label="attendance"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={report.man_of_the_match}
            onChange={e => setReport({...report, man_of_the_match: parseInt(e.target.value)})}
            fullWidth
            label="man_of_the_match"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            onChange={(e) => setReport({ ...report, attitude: e.target.value })}
            value={report.attitude}
            fullWidth
            label="attitude"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            value={report.involvement}
            onChange={e => setReport({...report, involvement: parseInt(e.target.value)})}
            fullWidth
            label="involvement"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} fullWidth variant="contained" disableElevation>
            Create Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
