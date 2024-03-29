import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";

const UpdateCompanies = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CompanyService.getCompanyById(id);
        if (response.status === 200) {
          setCompanyName(response.data[0].name);
          setCompanyAddress(response.data[0].address);
          setCompanyPhone(response.data[0].telephone);
        }
      } catch (error) {
        console.error("Error:", error.response);
        setError(error.response.data.message);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || !companyAddress || !companyPhone) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await CompanyService.updateCompany(id, {
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

  const handleCancelClick = () => {
    navigate("/company");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไข บริษัท" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <InputLabel>ชื่อบริษัท: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputLabel>ที่อยู่บริษัท: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
          <InputLabel>เบอร์โทรบริษัท: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
          />
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

export default UpdateCompanies;
