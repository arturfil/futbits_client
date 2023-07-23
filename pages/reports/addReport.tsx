import { Button, Container, Grid, Typography } from "@mui/material";
import { Report } from "../../interfaces/Report";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createReport } from "../../features/reports/reportsSlice";
import { toast } from "react-toastify";
import { Input } from "@mui/joy";
import { Label } from "@mui/icons-material";

const inputStyle = {
  borderColor: "lightgrey",
  backgroundColor: "white",
  minHeight: "40px",
  fontSize: "15px",
  color: "grey",
  marginBottom: "10px",
  paddingLeft: "10px",
  borderRadius: 7,
};

export default function AddReport() {
  const { user } = useAppSelector((state) => state.account);
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const [report, setReport] = useState<Report>({
    user_id: "",
    game_id: "",
    assists: 0,
    goals: 0,
    attendance: 0,
    man_of_the_match: 0,
    attitude: "",
    involvement: 0,
  });

  useEffect(() => {
    if (!user?.id) return;
    setReport({ ...report, user_id: user.id });
  }, [user?.id]);

  function handleSubmit() {
    for (let val of Object.values(report)) {
      if (typeof val === "string" && val === "") {
        toast.error("No field can be empty");
        return;
      }
    }
    dispatch(createReport(report));
  }

  return (
    <div className="login-body" style={{ marginTop: 10 }}>
      <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
        Add Report
      </Typography>

      <h4>
        user_id: {report.user_id} <br/>
        game_id: {report.game_id} <br/>
        assists: {report.assists} <br/>
        goals: {report.goals} <br/>
        attendance: {report.attendance} <br/>
        man_of_the_match: {report.man_of_the_match} <br/>
        attitude: {report.attitude} <br/>
        involvement: {report.involvement} <br/>
      </h4>

      <Container>
        <Grid
          className="login-container"
          container
          spacing={3}
          sx={{
            backgroundColor: "lightgrey",
            pr: 10,
            pl: 7,
            py: 5,
            borderRadius: 2,
            m: "0 auto",
          }}
        >
          <Grid item xs={6}>
            <label>User ID</label>
            <Input
              sx={inputStyle}
              type="text"
              onChange={(e) =>
                setReport({ ...report, user_id: e.target.value })
              }
              value={report.user_id}
              placeholder="user_id"
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <label>Game ID</label>
            <select
              onChange={(e) =>
                setReport({ ...report, game_id: e.target.value })
              }
              style={inputStyle}
            >
              <>
                <option value="">Choose Game</option>
                {games &&
                  games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.field_name} -{" "}
                      {game.game_date
                        .toString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </option>
                  ))}
              </>
            </select>
          </Grid>
          <Grid item xs={4}>
            <label>Assists</label>
            <Input
              sx={inputStyle}
              type="number"
              value={report.assists}
              onChange={(e) =>
                setReport({ ...report, assists: parseInt(e.target.value) })
              }
              fullWidth
              placeholder="assists"
            />
          </Grid>
          <Grid item xs={4}>
            <label>Goals</label>
            <Input
              sx={inputStyle}
              type="number"
              value={report.goals}
              placeholder="goals"
              onChange={(e) =>
                setReport({ ...report, goals: parseInt(e.target.value) })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <label>Attendance</label>
            <Input
              sx={inputStyle}
              type="number"
              value={report.attendance}
              onChange={(e) =>
                setReport({ ...report, attendance: parseInt(e.target.value) })
              }
              fullWidth
              placeholder="attendance"
            />
          </Grid>
          <Grid item xs={4}>
            <label>Man Of The Match</label>
            <Input
              sx={inputStyle}
              type="number"
              value={report.man_of_the_match}
              onChange={(e) =>
                setReport({
                  ...report,
                  man_of_the_match: parseInt(e.target.value),
                })
              }
              fullWidth
              placeholder="man_of_the_match"
            />
          </Grid>
          <Grid item xs={4}>
            <label>Attitude</label>
            <Input
              sx={inputStyle}
              onChange={(e) =>
                setReport({ ...report, attitude: e.target.value })
              }
              value={report.attitude}
              fullWidth
              placeholder="attitude"
            />
          </Grid>
          <Grid item xs={4}>
            <label>Involvement</label>
            <Input
              sx={inputStyle}
              type="number"
              value={report.involvement}
              onChange={(e) =>
                setReport({ ...report, involvement: parseInt(e.target.value) })
              }
              fullWidth
              placeholder="involvement"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} fullWidth className="button">
              Create Report
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
