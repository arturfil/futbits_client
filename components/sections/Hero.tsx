import { Box, Button, Container, styled, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItem: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px,",
    },
  }));

  return (
    <Box sx={{ minHeight: "80vh", py: 8 }}>
      <Container sx={{}}>
        <CustomBox sx={{}}>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mb: 4,
              }}
            >
              Welcome To Futbits
            </Typography>
            <Title variant="h1">
              Discover the best place to track your soccer results
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Be the first to have your soccer group in the platform!
            </Typography>
            <Link href="/auth/signup">
              <Button className="button">Start Now!</Button>
            </Link>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <Image
              height={400}
              width={600}
              src="/images/soccer_player.jpeg"
              alt="img"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
}
