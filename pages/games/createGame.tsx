import { Input, Select, Option, Button } from "@mui/joy";
import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, MouseEvent } from "react";
import { Game } from "../../interfaces/Game";
import { createGame, getAllGames } from '../../features/games/gameSlice';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllFields } from "../../features/fields/fieldSlice";

interface GameInput {
    field_id: string,
    game_date: string,
    max_players: string
}

export default function CreateGamePage() {
  const { fields } = useAppSelector((state) => state.field);
  const dispatch = useAppDispatch();
  const [game, setGame] = useState<GameInput>({
    field_id: "",
    game_date: "",
    max_players: ""
  });

  useEffect(() => { 
    dispatch(getAllFields())
  }, [dispatch])

  function handleSubmit(e: MouseEvent<HTMLButtonElement|any>) {
    e.preventDefault();
    let gameToCreate:Game|any = game;
    gameToCreate.max_players = parseInt(game.max_players);
    gameToCreate.game_date = new Date(game.game_date).toISOString();
    dispatch(createGame(gameToCreate));
  }

  return (
    <Container
      sx={{ 
        m: '10px auto', backgroundColor: "lightgrey", p: 2, borderRadius: 2,
        maxWidth: "500px!important"
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2}}>
        Create Game


      </Typography>
      <Grid container>
        <Grid item sx={{ mt: 2, mb: 3}}>
          <select 
            onChange={e => setGame({...game, field_id: e.target.value})}
            style={{
              borderColor: "lightgrey",
              backgroundColor: "white",
              minWidth: "450px",
              height: '40px',
              fontSize: "15px",
              color: "grey",
              marginBottom: '10px',
              paddingLeft: "10px",
              borderRadius: 7,
              border: "1px none black"
            }}>
            <option value="">Choose Field</option>
            {fields && fields.map(field => (
              <option key={field.id} value={field.id}>{field.name}</option>
            ))}
          </select>
         <Input placeholder="Date"
            onChange={e => {
                setGame({...game, game_date: String(e.target.value)})
                console.log(game.game_date);
            }}
            value={game.game_date}
            type="datetime-local"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: '40px',
              mb: "10px",
              backgroundColor: "white", 
              border: "none"
            }}
          />
          <Input placeholder="Max players"
            type="text"
            onChange={e => setGame({...game, max_players: e.target.value})}
            value={game.max_players}
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: '40px',
              backgroundColor: "white", 
              border: "none"
            }}
          />

        </Grid>
        <Grid item xs={12}>
            <Button onClick={(e) => handleSubmit(e)} fullWidth className="button">
              Create Game
            </Button>
          </Grid>
      </Grid>
    </Container>
  );
}

CreateGamePage.requiredAuth = true;
