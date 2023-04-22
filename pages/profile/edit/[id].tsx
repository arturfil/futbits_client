import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getProfileFromUserId } from "../../../features/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export default function editProfile() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);
  const router = useRouter();
  const id = router.query["id"];

  useEffect(() => {
    if (!id) return;
    dispatch(getProfileFromUserId(id));
  }, []);

  return (
    <Container>
      <div>{profile ? JSON.stringify(profile) : (
        <Typography variant="h4" fontWeight={600}>Edit Profile</Typography>
      ) }</div>
    </Container>
  );
}

