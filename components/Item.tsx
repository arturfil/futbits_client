import { Box, colors, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: Function;
  display: boolean;
}

export default function Item({
  title,
  to,
  icon,
  selected,
  setSelected,
  display,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        textAlign: "left",
        backgroundColor: title === selected ? "#1bcab6" : "",
        height: "40px",
        width: display ? "150px" : "40px",
        borderRadius: "12px",
      }}
    >
      <Link href={to}>
        <IconButton
          sx={{
            color: "white",
          }}
          onClick={() => setSelected(title)}
        >
          {icon}
          <Typography
            sx={{
              textAlign: "left",
              display: display ? "flex" : "none",
              mt: 0.5,
              ml: 2,
            }}
          >
            {title}
          </Typography>
        </IconButton>
      </Link>
    </Box>
  );
}
