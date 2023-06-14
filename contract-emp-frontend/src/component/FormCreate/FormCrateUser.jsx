import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UserService from "services/UserService";
import CompanyService from "services/CompanyService";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";

const FormCrateUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [telephone, setTelePhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [username, setUserName] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [createUser, setCreateUser] = useState({});
  const [userId, setUserId] = useState(0);
  const [companies, setCompanies] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseUser = await UserService.postRegister({
        name: name,
        surname: surname,
        telephone: telephone,
        email: email,
        role: role,
        username: username,
        password: password,
        company_id: company_id,
      });
      if (responseUser.status === 201) {
        swal("เพิ่มผู้ใช้งานสำเร็จ", "", "success");
        console.log(responseUser.data);
        setCreateUser(responseUser.data.data);
        setUserId(responseUser.data.data.id);
        navigate("/userall");
      } else {
        setError("ไม่สามารถสร้างข้อมูลได้");
      }
    } catch (error) {
      console.error("Error", error.responseUser);
      setError(error.responseUser.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/userall");
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await CompanyService.getCompanies();
        if (response && response.data) {
          setCompanies(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <Box>
      <FlexBetween>
        <Header title="เพิ่มผู้ใช้งาน" />
      </FlexBetween>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel>ชื่อ:</InputLabel>
              <TextField
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>นามสกุล:</InputLabel>
              <TextField
                value={surname}
                type="text"
                onChange={(e) => setSurName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>เบอร์โทรศัพท์:</InputLabel>
              <TextField
                value={telephone}
                type="text"
                onChange={(e) => setTelePhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>อีเมล:</InputLabel>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>ชื่อผู้ใช้:</InputLabel>
              <TextField
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>รหัสผ่าน:</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>สถานะ:</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </Grid>
            {/* {role === "card" && ( */}
            <Grid item xs={6}>
              <InputLabel>Company:</InputLabel>
              <Select
                value={company_id}
                onChange={(e) => setCompany_id(e.target.value)}
                fullWidth
              >
                <MenuItem value="">Select Company</MenuItem>
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* )} */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Create
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelClick}
                sx={{ marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
        {message && (
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography
            variant="body1"
            sx={{ marginTop: "1rem", color: "error" }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormCrateUser;
