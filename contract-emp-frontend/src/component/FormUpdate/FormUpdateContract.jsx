import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContractService from "services/ContractService";

const FormUpdateContract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ContractService.getContractById(id);
        if (response && response.status === 200 && response.data.length > 0) {
          const contractData = response.data[0];
          setContractNumber(contractData.number);
          setStart_Date(contractData.start_date);
          setEnd_Date(contractData.end_date);
          const company = contractData.company;
          setCompanyId(company.id);
          setCompanyName(company.name); // Set the company name
        } else {
          setError("Contract not found.");
        }
      } catch (error) {
        console.error("Error", error.response);
        setError(error.response?.data?.message || "An error occurred.");
      }
    }
    fetchData();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contractNumber || !start_date || !end_date || !companyId) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await ContractService.updateContract(id, {
        number: contractNumber,
        start_date: start_date,
        end_date: end_date,
        company_id: companyId,
      });
      if (response.status === 200) {
        navigate("/contract");
      }
    } catch (error) {
      console.error("Error", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/contract");
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไข สัญญาจ้าง" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <InputLabel>เลขที่สัญญา: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                helperText=""
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>ชื่อบริษัท: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                value={companyName}
                disabled
                helperText=""
              />
            </Grid>


            <Grid item xs={6}>
              <InputLabel>วันเริ่ม: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={start_date}
                onChange={(e) => {
                  const selectedDate = e.target.value; // Ensure this is in "YYYY-MM-DD" format
                  setStart_Date(selectedDate);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันที่สิ้นสุด: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={end_date}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  console.log("Selected End Date:", selectedDate);
                  setEnd_Date(selectedDate);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel>หมายเหตุ: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                // value={contractNumber}
                // onChange={(e) => setContractNumber(e.target.value)}
                helperText=""
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
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

export default FormUpdateContract;
