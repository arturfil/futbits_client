import { Input } from "@mui/joy";
import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { createField } from "../../features/fields/fieldSlice";
import { Field } from "../../interfaces/Field";
import { useAppDispatch } from "../../store/hooks";

export default function CreateField() {
  const dispatch = useAppDispatch();
  const [field, setField] = useState<Field>({
    name: "",
    address: "",
  });

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(createField(field))
  }

  return (
    <Container
      sx={{
        marginTop: 10,backgroundColor: "lightgrey",
        p: 2,borderRadius: 2, maxWidth: "600px!important"}}
    >
      <Typography sx={{ fontWeight: "bold", mt: 2 }} variant="h4">
        Create Field
      </Typography>
      <Grid container sx={{ mb: 3, mt: 0 }} spacing={3}>
        <Grid item xs={12}>
          <Input
            value={field.name}
            onChange={(e) => setField({...field, name: e.target.value})}
            sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
            fullWidth
            placeholder="Name"
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            value={field.address}
            onChange={(e) => setField({...field, address: e.target.value})}
            sx={{ backgroundColor: "white", borderColor: "lightgrey" }}
            fullWidth
            placeholder="Address"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} fullWidth className="button">
            Create
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
