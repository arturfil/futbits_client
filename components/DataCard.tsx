import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface Props {
  data: any;
  color?: string;
}

export default function DataCard({ data, color }: Props) {
  return (
    <Paper
      elevation={1}
      sx={{
        height: 140,
        borderRadius: 2,
        backgroundColor: color,
        widht: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container sx={{padding: 4}}>
        <Grid xs={12}>
          <Typography color="white" fontWeight={600}>
            {data.field_name ? data.field_name : data.name}
          </Typography>
        </Grid>
        {data.start_time && (
          <Grid xs={12}>
            <Typography color="white" fontWeight={600}>
              {new Date(data.start_time).toLocaleDateString()}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
