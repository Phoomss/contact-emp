import { React, useState, useEffect } from "react";
import UserService from '../services/UserService';
import Header from 'component/Header';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import FlexBetween from "../component/FlexBetween";
import swal from 'sweetalert'

const Dashboard = () => {

  return (
    <Box>
      <Header title="DASHBOARD" subtitle="See your list of dashboard." />
      <Box m="1.5rem 2.5rem">
      </Box>

    </Box>
  );
}

export default Dashboard