import { React, useState, useEffect } from "react";
import UserService from '../services/UserService';
import Header from 'component/Header';
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import FlexBetween from "../component/FlexBetween";
import swal from 'sweetalert'

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      UserService.getUserInfo()
        .then(() => {

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await EmployeeService.getEmployees();
      setEmployees(response.data);
    };
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleRowClick = () => {
    navigate(`/employee`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "ชื่อ",

      renderCell: (params) => {
        return (
          <Box
            sx={{ cursor: "pointer" }}
          >
            {params.value}
          </Box>
        );
      },
    },
    {
      field: "surname",
      headerName: "นามสกุล",

    },
    {
      field: "number",
      headerName: "หมายเลขประจำตัว",

    },
    {
      field: "telephone",
      headerName: "เบอร์โทรศัพท์",

    },
    {
      field: "department1",
      headerName: "สังกัดกอง",

    },
    {
      field: "department2",
      headerName: "สังกัดฝ่าย",
    },
    {
      field: "company",
      headerName: "ชื่อบริษัท",

    },
    {
      field: "note",
      headerName: "หมายเหตุ",

    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box>
      <Header title="DASHBOARD" subtitle="See your list of dashboard." />
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="ลูกจ้างจ้างเหมาบริการ" />
          <Box>
          </Box>
        </FlexBetween>
        <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
          <DataGrid
            sx={{ color: theme.palette.grey[1000] }}
            rows={employees}
            columns={columns}
            getRowId={getRowId}
            checkboxSelection
            onRowClick={handleRowClick}
            rowsPerPageOptions={[10, 25, 50]}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
            selectionModel={selectionModel}
            onSelectionModelChange={handleSelectionModelChange}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>

    </Box>
  );
}

export default Dashboard