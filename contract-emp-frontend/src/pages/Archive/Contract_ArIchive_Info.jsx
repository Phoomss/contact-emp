import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Contract_Archive_InfoData from "component/DataGrid/Contract_Archive_InfoData";
import FormCreateArchive from 'component/FormCreate/FormCreateArchive';
import FlexBetween from 'component/FlexBetween';

function Contract_ArIchive_Info() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      UserService.getUserInfo()
        .then(() => { })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  return (
    <Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <FlexBetween>
          <Grid item xs={6}>
            <Contract_Archive_InfoData />
          </Grid>

          <Grid item xs={6}  sx={{mt:"3rem"}}>
            <FormCreateArchive />
          </Grid>
        </FlexBetween>
      </Grid>
    </Box >
  );
}

export default Contract_ArIchive_Info;
