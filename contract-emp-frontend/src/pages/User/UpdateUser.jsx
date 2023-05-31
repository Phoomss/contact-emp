import React, { useEffect } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import FormUpdateUser from 'component/FormUpdate/FormUpdateUser';

function UpdateUser() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
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
      <FormUpdateUser/>
    </Box>
  );
}

export default UpdateUser;
