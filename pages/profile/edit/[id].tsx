import { Input } from "@mui/joy";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getProfileFromUserId } from "../../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const router = useRouter();
  const id = router.query["id"];

  useEffect(() => {
    if (!id) return;
    dispatch(getProfileFromUserId(id));
  }, [id, dispatch]);

  return (
    <Container>
        <form onSubmit={() => console.log("Execute createSlice method")} style={{margin: "10px 0"}}>
      <Grid
        spacing={3}
        container
        sx={{
          m: "0 auto",
          p: 2,
          maxWidth: "600px",
        }}
      >
        <Grid item xs={12}>
          {profile ? (
            JSON.stringify(profile)
          ) : (
            <Typography
              sx={{
                m: "0 auto",
                display: "flex",
              }}
              variant="h4"
              fontWeight={600}
            >
              Create New Profile
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Input
            placeholder="Nationality"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              borderColor: "lightgrey",
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Input
            placeholder="Age"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              borderColor: "lightgrey",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Input
            placeholder="Gender"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              borderColor: "lightgrey",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Input
            placeholder="Position"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              borderColor: "lightgrey",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Input
            placeholder="Level"
            sx={{
              minWidth: "450px",
              fontSize: "15px",
              height: "40px",
              mb: "10px",
              backgroundColor: "white",
              borderColor: "lightgrey",
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ m: "0 auto" }}>
          <Button fullWidth className="button">
            {profile ? "Edit Profile" : "Create Pofile"}
          </Button>
        </Grid>
      </Grid>
    </form>
    </Container>
  );
}
