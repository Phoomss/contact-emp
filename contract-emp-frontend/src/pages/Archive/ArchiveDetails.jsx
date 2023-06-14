import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ArchiveInfo from "component/DataGrid/ArchiveInfo";

function ArchiveDetails() {
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
    <Box>
      <ArchiveInfo />
    </Box>
  );
}

export default ArchiveDetails;
