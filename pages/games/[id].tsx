import React, { useEffect } from 'react'
import { Container, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import router, { useRouter } from 'next/router';
import { getSingleGame } from '../../features/games/gameSlice';

export default function SingleGame()  {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { singleGame } = useAppSelector(state => state.games);
    const id = router.query["id"];

    useEffect(() => {
        if (!id && typeof id !== "string") return;
        dispatch(getSingleGame(id));
    }, [id])

    return (
      <Container sx={{ marginTop: 10, paddingBottom: 5 }} maxWidth="lg">
        <Typography variant="h2" sx={{fontWeight: "bold"}}>{ singleGame?.field_name } </Typography>
        <Typography variant="h4" 
            sx={{fontWeight: "bold"}}>
            { singleGame?.game_date.toString().split("T")[0].split("-").reverse().join("/") } 
            {" "} at {" "}
            {singleGame ? new Date(singleGame.game_date).toLocaleTimeString() : null}
        </Typography>
        <Typography variant="h5">Max Players: {singleGame?.max_players}</Typography>
      </Container>);
}
