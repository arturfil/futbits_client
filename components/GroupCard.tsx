import { Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: any;
  color?: string;
  type?: string;
}

export default function GroupCard({ data, color, type }: Props) {
  return (
    <Link href={`/${type}/${data.id}`}>
      <div>
        <Paper
          sx={{
            cursor: "pointer",
            display: "flex",
            borderRadius: "12px",
            maxHeight: "171px",
            minHeight: "171px",
            border: "1px solid lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="black" fontWeight={600}>
            {data.field_name ? data.field_name : data.name}
          </Typography>
          {data.game_date && (
            <Grid item xs={12}>
              <Typography fontWeight={600}>
                {data.game_date.split("T")[0].split("-").reverse().join("/")}
                <br />
                {new Date(data?.game_date).toLocaleTimeString()}
                <br />
                {new Date() > new Date(data.game_date) ? "[Finished] " : ""}
              </Typography>
            </Grid>
          )}
        </Paper>
      </div>
    </Link>
  );
}
