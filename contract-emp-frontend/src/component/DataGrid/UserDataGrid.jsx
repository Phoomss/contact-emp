import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from 'sweetalert'
import UserService from "services/UserService";

const Users = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserService.getUserInfo();
      setUsers(response.data);
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
            await UserService.deleteEmployee(id);
          })
        );
        setUsers(users.filter((user) => !selectionModel.includes(user.id)));
        setSelectionModel([]);
        swal("ลบลูกจ้างที่คุณเลือกเรียบร้อย!", { icon: "success" });
      }
    });
  };
  

  const handleRowClick = (params) => {
    navigate(`/update-user/${params.id}`);
  };

  const createClick = () => {
    navigate(`/create-user`)
  }

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
      field: "telephone",
      headerName: "เบอร์โทรศัพท์",
     
    },
    {
        field: "role",
        headerName: "สถานะ",
        
    },
    {
        field: "company_id",
        headerName: "ชื่อบริษัท",
        
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
  setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
  <FlexBetween>
    <Header title="ผู้ใช้งาน" />
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
          onClick = {createClick}
        >
          <CreateOutlined sx={{ mr: "10px" }} />
          เพิ่มลูกจ้าง
        </Button>
        
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.neutral.font,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick = {handleDeleteButtonClick}
        >
          <DeleteOutline sx={{ mr: "10px" }} />
          ลบลูกจ้าง
        </Button>
      </FlexBetween>
      </Box>
  </FlexBetween>
  <Box height="calc(100vh - 200px)"  sx={{ mt: "1.5rem" }}>
    <DataGrid
      sx={{color: theme.palette.grey[1000]}}
      rows={users}
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


  );
};

export default Users
