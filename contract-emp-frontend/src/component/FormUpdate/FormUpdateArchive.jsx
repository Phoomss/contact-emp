import { Autocomplete, Box, Button, Typography, TextField } from "@mui/material";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveService from "services/ArchiveService";
import DeptService from "services/DeptService";
import swal from "sweetalert";

const FormUpdateArchive = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [contractId, setContractId] = useState("");
  const [org_id, setOrg_id] = useState("");
  const [remark, setRemark] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ArchiveService.getArchiveById(id);
        if (response.status === 200) {
          setEmployeeId(response.data[0].employee.name);
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
        navigate("/archive");
        swal(`อัพเดทข้อมูลสำเร็จ`, "", "success");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
    }
  };

  const handleCancelClick = () => {
    navigate("/archive");
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
    setOrg_id(value)
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="แก้ไขการทำงาน" />
      </FlexBetween>
      <Box sx={{ mt: "1.5rem" }}>
        <form onSubmit={handleSubmit}>
          <Typography>เลขที่สัญญา: </Typography>
          <TextField
            required
            fullWidth
            disabled
            margin="normal"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
          />

          <Typography>ชื่่อลูกจ้าง: </Typography>
          <TextField
            required
            fullWidth
            disabled
            margin="normal"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

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

          <Typography>ความคิดเห็น: </Typography>
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
