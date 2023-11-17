import { Input } from "@mui/joy";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, MouseEvent, useEffect } from "react";
import { getAllFields } from "../../../features/fields/fieldSlice";
import { getSingleGame, updateGame } from "../../../features/games/gameSlice";
import { Field } from "../../../interfaces/Field";
import { GameInput } from "../../../interfaces/GameInput";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export default function EditGame() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { fields } = useAppSelector((state) => state.field);
  const { singleGame } = useAppSelector((state) => state.games);

  const [field, setField] = useState<Field>({
    name: "",
    address: "",
  });

  const [game, setGame] = useState<GameInput>({
    field_id: "",
    group_id: "",
    game_date: "",
    score: "",
  });

  const id = router.query["id"];

  useEffect(() => {
    if (!id && typeof id !== "string") return;
    dispatch(getAllFields());
    dispatch(getSingleGame(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!singleGame) return

    setGame({
      field_id: singleGame?.field_id!,
      group_id: singleGame?.group_id!,
      game_date: String(singleGame.game_date)!,
      score: singleGame?.score!,
    });

  }, [singleGame, dispatch]);

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const objToEdit = {
        id: id,
        field_id	: game.field_id,
        game_date	: new Date(game.game_date).toISOString(),
        score		: game.score,
    }

    console.log(objToEdit)
    dispatch(updateGame(objToEdit))
  }

  return (
    <Container
      sx={{
        m: "10px auto",
        backgroundColor: "lightgrey",
        p: 2,
        borderRadius: 2,
        maxWidth: "500px!important",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
        Update Game
      </Typography>
      <p>{game.field_id}</p>
      <Grid container>
        <Grid item sx={{ mt: 2, mb: 3 }}>
          <select
            onChange={(e) => setGame({ ...game, field_id: e.target.value })}
            style={{
              borderColor: "lightgrey",
              backgroundColor: "white",
              minWidth: "450px",
              height: "40px",
              fontSize: "15px",
              color: "grey",
              marginBottom: "10px",
              paddingLeft: "10px",
              borderRadius: 7,
              border: "1px none black",
            }}
          >
            <option value="">{singleGame?.field_name}</option>
            {fields &&
              fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
          </select>

          <p>{game.game_date}</p>
          <Input
            placeholder="Date"
            type="datetime-local"
            value={game.game_date} 
            onChange={(e) => {
                setGame({...game, game_date: String(e.target.value)})
                console.log(game.game_date)
            }}
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              border: "none",
            }}
          />
          <Input
            placeholder="Score"
            type="text"
            onChange={(e) => setGame({ ...game, score: e.target.value })}
            value={game.score}
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              backgroundColor: "white",
              border: "none",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={(e) => handleSubmit(e)} fullWidth className="button">
            Upate Game
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
