import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";

const UpdateEmployees = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState('');
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeNote, setEmployeeNote] = useState("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        if (response.status === 200) {
          setEmployeeName(response.data[0].name);
          setEmployeeSurname(response.data[0].surname);
          setEmployeeNumber(response.data[0].number);
          setEmployeePhone(response.data[0].telephone);
          setEmployeeNote(response.data[0].note);
        }
      } catch (error) {
        console.error('Error:', error.response);
        setError(error.response.data.message);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeName || !employeeSurname || !employeeNumber || !employeePhone ) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await EmployeeService.updateEmployee(id, {
        name: employeeName,
        surname: employeeSurname,
        number: employeeNumber,
        telephone: employeePhone,
        note: employeeNote
      });
      if (response.status === 200) {
        navigate("/employee");
      }
    } catch (error) {
      console.error('Error:', error.response);
      setError(error.response.data.message);
    }
  };
  
  
  const handleCancelClick = () => {
    navigate("/employee");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไขพนักงาน" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
        <InputLabel>ชื่อ: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
          <InputLabel>นามสกุล: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={employeeSurname}
            onChange={(e) => setEmployeeSurname(e.target.value)}
          />
          <InputLabel>หมายเลขประจำตัว: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
          />
          <InputLabel>เบอร์โทรศัพท์: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={employeePhone}
            onChange={(e) => setEmployeePhone(e.target.value)}
          />
          <InputLabel>หมายเหตุ: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={employeeNote}
            onChange={(e) => setEmployeeNote(e.target.value)}
          />
          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
              แก้ไขพนักงาน
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
  )
}

export default UpdateEmployees