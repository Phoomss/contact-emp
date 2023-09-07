import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
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
import DeptService from "services/DeptService";

const CreateArchive = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [contractNumber, setContractNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [org_id, setOrg_Id] = useState("");
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

  const [departmentName, setDepartmentName] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await ArchiveService.postArchive({
        employee_id: employee_id,
        contract_id: contractId,
        org_id: selectedDepartment,
        remark: remark,
      });
      if (response.status === 200) {
        setIsLoading(false)
        navigate("/archive");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setIsLoading(false)
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
      contract.number.toLowerCase().includes((event.target.value).toLowerCase())
    );
    setContractOptions(filteredContracts);
    setSelectedContract(null);
  };

  const handleContractSelect = (event, value) => {
    setContractNumber(value?.number || "");
    setStartDate(value?.start_date || "");
    setEndDate(value?.end_date || "");
    setCompanyId(value?.company_id || "");
    setContractId(value?.id || "");
    setCompanyName(value?.company.name || "");
  };

  //Search Department 
  const handleSearchDepartment = async (event) => {
    const value = event.target.value;
    setDepartmentName(value);

    try {
      const response = await DeptService.getDepartments(value);
      if (response.status === 200) {
        setDepartmentOptions(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error.response);
    }
  };

  const handleDepartmentSelect = (event, value) => {
    setSelectedDepartment(value);
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
              <Typography>เลขที่สัญญา</Typography>
              <Autocomplete
                fullWidth
                margin="normal"
                options={contractOptions}
                value={selectedContract}
                onChange={handleContractSelect}
                onInputChange={handleSearchContract}
                getOptionLabel={(option) => option.number}
                renderInput={(params) => (
                  <TextField {...params} />
                )}
                clearOnBlur={false}
              />
              {/* <Select
                fullWidth
                margin="normal"
                value={contractId}
                onChange={(event) => {
                  const value = event.target.value;
                  const selectedContract = contractList.find(contract => contract.id === value);
                  handleContractSelect(null, selectedContract); // เรียกใช้งาน handleContractSelect เมื่อผู้ใช้เลือกค่าจาก Select
                }}
              >
                <MenuItem value="" >
                  ----- เลือกเลขที่สัญญา -----
                </MenuItem>
                {contractList.map((contract) => (
                  <MenuItem key={contract.id} value={contract.id}>
                    {contract.number}
                  </MenuItem>
                ))}
              </Select> */}
            </Grid>

            <Grid item xs={12}>
              <Typography>ชื่อบริษัท</Typography>
              <TextField fullWidth margin="normal" value={companyName} />
            </Grid>

            <Grid item xs={6}>
              <Typography>วันเริ่ม</Typography>
              <TextField fullWidth margin="normal" value={startDate} readOnly />
            </Grid>

            <Grid item xs={6}>
              <Typography>วันสิ้นสุด</Typography>
              <TextField fullWidth margin="normal" value={endDate} readOnly />
            </Grid>

            <Grid item xs={12}>
              <Typography>ชื่อ (ลูกจ้าง)</Typography>
              <Autocomplete
                fullWidth
                margin="normal"
                options={employeeOptions}
                value={selectedEmployee}
                onChange={handleEmployeeSelect}
                onInputChange={handleSearchEmployee}
                getOptionLabel={(employee) => employee.name}
                renderInput={(params) => <TextField {...params} />}
                clearOnBlur={false}
              />
              {/* <Typography>ชื่อ (ลูกจ้าง)</Typography>
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
              </Select> */}
            </Grid>

            <Grid item xs={12}>
              <Typography>สังกัดสำนักงาน</Typography>
              <Autocomplete
                fullWidth
                margin="normal"
                options={departmentOptions}
                value={selectedDepartment}
                onChange={handleDepartmentSelect}
                onInputChange={handleSearchDepartment}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>หมายเหตุ</Typography>
              <TextField
                fullWidth
                margin="normal"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained" onClick={handleSubmit} disabled={isLoading}>
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
