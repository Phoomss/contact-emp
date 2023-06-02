import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

import { useTheme } from "@mui/material";
import UserAllData from "component/AllUserAndEmployee/UserAllData";

function UserAll() {
  const navigate = useNavigate();
  const theme = useTheme();

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
      <UserAllData />
    </Box>
  );
}

export default UserAll;
