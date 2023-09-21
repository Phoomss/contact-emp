import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "services/EmployeeService";
import CompanyService from "services/CompanyService";
import Description from "@mui/icons-material/Description";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from '@mui/icons-material/Badge';
import ContractService from "services/ContractService";
import UserService from "services/UserService";
import { Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BarChart from "component/Chart/BarChart";
import FlexBetween from './../FlexBetween';

const ShowDashBoard = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [contractCount, setContractCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const fetchEmployeeCount = async () => {
    try {
      const res = await EmployeeService.getEmployees();
      setEmployeeCount(res.data.length);
    } catch (error) {
      console.error("fail count employee :", error);
    }
  };

  const fetchCompanyCount = async () => {
    try {
      const res = await CompanyService.getCompanies();
      setCompanyCount(res.data.length);
    } catch (error) {
      console.error("fail count company :", error);
    }
  };

  const fetchContractCount = async () => {
    try {
      const res = await ContractService.getContracts();
      setContractCount(res.data.length);
    } catch (error) {
      console.error("fail count contract :", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await UserService.getAlluser();
      setUserCount(res.data.length);
    } catch (error) {
      console.error("fail count user :", error);
    }
  };

  useEffect(() => {
    fetchCompanyCount();
    fetchEmployeeCount();
    fetchUserCount();
    fetchContractCount();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth="xl" sx={{ width: "100%" }}>
        <Grid container spacing={2}>

          <Grid xs={12} sm={6} lg={6}>
            <Item
              onClick={() => {
                navigate("/contract");
              }}
              sx={{ boxShadow: 3, marginRight: 2, marginLeft: 2, marginBottom: 2, borderRadius: 7, backgroundColor: "#E5B700", color: "white"}}
            >
              <FlexBetween>
                <Typography variant="h1" sx={{paddingLeft:'12rem'}}>{contractCount} </Typography>
                <Description sx={{ height: '150px', fontSize: '70px', color: "white" }} />
              </FlexBetween>
              <hr style={{ color: "white" }} />
              <Typography variant="h5">ข้อมูลสัญญาจ้าง</Typography>
            </Item>
          </Grid>

          <Grid xs={12} sm={6} lg={6}>
            <Item
              onClick={() => {
                navigate("/company");
              }}
              sx={{ boxShadow: 3, marginRight: 2, marginLeft: 2, marginBottom: 2, borderRadius: 7, backgroundColor: "#E4032D", color: "white" }}
            >
              <FlexBetween>
                <Typography variant="h1" sx={{paddingLeft:'12rem'}}>{companyCount} </Typography>
                <ApartmentIcon sx={{ height: '150px', fontSize: '70px', color: "white" }} />
              </FlexBetween>
              <hr style={{ color: "white" }} />
              <Typography variant="h5">ข้อมูลบริษัท</Typography>
            </Item>
          </Grid>

          <Grid xs={12} sm={6} lg={6}>
            <Item
              onClick={() => {
                navigate("/employee");
              }}
              sx={{ boxShadow: 3, marginRight: 2, marginLeft: 2, marginBottom: 2, borderRadius: 7, backgroundColor: "#154295", color: "white" }}
            >
              <FlexBetween>
                <Typography variant="h1" sx={{paddingLeft:'12rem'}}>{employeeCount} </Typography>
                <BadgeIcon sx={{ height: '150px', fontSize: '70PX', color: "white" }} />
              </FlexBetween>
              <hr style={{ color: "white" }} />
              <Typography variant="h5">จำนวนลูกจ้าง</Typography>
            </Item>
          </Grid>

          <Grid xs={12} sm={6} lg={6}>
            <Item
              onClick={() => {
                navigate("/userall");
              }}
              sx={{ boxShadow: 3, marginRight: 2, marginLeft: 2, marginBottom: 2, borderRadius: 7, backgroundColor: "#15952C", color: "white" }}
            >
              <FlexBetween>
                <Typography variant="h1" sx={{paddingLeft:'12rem'}}>{userCount} </Typography>
                <PersonIcon sx={{ height: '150px', fontSize: '70PX', color: "white" }} />
              </FlexBetween>
              <hr style={{ color: "white" }} />
              <Typography variant="h5">จำนวนผู้ใช้งาน</Typography>
            </Item>
          </Grid>

          {/* <Grid xs={12} sm={12} lg={12}>
            <Card sx={{ height: '60vh', boxShadow: 3, borderRadius: 5 }}>
              <CardContent>
                <BarChart />
              </CardContent>
            </Card>
          </Grid> */}
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

export default ShowDashBoard;
