import { Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import React, { useEffect } from "react";
import DataCard from "../../components/DataCard";
import { getAllGroupOfAUser, getAllGroups } from "../../features/groups/groupSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function index() {
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector((state) => state.groups);
  const { user } = useAppSelector((state) => state.account);
  console.log("AQUI", user?.id);

  useEffect(() => {
    if (!user?.id) return;
    dispatch(getAllGroupOfAUser(user?.id!));
  }, [user, user?.id]);

  return (
    <Container
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 3 }}>
        Groups where you belong
      </Typography>
      <Grid container spacing={3}>
        {groups?.map((group) => (
          <Grid key={group.id} item xs={12} sm={6} md={4} lg={3}>
            <DataCard type="groups" data={group} color="#1a82af" />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ marginTop: 3 }}>
        <Link href="/groups/createGroup">
          <Button disableElevation sx={{textTransform: 'capitalize', borderRadius: 5 }} variant="contained">
            Create Group
          </Button>
        </Link>
      </Grid>
    </Container>
  );
}
