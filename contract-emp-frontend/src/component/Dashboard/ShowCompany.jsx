import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "services/EmployeeService";
import CompanyService from "services/CompanyService";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ContractService from "services/ContractService";
import UserService from "services/UserService";

const ShowCompany = () => {
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item
            onClick={() => {
              navigate("/employee");
            }}
            sx={{ boxShadow: 3 }}
          >
            <SupervisedUserCircleIcon sx={{ fontSize: 40 }} />
            <Typography variant="h3">จำนวนพนักงาน</Typography>
            <Typography variant="h5">{employeeCount} คน</Typography>
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item
            onClick={() => {
              navigate("/company");
            }}
            sx={{ boxShadow: 3 }}
          >
            <ApartmentIcon sx={{ fontSize: 40 }} />
            <Typography variant="h3">จำนวนบริษัท</Typography>
            <Typography variant="h5">{companyCount}</Typography>
          </Item>
        </Grid>
      </Grid>
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
