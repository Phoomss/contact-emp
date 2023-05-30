import React, { useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import FlexBetween from 'component/FlexBetween';
import { useTheme } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';
import UserInfoDataGrid from '../component/DataGrid/UserInfoDataGrid';

function UserInfo() {
  const navigate = useNavigate();
  const theme = useTheme()

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
    <Box m="1.5rem 2.5rem">
        <UserInfoDataGrid/>
    </Box>
  );
}

export default UserInfo;
