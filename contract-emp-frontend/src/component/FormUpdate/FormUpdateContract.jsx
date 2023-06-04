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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ContractService.getContractById(id);
        if (response.status === 200) {
          setContractNumber(response.data[0].number);
          setStart_Date(response.data[0].start_date);
          setEnd_Date(response.data[0].end_date);
          setCompanyId(response.data[0].company_id);
        }
      } catch (error) {
        console.error("Error", error.response);
        setError(error.response.data.message);
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
        <Header title="UPDATE CONTRACT" subtitle="Create new contract" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <InputLabel>เลขที่สัญญา: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={contractNumber}
            onChange={(e) => setContractNumber(e.target.value)}
            helperText=""
          />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <InputLabel>วันเริ่ม: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={start_date}
                onChange={(e) => setStart_Date(new Date(e.target.value))}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันสิ้นสุด: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={end_date}
                onChange={(e) => setEnd_Date(new Date(e.target.value))}
              />
            </Grid>
          </Grid>
          <InputLabel>ชื่อบริษัท: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            helperText=""
          />


          <Box sx={{ mt: "1.5rem" }}>
            <Button type="submit" variant="contained">
              Create
            </Button>
            <Button
              sx={{ ml: "10px" }}
              variant="outlined"
              onClick={handleCancelClick}
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

export default FormUpdateContract;
