import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import IntroCard from "./IntroCard";

const card1 = "/images/soccer-card1.jpg";
const card2 = "/images/soccer-card2.jpg";
const card3 = "/images/soccer-card3.jpg";

const images = [
  { title: "Play", 
    url: "/images/soccer-card1.jpg", 
    description: "Play with your frieds" },
  {
    title: "Save Your Data",
    url: "/images/soccer-card2.jpg",
    description: "Record who won, who scored, who lost",
  },
  {
    title: "Compare",
    url: "/images/soccer-card3.jpg",
    description: "Compare results, rankigs and more!",
  },
];

export default function AboutUs() {
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "flex",
        minHeight: "40vh",
        py: 8,
        backgroundColor: "#e8faf8",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <Box sx={{ margin: "0 auto" }}>
          <div
            style={{
              margin: "0 auto",
              width: "15%",
              height: "5px",
              backgroundColor: "#1f2f2f",
            }}
          ></div>
          <Typography
            variant="h3"
            sx={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#000339",
              my: 3,
            }}
          >
            How does it work?
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "18px", color: "#2A2423", my: 4 }}
          >
            Sign in, create your group and start tracking!
            <br />
            You can start adding stats by uploading csv&#39;s!
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={2}>
            {images.map((image: { description: string, url: string, title: string}) => (
              <Grid
                sx={{ margin: "0 auto" }}
                item
                xs={12}
                sm={6}
                md={4}
                key={image.url}
              >
                <IntroCard
                  title={image.title}
                  description={image.description}
                  imgURL={image.url}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
