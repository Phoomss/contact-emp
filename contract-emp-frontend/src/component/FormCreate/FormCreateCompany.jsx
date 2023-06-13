import React, { useState } from "react";
import { Box, TextField, Button, Typography, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";

const CreateCompanies = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CompanyService.postCompany({
        name: companyName,
        address: companyAddress,
        telephone: companyPhone,
      });
      if (response.status === 200) {
        navigate("/company");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancleClick = () => {
    navigate("/company");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="เพิ่มบริษัท"/>
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <InputLabel>Company Name: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            helperText=""
          />
          <InputLabel>Company Address: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
          <InputLabel>Company Phone: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
          />
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

export default CreateCompanies;
