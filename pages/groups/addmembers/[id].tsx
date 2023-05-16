import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { searchUser } from "../../../features/account/accountSlice";
import { useRouter } from "next/router";
import CustomSelector from "../../../components/CustomSelector";
import { Member } from "../../../interfaces/Member";
import { createMember } from "../../../features/members/memberSlice";

export default function AddMember() {
  const router = useRouter();
  const id = router.query["id"];
  const [term, setTerm] = useState<string>("");
  const [user, setUser] = useState<Member>({
    user_id: "",
    group_id: "",
    member_type: "",
  });
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.account);

  function onSearch() {
    dispatch(searchUser(term));
  }

  function onSelectUser(e: MouseEvent<HTMLButtonElement>, id: string) {
    setUser({...user, user_id: id});
  }

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(createMember(user));
  }

  useEffect(() => {
    return setUser({ ...user, group_id: id });
  }, [id])

  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Add A Member</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600} variant="h6">Member to Submit:</Typography>
          <Typography>member id: {user.user_id ? user.user_id : "No user selected yet"}</Typography>
          <Typography>group id: {user.group_id}</Typography>
          <Typography>member type: {user.member_type ? user.member_type : 'member type not chosen'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Search by name, lastname or email </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search User Here
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type="text"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={onSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search User Here"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={(e) => onSelectUser(e, user.id!)}
                          variant="contained"
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <CustomSelector
            title="Member Type"
            setState={setUser}
            state={user}
            keyName="member_type"
            values={["admin", "normal"]}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
