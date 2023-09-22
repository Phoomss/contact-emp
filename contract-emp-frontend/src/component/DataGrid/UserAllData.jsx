import { CreateOutlined, DeleteOutline } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";
import swal from "sweetalert";

const UserAllData = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [Allusers, setAllUsers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  // user
  useEffect(() => {
    const fetchData = async () => {
      const res = await UserService.getAlluser();
      setAllUsers(res.data);
    };
    fetchData();
    console.log(fetchData());
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
            await UserService.deleteUser(id);
          })
        );
        setAllUsers(
          Allusers.filter((user) => !selectionModel.includes(user.id))
        );
        setSelectionModel([]);
        swal("ลบลูกจ้างที่คุณเลือกเรียบร้อย!", { icon: "success" });
      }
    });
  };

  const createClick = () => {
    navigate(`/createuser`);
  };

  const handleEditButtonClick = (id) => {
    navigate(`/updateuser/${id}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "ชื่อ",

      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
      flex: .2
    },
    {
      field: "surname",
      headerName: "นามสกุล",
      flex: .2
    },
    {
      field: "telephone",
      headerName: "เบอร์โทรศัพท์",
      flex: .2
    },
    {
      field: "email",
      headerName: "อีเมล",
      flex: .2
    },
    {
      field: "role",
      headerName: "สถานะ",
      flex: .2
    },
    {
      field: "company",
      headerName: "ชื่อบริษัท",
      renderCell: (params) => {
        if (params.value && params.value.name) {
          return <Box sx={{ cursor: "pointer" }}>{params.value.name}</Box>;
        }
        return null; // หรือจะแสดงข้อความเปล่าๆ หรือ Element อื่นๆ ตามที่ต้องการ
      },
      flex: .2
    },
    {
      field: "username",
      headerName: "ยูสเซอร์เนม",
      flex: .2
    },
    {
      field: "Edit",
      headerName: "แก้ไขข้อมูล",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditButtonClick(params.id)}
            >
              แก้ไขข้อมูล
            </Button>
          </Box>
        );
      },
      flex: .2
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ข้อมูลผู้ใช้งาน" />
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
             เพิ่มข้อมูล
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
            ลบข้อมูล
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        <DataGrid
          sx={{ color: theme.palette.grey[1000] }}
          rows={Allusers}
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
          componentsProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Box>
  );
};

export default UserAllData;
