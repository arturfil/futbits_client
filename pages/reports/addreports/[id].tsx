import { Button, Container, Grid, Typography } from "@mui/material";
import { Report } from "../../../interfaces/Report";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { createReport } from "../../../features/reports/reportsSlice";
import { toast } from "react-toastify";
import { Input } from "@mui/joy";
import { getAllGames } from "../../../features/games/gameSlice";

const inputStyle = {
  borderStyle: "solid",
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
  const [file, setFile] = useState<string>("");
  const [report, setReport] = useState<Report>({
    team_side: "", // A or B
    user_id: "",
    game_id: "",
    player_name: "",
    goals: 0,
    assists: 0,
    won: 0,
    man_of_the_match: 0,
  });

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  useEffect(() => {
    if(!user?.id) return
    setReport(prevReport => ({
        ...prevReport,
        user_id: user?.id!
    }))
  }, [user?.id])

  function handleSubmit() {
    for (let val of Object.values(report)) {
      if (typeof val === "string" && val === "") {
        toast.error("No field can be empty");
        return;
      }
    }
    console.log(report);
    dispatch(createReport(report));
  }

  return (
    <div className="login-body" style={{ marginTop: 10 }}>
      <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
        Add Report
      </Typography>

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
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <label>Team Side</label>
            <select
              style={inputStyle}
              onChange={(e) =>
                setReport({ ...report, team_side: e.target.value })
              }
            >
              <option value="">Choose Team Side</option>
              <option key={"A"} value="A">
                A
              </option>
              <option key={"B"} value="B">
                B
              </option>
            </select>
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
            <label>Players Name</label>
            <Input
              sx={inputStyle}
              type="string"
              value={report.player_name}
              onChange={(e) =>
                setReport({ ...report, player_name: e.target.value })
              }
              fullWidth
              placeholder="Player's Name"
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

          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <label>Man of the Match</label>
            <select
              style={inputStyle}
              onChange={(e) =>
                setReport({ ...report, man_of_the_match: Boolean(e.target.value) })
              }
            >
              <option value="">MOTM?</option>
              <option key={"A"} value={1}>
                Yes
              </option>
              <option key={"B"} value={0}>
                No
              </option>
            </select>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <label>Game Won</label>
            <select
              style={inputStyle}
              onChange={(e) =>
                setReport({ ...report, won: Boolean(e.target.value) })
              }
            >
              <option value="">Game Won?</option>
              <option key={"A"} value={1}>
                Yes
              </option>
              <option key={"B"} value={0}>
                No
              </option>
            </select>
          </Grid>

          <Grid item xs={12}>
            <Button onClick={handleSubmit} fullWidth className="button">
              Create Report
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>Or Upload CSV</Typography>
          </Grid>
          <Grid item xs={12}>
            <label>Choose file</label>
            <Input
              sx={[inputStyle, { mt: 1 }]}
              type="file"
              fullWidth
              placeholder="involvement"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
