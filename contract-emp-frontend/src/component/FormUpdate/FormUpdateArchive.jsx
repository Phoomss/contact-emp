import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveService from "services/ArchiveService";
import swal from "sweetalert";

const FormUpdateArchive = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [contractId, setContractId] = useState("");
  const [org_id, setOrg_id] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ArchiveService.getArchiveById(id);
        if (response.status === 200) {
          setEmployeeId(response.data[0].employee_id);
          setContractId(response.data[0].contract_id);
          setOrg_id(response.data[0].org_id);
          setRemark(response.data[0].remark);
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
    if (
      !employeeId ||
      !contractId ||
      !org_id ||
      !remark
    ) {
      swal(`กรุณากรอกข้อมูลให้ครบถ้วน`, "", "warning");
      return;
    }
    try {
      const response = await ArchiveService.updateArchive(id, {
        employee_id: parseInt(employeeId),
        contract_id: parseInt(contractId),
        org_id,
        remark,
      });
      if (response.status === 200) {
        navigate("/employee");
        swal(`อัพเดทข้อมูลสำเร็จ`, "", "success");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/employee");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไขการทำงาน" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <InputLabel>ชื่่อลูกจ้าง: </InputLabel>
          <TextField
            required
            fullWidth
            disabled
            margin="normal"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <InputLabel>บริษัท: </InputLabel>
          <TextField
            required
            fullWidth
            disabled
            margin="normal"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
          />
          <InputLabel>สังกัดสำนักงาน: </InputLabel>
          <TextField
            required
            fullWidth
            margin="normal"
            value={org_id}
            onChange={(e) => setOrg_id(e.target.value)}
          />
          <InputLabel>ความคิดเห็น: </InputLabel>
          <TextField
            fullWidth
            margin="normal"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
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

export default FormUpdateArchive;
