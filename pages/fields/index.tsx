import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import React, { useEffect } from "react";
import DataCard from "../../components/DataCard";
import { getAllFields } from "../../features/fields/fieldSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Fields() {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.field);

  useEffect(() => {
    dispatch(getAllFields());
  }, []);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography sx={{ fontWeight: 600, marginBottom: 3 }} variant="h4">
        Fields
      </Typography>
      {fields ? (
        <Grid sx={{ marginBottom: 3 }} container spacing={3}>
          {fields?.map((field) => (
            <Grid key={field.id} item xs={6} md={4} lg={3}>
              <DataCard type="fields" data={field} color="#77ccaa" />
            </Grid>
          ))}
        </Grid>
      ): (
        <Typography sx={{color: "grey"}} variant="h4">No Fields Created yet</Typography>
      )}
      <Link href="/fields/create">
        <Button sx={{marginTop: 2}} className="button">Create Field</Button>
      </Link>
    </Container>
  );
}
