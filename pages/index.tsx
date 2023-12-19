import { Container, Grid, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import DataCard from "../components/DataCard";
import GroupCard from "../components/GroupCard";
import LandingPage from "../components/layout/LandingPage";
import { getAllFields } from "../features/fields/fieldSlice";
import { getAllGames } from "../features/games/gameSlice";
import {
  getAllGroupOfAUser,
  getAllGroups,
} from "../features/groups/groupSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.field);
  const { games } = useAppSelector((state) => state.games);
  const { groups } = useAppSelector((state) => state.groups);
  const { user } = useAppSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAllFields());
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    dispatch(getAllGroupOfAUser(user?.id));
    dispatch(getAllGames(user?.id));
  }, [user?.id]);

  return (
    <LandingPage/>
  )
};

export default Home;
