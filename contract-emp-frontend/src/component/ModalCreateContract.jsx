import React, { useState, useEffect } from "react";
import {
 Box,
 TextField,
 Button,
 Typography,
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Select,
 MenuItem,
 InputLabel,
 Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContractService from "../services/ContractService";
import ArchiveService from "services/ArchiveService";
import CompanyService from "../services/CompanyService";
import FlexBetween from "./FlexBetween";

const CreateContractsModal = ({ open, onClose }) => {
 const navigate = useNavigate();
 const [error, setError] = useState("");
 const [contractNumber, setContractNumber] = useState("");
 const [startDate, setStartDate] = useState("");
 const [endDate, setEndDate] = useState("");
 const [department1, setDepartment1] = useState("");
 const [department2, setDepartment2] = useState("");
 const [companyId, setCompanyId] = useState("");
 const [companyName, setCompanyName] = useState("");
 const [contractId, setContractId] = useState("");
 const [remark, setRemark] = useState("");
 const [contractList, setContractList] = useState([]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const Archiveresponse = await ArchiveService.postArchive({
    contract_id: contractId,
    department1: department1,
    department2: department2,
    remark: remark,
   });
   if (Archiveresponse.status === 200) {
    onClose();
    navigate("/contract");
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
  };
  fetchData();
 }, []);

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
   const response = await CompanyService.getCompanies(
    selectedContract.company_id
   );
   console.log(response.data);
   const index = selectedContract.company_id;
   console.log(response.data[index - 1].name);
   setCompanyName(response.data[index - 1].name); // update the state with the name
  } catch (error) {
   console.error("Error:", error.response);
   setError(error.response.data.message);
   setCompanyName("N/A");
  }
 };

 return (
  <Dialog open={open} onClose={onClose}>
   <Box>
    <FlexBetween>
     <DialogTitle>Create Contract</DialogTitle>
    </FlexBetween>
    <DialogContent>
     <form onSubmit={handleSubmit}>
      <FlexBetween sx={{ mt: "1.5rem" }}>
       <Grid container spacing={2}>
        <Grid container item xs={6} direction="column">
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
         <InputLabel>กอง</InputLabel>
         <TextField
          fullWidth
          margin="normal"
          value={department1}
          onChange={(e) => setDepartment1(e.target.value)}
         />
        </Grid>
        <Grid container item xs={6} direction="column">
         <InputLabel>ชื่อบริษัท</InputLabel>
         <TextField fullWidth margin="normal" value={companyName} />
         <InputLabel>วันสิ้นสุด</InputLabel>
         <TextField fullWidth margin="normal" value={endDate} />
         <InputLabel>ฝ่าย</InputLabel>
         <TextField
          fullWidth
          margin="normal"
          value={department2}
          onChange={(e) => setDepartment2(e.target.value)}
         />
        </Grid>
       </Grid>
      </FlexBetween>
      <InputLabel>หมายเหตุ</InputLabel>
      <TextField
       fullWidth
       margin="normal"
       value={remark}
       onChange={(e) => setRemark(e.target.value)}
      />

      {error && (
       <Typography color="error" variant="body1" sx={{ mt: "1rem" }}>
        {error}
       </Typography>
      )}
     </form>
    </DialogContent>
    <DialogActions>
     <Button onClick={onClose}>Cancel</Button>
     <Button onClick={handleSubmit}>Create</Button>
    </DialogActions>
   </Box>
  </Dialog>
 );
};

export default CreateContractsModal;
