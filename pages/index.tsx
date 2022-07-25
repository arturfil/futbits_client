import { Container, Grid, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import DataCard from "../components/DataCard";
import { getAllFields } from "../features/fields/fieldSlice";
import { getAllGames } from "../features/games/gameSlice";
import { getAllGroups } from "../features/groups/groupSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.field);
  const { games } = useAppSelector((state) => state.games);
  const { groups } = useAppSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getAllFields());
    dispatch(getAllGames());
    dispatch(getAllGroups())
  }, []);

  return (
    <Container sx={{ marginTop: 10, paddingBottom: 5 }} maxWidth="lg">
      <Typography sx={{ fontWeight: 600 }} variant="h4">
        Home Page
      </Typography>
      <Typography sx={{ marginTop: 3 }} variant="h6">
        Fields
      </Typography>
      { fields ? (
        <Grid sx={{ marginBottom: 3 }} container spacing={3}>
          {fields?.map((field) => (
            <Grid key={field.id} item xs={6}>
              <DataCard data={field} color="#1a82af"/>
            </Grid>
          ))}
        </Grid>
      ): (
        <Typography color="red">No Fields Created Yet</Typography>
      )}
      <Typography variant="h6">Games</Typography>
      { games ? (
        <Grid sx={{ marginBottom: 3 }} container spacing={3}>
          {games?.map((game) => (
            <Grid key={game.id} item xs={6} md={4} lg={3}>
              <DataCard type="groups" data={game} color="#ffccaa"/>
            </Grid>
          ))}
        </Grid>
      ): (
        <Typography color="red">No Games Yet</Typography>
      )}
      <Typography variant="h6">Groups</Typography>
      {groups ? (
        <Grid container spacing={3}>
          {groups?.map((group) => (
            <Grid key={group.id} item xs={12} md={4} lg={3}>
              <DataCard type="groups" data={group} color="#1aaaaf"/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="red">No Groups Created Yet</Typography>
      )}
    </Container>
  );
};

export default Home;
