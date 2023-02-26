import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getFieldById } from "../../features/fields/fieldSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function FieldDetails() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { singleField} = useAppSelector(state => state.field);
  const id = router.query["id"];
  
  useEffect(() => {
    // makes sure id is a string AND NOT null;
    if (typeof id != 'string' || !id) return;
    dispatch(getFieldById(id));
  }, [id]);

  return (<Container>
    <Typography variant="h2" sx={{fontWeight: "bold"}}>{ singleField?.name } </Typography>
    <Typography variant="h4" sx={{color: "grey"}}>{ singleField?.address } </Typography>
    {singleField?.image ?  <Image src={singleField?.image}/> : "No Image Yet"}
  </Container>);
}
