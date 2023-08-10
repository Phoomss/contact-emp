import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "services/EmployeeService";
import BadgeIcon from '@mui/icons-material/Badge';
import { Container } from "react-bootstrap";
import FlexBetween from './../FlexBetween';

const ShowCompany = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);

  const fetchEmployeeCount = async () => {
    try {
      const res = await EmployeeService.getEmployees();
      setEmployeeCount(res.data.length);
    } catch (error) {
      console.error("fail count employee :", error);
    }
  };

  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,

      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={2}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Item
              onClick={() => {
                navigate("/employee");
              }}
              sx={{ boxShadow: 3, marginRight: 2, marginLeft: 2, marginBottom: 2, borderRadius: 5, backgroundColor: "#154295", color: "white" }}

            >
              <FlexBetween>
                <Typography variant="h3">{employeeCount} คน</Typography>
                <BadgeIcon sx={{ height: '100%', fontSize: '70PX', color: "gray" }} />
              </FlexBetween>
              <Typography variant="h5">จำนวนพนักงาน</Typography>

            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

export default ShowCompany;
