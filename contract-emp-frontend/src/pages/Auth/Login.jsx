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
import Layout from "../../component/LayoutsLogin/Layout";
import UserService from "services/UserService";
import { Grid } from "@mui/material";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // เช็คว่ามีการกรอกข้อมูลครบถ้วนมั้ย
    if (formData.username === '' || formData.password === '') {
      setError('กรุณากรอกข้อมูล');
      swal("กรุณากรอกข้อมูลก่อนเข้าสู่ระบบ", "", "warning");
      // console.log('Error: Form fields are empty');
      return;
    }
    UserService.postUserLogin(formData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          swal("ยินดีต้อนรับเข้าสู่ระบบ", `${formData.username}`, "success");
          navigate("/employee");
        } else {
          setError("Invalid credentials");
          swal("ไม่พบบัญชีของคุณ", "", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error.response);
        setError(error.response.data.message);
        swal("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง", "", "error");
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
        <Container component="main" maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 9,
            marginBottom: 8,
            padding: '5px',
          }}>
          <CssBaseline />
          <Box
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LoginIcon sx={{ fontSize: "40px" }} />
              <Typography variant="h5">
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
              label="ยูสเซอร์เมน"
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
              sx={{ mt: 3, mb: 2, backgroundColor: '#154295', color: 'white' }}
            >
              เข้าสู่ระบบ
            </Button>

            <Grid container>
              <Grid item xs>
                <Typography variant="body2" sx={{marginBottom:'10px'}}>
                  สำหรับเจ้าหน้าที่งานบัตรรักษาความปลอดภัย: เข้าสู่ระบบด้วยบัญชีอีเมลของ กฟผ.
                </Typography>
                <Typography variant="body2">
                  สำหรับตัวแทนบริษัทผู้รับจ้าง: เข้าสู่ระบบด้วยชื่อผู้ใช้งานและรหัสผ่านที่ออกให้โดย กฟผ.
                </Typography>
              </Grid>

            </Grid>
          </Box>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Login;
