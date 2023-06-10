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
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeNote, setEmployeeNote] = useState("");
  const [createdEmp, setCreatedEmp] = useState({});
  const [employeeId, setEmployeeId] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployeeService.postEmployee({
        name: employeeName,
        surname: employeeSurname,
        number: employeeNumber,
        telephone: employeePhone,
        note: employeeNote,
      });
      if (response.status === 200) {
        swal("เพิ่มลูกจ้างสำเร็จ!", "success");
        console.log(response.data);
        setCreatedEmp(response.data.data);
        setEmployeeId(response.data.data.id);
        navigate("/employee");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancleClick = () => {
    navigate("/employee");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มพนักงาน" />
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
            <Grid item xs={6}>
              <InputLabel>ชื่อ*: </InputLabel>
              <TextField
                margin="normal"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>

            <Grid item xs={6}>
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
              <InputLabel>เบอร์โทรศัพท์*: </InputLabel>
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
              Create
            </Button>
            <Button
              sx={{ ml: "10px" }}
              variant="outlined"
              onClick={handleCancleClick}
            >
              Cancel
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
