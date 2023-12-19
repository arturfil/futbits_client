import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

interface CardProps {
    imgURL: string;
    description: string;
    title: string;
}

export default function IntroCard({description, imgURL, title}: CardProps) {
  return (
    <div>
      <Card sx={{ maxWidth: 345, borderRadius: 3 }} elevation={0}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imgURL}
            alt="soccer1"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
