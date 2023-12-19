import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const fields = [
  "Brickell Soccer & Padel",
  "Soccer Cage Down Town",
  "Rooftop (Previously)",
];

export default function Fields() {
  return (
    <Container sx={{ minHeight: "40vh", py: 8 }}>
      <Typography
        variant="h3"
        sx={{textAlign: "center", fontSize: "42px", fontWeight: "bold", color: "#000339",justifyContent: "center", m: "24px auto", display: "flex" }}
      >
        Some of the fields that we have worked with:
      </Typography>

      <Grid container spacing={2} sx={{display: "flex", justifyContent: "space-around"}}>
        {fields.map((field) => (
          <Grid sx={{display: "flex"}} item key={field} sm={12} md={4}>
            <Typography
              variant="body2"
              sx={{ fontSize: "22px", color: "#2A2423", my: 4 , margin: "0 auto"}}
            >
              {field}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
