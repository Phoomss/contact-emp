import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserService from "../../services/UserService";
import swal from "sweetalert";
import LoginIcon from '@mui/icons-material/Login';
import Layout from "component/Layouts/Layout";

const Login = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    UserService.postUserLogin(formData)
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          swal(`Welcome`, "", "success");
          navigate("/company");
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
            <Box sx={{ display: 'flex', }}>
              <LoginIcon sx={{ width: 30, height: 30,marginRight:"25px" }} />
              <Typography component="h1" variant="h5">
                เข้าสู่ระบบ
              </Typography>
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
                id="login"
                label="ชื่อผู้ใช้งาน"
                name="login"
                autoComplete="login"
                autoFocus
                value={formData.login}
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
                color="warning"
                sx={{ mt: 3, mb: 2, backgroundColor: '#FFCC00' }}
              >
                เข้าสู่ระบบ
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>

    </ThemeProvider>
  );
};

export default Login;
