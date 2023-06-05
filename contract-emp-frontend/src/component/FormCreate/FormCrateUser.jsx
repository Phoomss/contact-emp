import React, { useState } from "react";
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

const FormCreateUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelePhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [createuser, setCreateUser] = useState({});
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.postRegister({
        name,
        surname,
        telephone,
        username,
        email,
        password,
        role,
        company_id: companyId,
      });
      if (response.status === 200) {
        swal("เพิ่มลูกจ้างสำเร็จ!", "success");
        console.log(response.data);
        setCreateUser(response.data.data);
        setUserId(response.data.data.id);
        navigate("/userall");
      }else{
        setMessage(response.data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/userall");
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
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Surname:</InputLabel>
              <TextField
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>เบอร์โทรศัพท์:</InputLabel>
              <TextField
                value={telephone}
                onChange={(e) => setTelePhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>ยูสเซอร์เนม:</InputLabel>
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>
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
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </Grid>
            {role === "card" && (
              <Grid item xs={6}>
                <InputLabel>Company ID:</InputLabel>
                <TextField
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  fullWidth
                />
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

export default FormCreateUser;
