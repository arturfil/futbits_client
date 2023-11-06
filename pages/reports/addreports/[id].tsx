import { Button, Container, Grid, Typography } from "@mui/material";
import { Report } from "../../../interfaces/Report";
import React, { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { Input } from "@mui/joy";
import { getAllGames } from "../../../features/games/gameSlice";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Link from "next/link";
import { createReport, uploadReport } from "../../../features/reports/reportsSlice";

interface ReportDTO {
    id?: string;
    team_side: string;
    game_id: string;
    user_id: "";
    player_name: string
    goals: number;
    assists: number;
    won: boolean | number;
    man_of_the_match: boolean | number;
    created_at?: Date;
    updated_at?: Date;
}

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

const backButtonStyle = {
  display: "flex",
  backgroundImage: "linear-gradient(90deg, #1bcab6 ,#1bca98)",
  color: "white",
  borderRadius: "8px",
  padding: "5px",
  paddingRight: "12px",
};

export default function AddReport() {
  const { user } = useAppSelector((state) => state.account);
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query["id"]!;
  const [file, setFile] = useState<File>();
  const [report, setReport] = useState<ReportDTO>({
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
    if (!user?.id) return
    dispatch(getAllGames(user?.id));
  }, [dispatch, user?.id]);

  // I'm going to use this here to avoid creating new objs
  useEffect(() => {
    setReport((prevReport) => ({
      ...prevReport,
      won: Boolean(prevReport.won),
      man_of_the_match: Boolean(prevReport.man_of_the_match),
    }));
  }, [report.won, report.man_of_the_match]);

  useEffect(() => {
    if (!user?.id) return;
    setReport((prevReport: any) => ({
      ...prevReport,
      user_id: user?.id!,
    }));
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

  function handleUploadSubmit() {
    console.log("FILE:", file)
    dispatch(uploadReport(file));
  }

  return (
    <div className="login-body" style={{ marginTop: 10 }}>
      <Container sx={{ mt: 3 }}>
        <Grid container sx={{ mb: 3 }}>
          <Link href={`/groups/${id}`}>
            <Button sx={[backButtonStyle, { textTransform: "lowercase" }]}>
              <ArrowBack />
              <Typography>Go Back To Group</Typography>
            </Button>
          </Link>
          <Grid item xs={6} />
        </Grid>

        <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
          Add Report
        </Typography>

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
                setReport({
                  ...report,
                  man_of_the_match: Number(e.target.value),
                })
              }
            >
              <option value="">MOTM?</option>
              <option key={"AWARED"} value={1}>
                Yes
              </option>
              <option key={"NOT AWARDED"} value={0}>
                No
              </option>
            </select>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            <label>Game Won</label>
            <select
              style={inputStyle}
              onChange={(e) =>
                setReport({ ...report, won: Number(e.target.value) })
              }
            >
              <option>Game Won?</option>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
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
              onChange={(e) => setFile(e.target.files![0])}
              sx={[inputStyle, { mt: 1 }]}
              type="file"
              fullWidth
              placeholder="select file"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleUploadSubmit} fullWidth className="button">
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
