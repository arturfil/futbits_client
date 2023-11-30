import { Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import fieldImage from '../images/field_logo3.png'
import gameImage from "../images/game_icon.png"
import groupImage from "../images/game_icon.png"

interface Props {
  data: any;
  color?: string;
  type?: string;
}

function returnImage(type: string) {
    switch (type) {
        case "fields":
            return fieldImage 
            break;
        case "games":
            return gameImage
            break
        case "groups":
            return groupImage
            break
        default:
            break;
    }
}


export default function DataCard({ data, color, type }: Props) {
  return (
    <Link href={`/${type}/${data.id}`}>
      <div>
        <Paper
          elevation={1}
          sx={{
            cursor: "pointer",
            display: "flex",
            borderRadius: "12px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Image 
            height={200}
            width={200}
            style={{
                borderRadius: "12px",
            }}
            src={type === "games" ? gameImage : fieldImage} alt="soccer field"
        />
        </Paper>
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
      </div>
    </Link>
  );
}
