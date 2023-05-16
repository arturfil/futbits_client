import { Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  data: any;
  color?: string;
  type?: string;
}

export default function DataCard({ data, color, type }: Props) {
  return (
    <Link href={`/${type}/${data.id}`}>
      <Paper
        elevation={1}
        sx={{
          cursor: "pointer",
          height: 140,
          borderRadius: 2,
          backgroundColor: color,
          widht: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container sx={{ padding: 4 }}>
          <Grid item xs={12}>
            <Typography color="white" fontWeight={600}>
              {data.field_name ? data.field_name : data.name}
            </Typography>
          </Grid>
          {data.game_date && (
            <Grid item xs={12}>
              <Typography color="white" fontWeight={600}>
                {data.game_date.split("T")[0].split("-").reverse().join("/")}
                <br/>
                {new Date(data?.game_date).toLocaleTimeString()}
                <br />
                {new Date() > new Date(data.game_date) ? "[Finished] " : ""}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Link>
  );
}
