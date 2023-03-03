import { Input, Select, Option, Button } from "@mui/joy";
import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, MouseEvent } from "react";
import { Game } from "../../interfaces/Game";
import { createGame, getAllGames } from '../../features/games/gameSlice';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllFields } from "../../features/fields/fieldSlice";

export default function CreateGamePage() {
  const { fields } = useAppSelector((state) => state.field);
  const dispatch = useAppDispatch();
  const [game, setGame] = useState<Game>({
    field_id: "",
    start_time: "",
  });

  useEffect(() => { 
    dispatch(getAllFields())
  }, [])

  function handleSubmit(e: MouseEvent<HTMLButtonElement|any>) {
    e.preventDefault();
    dispatch(createGame(game));
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
            <option value="">Default</option>
            {fields && fields.map(field => (
              <option key={field.id} value="three">{field.name}</option>
            ))}
          </select>
          <Input placeholder="Start Time" 
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: '40px',
              backgroundColor: "white", border: "none"
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