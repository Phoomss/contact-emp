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
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
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
              sx={{ boxShadow: 3 ,marginRight:2,marginBottom:2,borderRadius:5}}
              
            >
              <Description sx={{ height: '100%',fontSize:'100px' }} />
              <Typography variant="h3">ข้อมูลสัญญาจ้าง</Typography>
              <Typography variant="h5">{contractCount} สัญญาจ้าง</Typography>
            </Item>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Item
              onClick={() => {
                navigate("/employee");
              }}
              sx={{ boxShadow: 3 ,marginRight:2,marginBottom:2,borderRadius:5}}
              
            >
              <ApartmentIcon sx={{ height: '100%',fontSize:'100px' }} />
              <Typography variant="h3">ข้อมูลบริษัท</Typography>
              <Typography variant="h5">{companyCount} บริษัท</Typography>
            </Item>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Item
              onClick={() => {
                navigate("/employee");
              }}
              sx={{ boxShadow: 3 ,marginRight:2,marginBottom:2,borderRadius:5}}
              
            >
              <BadgeIcon sx={{ height: '100%',fontSize:'100px' }} />
              <Typography variant="h3">จำนวนพนักงาน</Typography>
              <Typography variant="h5">{employeeCount} คน</Typography>
            </Item>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Item
              onClick={() => {
                navigate("/employee");
              }}
              sx={{ boxShadow: 3 ,marginRight:2,marginBottom:2,borderRadius:5}}
              
            >
              <PersonIcon sx={{ height: '100%',fontSize:'100px' }} />
              <Typography variant="h3">จำนวนผู้ใช้งาน</Typography>
              <Typography variant="h5">{userCount} คน</Typography>
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

export default ShowDashBoard;
