import { Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import DataCard from "../../components/DataCard";
import { getAllGames } from "../../features/games/gameSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Games() {
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (games) return;
    dispatch(getAllGames());
  }, [games, dispatch])

  return ( 
    <Container sx={{ marginTop: 10 }}>
      <Typography style={{ fontWeight: 600, marginBottom: 3 }} variant="h4">
        Soccer Games
      </Typography>
      {games ? (
        <Grid style={{ marginBottom: 3 }} container spacing={3}>
          {games?.map((game) => (
            <Grid key={game.id} item xs={6} md={4} lg={3}>
              <DataCard type="games" data={game} color="#27baa2" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography 
          variant="h5" 
          sx={{fontWeight: 'bold'}}>No Soccer Games to Display
        </Typography>
      )}
      <Link  href="/games/createGame">
        <Button className="button" sx={{mt: 2}}>Create Game</Button>
      </Link>
    </Container>
  );
}
