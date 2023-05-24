import React, { useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CompanyDataGrid from 'component/CompanyDataGrid'

function Company() {
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
      <CompanyDataGrid/>
    </Box>
  );
}

export default Company;
