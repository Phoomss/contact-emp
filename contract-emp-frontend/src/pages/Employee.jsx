import React, { useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import EmployeeDataGrid from 'component/EmployeeDataGrid'

function Employee() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      UserService.getUserInfo()
        .then(() => {
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  return (
    <Box>
      <EmployeeDataGrid/>
    </Box>
  );
}

export default Employee;