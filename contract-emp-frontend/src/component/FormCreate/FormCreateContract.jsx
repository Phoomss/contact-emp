import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContractService from "../../services/ContractService";
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "@mui/material/Autocomplete";

const CreateContracts = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [contractStartDate, setContractStartDate] = useState(null);
  const [contractEndDate, setContractEndDate] = useState(null);

  const [contractCompanyId, setContractCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [searchCompany , setSearchCompany] = useState("")
  const [companyOption,setCompanyOption] = useState([])
  const [selectedCompany,setSelectedCompany] = useState(null)

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const response = await CompanyService.getCompanies();
          setCompanies(response.data);
        } catch (error) {
          console.error("Error:", error.response);
          setError(error.response.data.message);
        }
      };
      fetchCompanies();
    }, []);

  // search company
  const handleSearchCompany = (event) => {
    setSearchCompany(event.target.value)
    const filteredCompanies = companies.filter((company)=>
      company.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setCompanyOption(filteredCompanies.map((company)=> company.name))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ContractService.postContract({
        number: contractNumber,
        start_date: contractStartDate,
        end_date: contractEndDate,
        company_id: contractCompanyId,
      });
      if (response.status === 200) {
        navigate("/contract");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancleClick = () => {
    navigate("/contract");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มสัญญาจ้าง" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
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
              <Autocomplete 
                fullWidth
                margin="normal"
                options={companyOption}
                value={selectedCompany}
                onChange={(event,value)=>setSelectedCompany(value)}
                onInputChange={handleSearchCompany}
                renderInput={(params)=>(
                  <TextField {...params} label="Search Company"/>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันเริ่ม: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={
                  contractStartDate
                    ? contractStartDate.toISOString().substr(0, 10)
                    : ""
                }
                onChange={(e) => setContractStartDate(new Date(e.target.value))}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>วันสิ้นสุด: </InputLabel>
              <TextField
                fullWidth
                margin="normal"
                type="date"
                value={
                  contractEndDate
                    ? contractEndDate.toISOString().substr(0, 10)
                    : ""
                }
                onChange={(e) => setContractEndDate(new Date(e.target.value))}
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

export default CreateContracts;
