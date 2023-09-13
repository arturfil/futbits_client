import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import router, { useRouter } from "next/router";
import { getSingleGame } from "../../features/games/gameSlice";
import { getAllReportsOfGame } from "../../features/reports/reportsSlice";
import ReportTile from "../../components/ReportTile";

export default function SingleGame() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector((state) => state.games);
  const { reports } = useAppSelector((state) => state.report);

  const id = router.query["id"];

  useEffect(() => {
    if (!id && typeof id !== "string") return;
    dispatch(getSingleGame(id));
    dispatch(getAllReportsOfGame(id));
  }, [id]);

  return (
    <Container sx={{ marginTop: 10, paddingBottom: 5 }} maxWidth="lg">
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        {singleGame?.field_name}{" "}
      </Typography>
      <Typography variant="h4">Game ID: {singleGame?.id} </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {singleGame?.game_date?.toString() .split("T")[0].split("-").reverse() .join("/")}{" "} at{" "}
        {singleGame ? new Date(singleGame.game_date).toLocaleTimeString() : null}
      </Typography>
      <Typography variant="h5">Score: {singleGame?.score}</Typography>
      {reports && <ReportTile reports={reports} />}
    </Container>
  );
}
