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
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

const UpdateEmployees = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employeetitle, setEmployeeTitle] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeNote, setEmployeeNote] = useState("");
  const [employeeIdCard, setEmployeeIdCard] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        if (response.status === 200) {
          setEmployeeTitle(response.data[0].title)
          setEmployeeName(response.data[0].name);
          setEmployeeSurname(response.data[0].surname);
          setEmployeeNumber(response.data[0].e_num);
          setEmployeePhone(response.data[0].telephone);
          setEmployeeNote(response.data[0].note);
          setEmployeeIdCard(response.data[0].e_Idcard);
        }
      } catch (error) {
        console.error("Error:", error.response);
        setError(error.response.data.message);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployeeService.updateEmployee(id, {
        titel: employeetitle,
        name: employeeName,
        surname: employeeSurname,
        e_number: employeeNumber,
        e_Idcard: employeeIdCard,
        telephone: employeePhone,
        note: employeeNote,
      });
      if (response.status === 200) {
        navigate("/employee");
        swal(`อัพเดทข้อมูลสำเร็จ`, "", "success");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/employee");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไขข้อมูลลูกจ้าง" />
      </FlexBetween>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt="1.5rem"
          >
            <Grid item xs={12}>
              <InputLabel>เลขประจำตัว*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                disabled
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt="1.5rem"
          >
            <Grid item xs={2} >
              <InputLabel sx={{ mb: 2 }}>คำนำหน้า*:</InputLabel>
              <Select
                value={employeetitle}
                onChange={(e) => setEmployeeTitle(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>--------------เลือกคำนำหน้า--------------</MenuItem>
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="น.ส.">น.ส.</MenuItem>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs</MenuItem>
                <MenuItem value="Ms.">Ms</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={5}>
              <InputLabel>ชื่อ*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={5}>
              <InputLabel>นามสกุล*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeSurname}
                onChange={(e) => setEmployeeSurname(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt="1.5rem"
          >
            <Grid item xs={12}>
              <InputLabel>หมายเลขบัตรประชาชน*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeIdCard}
                onChange={(e) => setEmployeeIdCard(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt="1.5rem"
          >
            <Grid item xs={12}>
              <InputLabel>หมายเลขเบอร์โทรศัพท์*: </InputLabel>
              <TextField
                margin="normal"
                value={employeePhone}
                onChange={(e) => setEmployeePhone(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            mt="1.5rem"
          >
            <Grid item xs={12}>
              <InputLabel>หมายเหตุ: </InputLabel>
              <TextField
                margin="normal"
                value={employeeNote}
                onChange={(e) => setEmployeeNote(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              ยืนยัน
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

export default UpdateEmployees;
