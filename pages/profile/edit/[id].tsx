import { Input } from "@mui/joy";
import { Button, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import {
  createProfile,
  getProfileFromUserId,
} from "../../../features/profile/profileSlice";
import { Profile } from "../../../interfaces/Profile";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface ProfileCreation {
  user_id: string;
  nationality: string;
  age: string;
  gender: string;
  position: string;
  level: string;
}

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const router = useRouter();
  const id = router.query["id"];
  const [profObj, setProfObj] = useState<ProfileCreation>({
    user_id: "",
    nationality: "",
    age: "",
    gender: "",
    position: "",
    level: "",
  });

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    dispatch(getProfileFromUserId(id));
  }, [id, dispatch]);

  useEffect(() =>{ 
    setProfileState()
  }, [profile])

  function clearForm() {
    setProfObj({
      user_id: "",
      nationality: "",
      age: "",
      gender: "",
      position: "",
      level: "",
    });
  }

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("USER PROFILE: ", profObj);

    const dataObj: Profile = {
      user_id: String(id),
      nationality: profObj.nationality,
      age: Number(profObj.age),
      gender: profObj.gender,
      position: profObj.position,
      level: profObj.level,
    };
    if (profile) {
        dispatch(updateProfile(dataObj));
    } else {
        dispatch(createProfile(dataObj));
        clearForm();
    }
        router.push("/");
  };

  function setProfileState() {
    if (!profile) return;
    setProfObj({
      user_id: profile.user_id!,
      nationality: profile.nationality,
      age: String(profile.age),
      gender: profile.gender,
      position: profile.position,
      level: profile.level,
    });
  }

  return (
    <Container className="login-body">
      <form onSubmit={handleSubmit} style={{ margin: "10px 0" }}>
        <Grid
          spacing={2}
          container
          sx={{
            padding: 5,
            maxWidth: 500,
            width: 500,
            justifyContent: "center",
            margin: "0 auto",
            borderRadius: 4,
            backgroundColor: "lightgrey",
          }}
        >
          <Grid item xs={12}>
            {profile ? (
              <Typography
                sx={{
                  m: "0 auto",
                  display: "flex",
                }}
                variant="h4"
                fontWeight={600}
              >
                Edit Profile
              </Typography>
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
              value={profObj.nationality}
              onChange={(e) =>
                setProfObj({ ...profObj, nationality: e.target.value })
              }
              sx={{
                minWidth: "350px",
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
              value={profObj.age}
              onChange={(e) => setProfObj({ ...profObj, age: e.target.value })}
              sx={{
                minWidth: "350px",
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
              value={profObj.gender}
              onChange={(e) =>
                setProfObj({ ...profObj, gender: e.target.value })
              }
              sx={{
                minWidth: "350px",
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
              value={profObj.position}
              onChange={(e) =>
                setProfObj({ ...profObj, position: e.target.value })
              }
              sx={{
                minWidth: "350px",
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
              value={profObj.level}
              onChange={(e) =>
                setProfObj({ ...profObj, level: e.target.value })
              }
              sx={{
                minWidth: "350px",
                fontSize: "15px",
                height: "40px",
                mb: "10px",
                backgroundColor: "white",
                borderColor: "lightgrey",
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: "0 auto" }}>
            <Button type="submit" className="button">
              {profile ? "Edit Profile" : "Create Pofile"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
