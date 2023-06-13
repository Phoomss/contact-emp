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
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("employee_id:", employeeId);
      console.log("contract_id:", contractId);
      console.log("department1:", department1);
      console.log("department2:", department2);
      console.log("department3:", department3);
      console.log("remark:", remark);
      const response = await ArchiveService.postArchive({
        employee_id: employeeId,
        contract_id: contractId,
        department1: department1,
        department2: department2,
        department3: department3,
        remark: remark,
      });
      if (response.status === 200) {
        navigate("/employee");
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
      setEmployeeId(lastEmployeeId > 0 ? lastEmployeeId : 0);
    };
    fetchData();
  }, []);

  const handleCanClick = () => {
    navigate("/employee");
  };

  const handleContractSelect = async (event) => {
    const selectedContract = contractList.find(
      (contract) => contract.number === event.target.value
    );
    setContractNumber(selectedContract.number);
    setStartDate(selectedContract.start_date);
    setEndDate(selectedContract.end_date);
    setCompanyId(selectedContract.company_id);
    setContractId(selectedContract.id);

    try {
      const Companyresponse = await CompanyService.getCompanies(
        selectedContract.company_id
      );
      const index = selectedContract.company_id;
      setCompanyName(Companyresponse.data[index - 1].name); // update the state with the name
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
      setCompanyName("N/A");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มการทำงาน" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <InputLabel>Employee</InputLabel>
              <Select
                fullWidth
                margin="normal"
                value={employeeId}
                onChange={(event) => setEmployeeId(event.target.value)}
              >
                {employees && employees.length > 0 ? (
                  employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>เลขที่สัญญา</InputLabel>
              <Select
                fullWidth
                margin="normal"
                value={contractNumber}
                onChange={handleContractSelect}
              >
                {contractList && contractList.length > 0 ? (
                  contractList.map((contract) => (
                    <MenuItem key={contract.id} value={contract.number}>
                      {contract.number}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No contracts found</MenuItem>
                )}
              </Select>
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
              <TextField
                fullWidth
                margin="normal"
                label="Department 1"
                value={department1}
                onChange={(e) => setDepartment1(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Department 2"
                value={department2}
                onChange={(e) => setDepartment2(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Department 3"
                value={department3}
                onChange={(e) => setDepartment3(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
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
              onClick={handleCanClick}
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

export default CreateArchive;
