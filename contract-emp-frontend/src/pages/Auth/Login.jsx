import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import swal from "sweetalert";
import { Login as LoginIcon } from '@mui/icons-material';
import Layout from "component/Layouts/Layout";
import UserService from "services/UserService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.postUserLogin(formData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          swal(`Welcome`, "", "success");
          navigate("/dashboard");
        } else {
          setError("Invalid credentials");
          swal("ไม่พบบัญชีของคุณ", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setError(error.response.data.message);
        swal("Login or password is incorrect", "", "error");
      });
  };

  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 9,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <LoginIcon sx={{ width: 30, height: 30, marginRight: "25px" }} />
              <Typography component="h1" variant="h5">
                เข้าสู่ระบบ
              </Typography>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="ชื่อผู้ใช้งาน"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="รหัสผ่าน"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#FFCC00' }}
            >
              เข้าสู่ระบบ
            </Button>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Login;
