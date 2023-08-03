import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

const Employees = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

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

  const handleDeleteButtonClick = async () => {
    if (selectionModel.length === 0) {
      swal("กรุณาเลือกลูกจ้างอย่างน้อยหนึ่งคนเพื่อลบ.", { icon: "warning" });
      return;
    }

    swal({
      title: "แน่ใจหรือไม่?",
      text: "เมื่อลบแล้ว, ลูกจ้างที่คุณเลือกไว้จะถูกลบหายไป!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await Promise.all(
          selectionModel.map(async (id) => {
            await EmployeeService.deleteEmployee(id);
          })
        );
        setEmployees(
          employees.filter((employee) => !selectionModel.includes(employee.id))
        );
        setSelectionModel([]);
        swal("ลบลูกจ้างที่คุณเลือกเรียบร้อย!", { icon: "success" });
      }
    });
  };

  const createClick = () => {
    navigate(`/createemployee`);
  };

  const handleEditButtonClick = (id) => {
    navigate(`/updateemployee/${id}`);
  };

  const handleArchiveViewClick = (id) => {
    navigate(`/archive/search/${id}`);
  };
  const columns = [
    {
      field: "e_num",
      headerName: "หมายเลขประจำตัว",
      flex: .2
    },
    {
      field: "name",
      headerName: "ชื่อ",
      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
    },
    {
      field: "surname",
      headerName: "นามสกุล",
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
    {
      field: "Functions",
      headerName: "แก้ไขข้อมูล",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CreateOutlined />}
              onClick={() => handleEditButtonClick(params.id)}
            ></Button>
          </Box>
        );
      },
    },
    {
      field: "Archive",
      headerName: "ดูการทำงาน",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RemoveRedEyeOutlinedIcon />}
              onClick={() => handleArchiveViewClick(params.id)}
            ></Button>
          </Box>
        );
      },
      flex: 0.5,
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ลูกจ้างจ้างเหมาบริการ" />
        <Box>
          <FlexBetween gap="1rem">
            <Button
              sx={{
                backgroundColor: theme.palette.blue[300],
                color: theme.palette.neutral.font,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={createClick}
            >
              <PersonAddIcon />
            </Button>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.neutral.font,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleDeleteButtonClick}
            >
              <DeleteOutline />
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        <DataGrid
          sx={{ color: theme.palette.grey[1000] }}
          rows={employees}
          columns={columns}
          getRowId={getRowId}
          checkboxSelection
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
  );
};

export default Employees;
