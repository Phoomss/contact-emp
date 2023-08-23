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
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import ContractService from "services/ContractService";
import EmployeeService from "services/EmployeeService";
import ArchiveService from "services/ArchiveService";
import Autocomplete from "@mui/material/Autocomplete";

const CreateArchive = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department1, setDepartment1] = useState("");
  const [department2, setDepartment2] = useState("");
  const [department3, setDepartment3] = useState("");
  const [remark, setRemark] = useState("");

  const [contractList, setContractList] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contractId, setContractId] = useState("");
  const [searchContract, setSearchContract] = useState("");
  const [contractOptions, setContractOptions] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);

  const [employee_id, setEmployee_id] = useState("");
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("employee_id:", employee_id);
      console.log("contract_id:", contractId);
      console.log("department1:", department1);
      console.log("department2:", department2);
      console.log("department3:", department3);
      console.log("remark:", remark);
      const response = await ArchiveService.postArchive({
        employee_id: employee_id,
        contract_id: contractId,
        department1: department1,
        department2: department2,
        department3: department3,
        remark: remark,
      });
      if (response.status === 200) {
        navigate("/archive");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseContract = await ContractService.getContracts();
      setContractList(responseContract.data);
      const responseEmployees = await EmployeeService.getEmployees();
      setEmployees(responseEmployees.data);

      const lastEmployeeId = Math.max(
        ...responseEmployees.data.map((employee) => employee.id)
      );
      setEmployee_id(lastEmployeeId > 0 ? lastEmployeeId : 0);
    };
    fetchData();
  }, []);

  const handleCanClick = () => {
    navigate("/archive");
  };

  // search emp
  const handleSearchEmployee = (event) => {
    setSearchEmployee(event.target.value);
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setEmployeeOptions(filteredEmployees);
  };

  const handleEmployeeSelect = (event, value) => {
    setEmployee_id(value?.id || "");
  };

  // search contract
  const handleSearchContract = (event) => {
    setSearchContract(event.target.value);
    const filteredContracts = contractList.filter((contract) =>
      contract.number.toLowerCase().includes(String(event.target.value).toLowerCase())
    );
    setContractOptions(filteredContracts);
  };

  const handleContractSelect = (event, value) => {
    setContractNumber(value?.number || "");
    setStartDate(value?.start_date || "");
    setEndDate(value?.end_date || "");
    setCompanyId(value?.company_id || "");
    setContractId(value?.id || "");
    setCompanyName(value?.company.name || "");
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มการทำงานลูกจ้าง" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              {/* <Autocomplete
                fullWidth
                margin="normal"
                options={employeeOptions}
                value={selectedEmployee}
                onChange={handleEmployeeSelect}
                onInputChange={handleSearchEmployee}
                getOptionLabel={(employee) => employee.name}
                renderInput={(params) => <TextField {...params} label="Search Employee" />}
              /> */}
              <InputLabel>ชื่อ (ลูกจ้าง)</InputLabel>
              <Select
                fullWidth
                margin="normal"
                value={employee_id}
                onChange={(event) => setEmployee_id(event.target.value)}
              >
                <MenuItem value="" >
                  ----- เลือกลูกจ้าง -----
                </MenuItem>
                {employees.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>เลขที่สัญญา</InputLabel>
              <Autocomplete
                fullWidth
                margin="normal"
                options={contractOptions}
                value={selectedContract}
                onChange={handleContractSelect}
                onInputChange={handleSearchContract}
                getOptionLabel={(option) => option.number}
                renderInput={(params) => (
                  <TextField {...params} label="Search Contract" />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันเริ่ม</InputLabel>
              <TextField fullWidth margin="normal" value={startDate} />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันสิ้นสุด</InputLabel>
              <TextField fullWidth margin="normal" value={endDate} />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>ชื่อบริษัท</InputLabel>
              <TextField fullWidth margin="normal" value={companyName} />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>สังกัดฝ่าย</InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={department1}
                onChange={(e) => setDepartment1(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>สังกัดกอง</InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={department2}
                onChange={(e) => setDepartment2(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>สังกัดแผนก</InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={department3}
                onChange={(e) => setDepartment3(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>หมายเหตุ</InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
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
              onClick={handleCanClick}
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

export default CreateArchive;
