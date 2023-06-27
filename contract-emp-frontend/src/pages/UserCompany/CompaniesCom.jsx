import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ArchiveComData from "component/UseCompany/ArchiveComData";
import CompaniesComData from "component/UseCompany/CompaniesComData";

function CompaniesCom() {
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
      <CompaniesComData />
    </Box>
  );
}

export default CompaniesCom;
