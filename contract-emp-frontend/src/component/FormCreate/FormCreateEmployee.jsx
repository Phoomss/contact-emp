import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  useTheme,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import ContractService from "../../services/ContractService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

const CreateEmployees = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [title, setTitle] = useState("")
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [org_telephone, setOrg_telephone] = useState("");
  const [employeeNote, setEmployeeNote] = useState("");
  const [createdEmp, setCreatedEmp] = useState({});
  const [employeeId, setEmployeeId] = useState(0);
  const [autoNumber, setAutoNumber] = useState(0);
  const [employeeIdCard, setEmployeeIdCard] = useState("");

  useEffect(() => {
    // Fetch employees data and find the highest employeeNumber
    const fetchEmployees = async () => {
      try {
        const response = await EmployeeService.getEmployees();
        const employees = response.data;
        if (employees.length > 0) {
          const maxEmployeeNumber = Math.max(
            ...employees.map((emp) => Number(emp.e_num))
          );
          setAutoNumber(maxEmployeeNumber);
        }
      } catch (error) {
        console.error("Error:", error.response);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeName || !employeeSurname || !employeeIdCard || !employeePhone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const formattedEmployeeNumber = String(autoNumber + 1).padStart(5, "0");
      setEmployeeNumber(formattedEmployeeNumber);
      const response = await EmployeeService.postEmployee({
        title: title,
        name: employeeName,
        surname: employeeSurname,
        e_num: formattedEmployeeNumber,
        e_Idcard: employeeIdCard,
        telephone: employeePhone,
        org_telephone: org_telephone,
        note: employeeNote,
      });
      if (response.status === 200) {
        swal("เพิ่มลูกจ้างสำเร็จ!", "", "success");
        console.log(response.data);
        setCreatedEmp(response.data.data);
        setEmployeeId(response.data.data.id);
        setAutoNumber((prevAutoNumber) => prevAutoNumber + 1);
        navigate("/employee");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleCancleClick = () => {
    navigate("/employee");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มข้อมูลลูกจ้าง" />
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
              <InputLabel>เลขประจำตัว (ลูกจ้าง)*: </InputLabel>
              <TextField
                margin="normal"
                value={autoNumber}
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
            <Grid item xs={4}>
              <InputLabel sx={{mb:2}}>คำนำหน้า*:</InputLabel>
              <Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>--------------เลือกคำนำหน้า--------------</MenuItem>
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="นางสาว">นางสาว</MenuItem>
                <MenuItem value="น.ส.">น.ส.</MenuItem>
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs</MenuItem>
                <MenuItem value="Ms.">Ms</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>ชื่อ*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={4}>
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
                placeholder="Ex. 12345xxxxxxxx"
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
                placeholder="Ex. 088XXXXXX"
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
              onClick={handleCancleClick}
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

export default CreateEmployees;
