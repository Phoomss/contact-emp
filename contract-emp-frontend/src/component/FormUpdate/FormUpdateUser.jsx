import Header from "../Header";
import FlexBetween from "../FlexBetween";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Grid,
} from "@mui/material";

const FormUpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [userSurName, setUserSurName] = useState("");
  const [userTelePhone, setUserTelePhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [useName, setUseName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserService.getUserById(id);
        if (response && response.status === 200) {
          const userData = response.data[0];
          setUserName(userData.name);
          setUserSurName(userData.surname);
          setUserTelePhone(userData.telephone);
          setUserEmail(userData.email);
          setUseName(userData.username);
          setUserPassword(userData.password);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error", error);
        setError("An error occurred while fetching user data.");
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userName ||
      !userSurName ||
      !userTelePhone ||
      !userEmail ||
      !useName ||
      !userPassword
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await UserService.updataUser(id, {
        name: userName,
        surname: userSurName,
        telephone: userTelePhone,
        email: userEmail,
        username: useName,
        password: userPassword,
      });
      if (response.status === 200) {
        navigate("/userall");
      }
    } catch (error) {
      console.error("Error", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/userall");
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไขผู้ใช้งาน" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
               <Grid item xs={6}>
              <InputLabel>ชื่อ: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>นามสกุล: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={userSurName}
                onChange={(e) => setUserSurName(e.target.value)}
              />
            </Grid>

             <Grid item xs={6}>
              <InputLabel>เบอร์โทรศัพท์: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={userTelePhone}
                onChange={(e) => setUserTelePhone(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>ยูสเซอร์เมน: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={useName}
                onChange={(e) => setUseName(e.target.value)}
              />
            </Grid>

                <Grid item xs={6}>
              <InputLabel>อีเมล: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>รหัสผ่าน: </InputLabel>
              <TextField
                required
                fullWidth
                margin="normal"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
              อัพเดทข้อมูลผุ้ใช้งาน
            </Button>
            <Button
              sx={{ ml: "10px" }}
              variant="outlined"
              onClick={handleCancelClick}
            >
              ยกเลิก
            </Button>
          </Box>
          {error && (
            <Typography color="error" variant="body1" sx={{ mt: "1rem" }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default FormUpdateUser;
