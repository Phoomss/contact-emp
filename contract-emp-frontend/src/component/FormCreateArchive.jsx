import React, { useState, useEffect } from "react";
import {
 Box,
 TextField,
 Button,
 Typography,
 InputLabel,
 Select,
 MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CompanyService from "../services/CompanyService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
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
 const [remark, setRemark] = useState("");
 const [contractList, setContractList] = useState([]);
 const [companyId, setCompanyId] = useState("");
 const [companyName, setCompanyName] = useState("");
 const [contractId, setContractId] = useState("");
 const [employeeId, setEmployeeId] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   console.log("employee_id:", employeeId);
   console.log("contract_id:", contractId);
   console.log("department1:", department1);
   console.log("department2:", department2);
   console.log("remark:", remark);
   const response = await ArchiveService.postArchive({
    employee_id: employeeId,
    contract_id: contractId,
    department1: department1,
    department2: department2,
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
   const employees = await EmployeeService.getEmployees();
   const lastEmployeeId = Math.max(...employees.map((employee) => employee.id));
   setEmployeeId(lastEmployeeId > 0 ? lastEmployeeId : 0);
  };
  fetchData();
 }, []);

 const handleCancleClick = () => {
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
    <Header title="CREATE ARCHIVE" subtitle="Create new archive" />
   </FlexBetween>
   <Box sx={{ mt: "1.5rem" }}>
    <form onSubmit={handleSubmit}>
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
     <InputLabel>วันเริ่ม</InputLabel>
     <TextField fullWidth margin="normal" value={startDate} />
     <InputLabel>วันสิ้นสุด</InputLabel>

     <TextField fullWidth margin="normal" value={endDate} />
     <InputLabel>ชื่อบริษัท</InputLabel>
     <TextField fullWidth margin="normal" value={companyName} />
     <TextField
      fullWidth
      margin="normal"
      label="Department 1"
      value={department1}
      onChange={(e) => setDepartment1(e.target.value)}
     />
     <TextField
      fullWidth
      margin="normal"
      label="Department 2"
      value={department2}
      onChange={(e) => setDepartment2(e.target.value)}
     />
     <TextField
      fullWidth
      margin="normal"
      label="Remark"
      value={remark}
      onChange={(e) => setRemark(e.target.value)}
     />
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

export default CreateArchive;
