import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { createNewGroup } from "../../features/groups/groupSlice";
import { createMember } from "../../features/members/memberSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function CreateGroup() {
  const { user } = useAppSelector(state => state.account)
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createNewGroup({name})).then((res: any) => { // Group Object
      dispatch(createMember({user_id: user?.id, group_id: res.payload.id, member_type: "admin"}));
    })
    
    setName("");
  }

  return (
    <Container sx={{ marginTop: 10, display: "flex", flexDirection: "column"}}>
      <Grid container>
        <Grid item xs={12}>
          <Typography 
            sx={{margin: "0 auto"}} 
            variant="h4" 
            fontWeight={600}
          >
            Create Group
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: 5,
            justifyContent: "center",
            borderRadius: 3,
            minWidth: 400,
            maxWidth: 1000,
            margin: "20px auto",
            backgroundColor: "lightgrey",
          }}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <Typography variant="h5">Name of Group</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name" />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit} fullWidth variant="contained">
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
