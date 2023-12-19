import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image, { StaticImageData } from "next/image";
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
          <Image
            style={{maxHeight: "100px", overflow: "hidden"}}
            height="140px"
            width={"345px"}
            src={imgURL}
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
