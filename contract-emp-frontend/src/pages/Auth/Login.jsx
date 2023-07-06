import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import LoginIcon from "@mui/icons-material/Login";
import Layout from "component/Layouts/Layout";
import HrApiService from "services/hrApiService";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  
  const submitForm = async (data, e) => {
    e.preventDefault();
    try {
      const { username, password } = data;
      if (!username || !password) {
        return swal("กรุณากรอกข้อมูลให้ครบถ้วน");
      }

      const login = { username, password };
      const res = await UserService.postUserLogin(login);
      if (res.status === 200) {
        const resp = await HrApiService.getEmpData(res.data);
        let output = resp.data.data.result.data[0];
        let foundUser = {
          full_name: output?.person_thai_name,
          first_name: output?.person_thai_thai_firstname,
          last_name: output?.person_thai_thai_lastname,
          org: output?.main_org_thai_name_path,
          tel: output?.work_location[0]?.location?.phone_number
        };
        
        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
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
            <Box sx={{ display: "flex" }}>
              <LoginIcon sx={{ width: 30, height: 30, marginRight: "25px" }} />
              <Typography component="h1" variant="h5">
                เข้าสู่ระบบ
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                type="text"
                className="form-control"
                name="username"
                id="username"
                {...register("username", { required: true })}
                placeholder="EGAT ID"
              />
              {errors.username && (
                <div className="text-danger">กรุณากรอกเลขประจำตัว</div>
              )}
              <TextField
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <div className="text-danger">กรุณารหัสกรอกผ่าน</div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2, backgroundColor: "#FFCC00" }}
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
