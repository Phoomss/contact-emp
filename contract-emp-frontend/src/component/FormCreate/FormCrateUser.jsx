import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import UserService from "services/UserService";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import CompanyService from "services/CompanyService";

const FormCreateUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [createUser, setCreateUser] = useState({})
  const [userId, setUserId] = useState(0)
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  // const [telephone,setTelePhone] = useState("")
  // const [username,setUserName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.postRegister({
        name: name,
        surname: surname,
        // telephone: telephone,
        // username: username,
        email: email,
        password: password,
        role: role,
        company_Id: companyId, // แนบ company_Id ในข้อมูลที่ส่ง
      });
      if (response && response.data) { // เพิ่มเงื่อนไขการตรวจสอบ response.data
        swal("เพิ่มผู้ใช้งานสำเร็จ", "success");
        console.log(response.data);
        setCreateUser(response.data.data);
        setUserId(response.data.data);

        // ดึงขื่อบริษัทมาแสดง
        const responseCompanies = await CompanyService.getCompanies()
        if (responseCompanies && responseCompanies.data) {
          setCompanies(responseCompanies.data)
        }
        navigate("/userall");
      }else{
        setError("Can not created")
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response?.data?.message); // ปรับเปลี่ยนเพื่อให้ดึงข้อความผิดพลาดจาก response.data.message ถ้ามี
    }
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


  const handleCancelClick = () => {
    navigate("/userall")
  };

  return (
    <Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel>Name:</InputLabel>
              <TextField
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Surname:</InputLabel>
              <TextField
                value={surname}
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                fullWidth
              />
            </Grid>
            {/* <Grid item xs={6}>
              <InputLabel>telephone:</InputLabel>
              <TextField
                value={telephone}
                type="text"
                onChange={(e) => setTelePhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>username:</InputLabel>
              <TextField
                value={username}
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />
            </Grid> */}
            <Grid item xs={6}>
              <InputLabel>Email:</InputLabel>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Password:</InputLabel>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Role:</InputLabel>
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
            {role === "card" && (
              <Grid item xs={6}>
                <InputLabel>Company ID:</InputLabel>
                <Select value={companyId} onChange={(e) => setCompanyId(e.target.value)} fullWidth>
                <MenuItem value="">Select Company</MenuItem>
                {companies.map((company)=>(
                  <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
                ))}
                </Select>
              </Grid>
            )}
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
          <Typography variant="body1" sx={{ marginTop: "1rem", color: "error" }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormCreateUser;
