import { React, useEffect } from "react";
import UserService from "../../services/UserService";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShowCompany from "component/Dashboard/ShowCompany";

const DashboardCompany = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      UserService.getUserInfo()
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);
  return (
    <Box m="1.5rem 2.5rem">
      <ShowCompany /> :
    </Box>
  );
};

export default DashboardCompany;
