import { CreateOutlined, DeleteOutline } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FlexBetween from 'component/FlexBetween';
import Header from 'component/Header';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from 'services/UserService';

const UserAllData = () => {

    const theme = useTheme();
    const navigate = useNavigate()
    const [Allusers, setAllUsers] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);

    // user
    useEffect(() => {
        const fetchData = async () => {
            const res = await UserService.getAlluser()
            setAllUsers(res.data)
        }
        fetchData()
        console.log(fetchData())
    }, [])

    const getRowId = (row) => row.id;

    const handleSelectionModelChange = (newSelection) => {
        setSelectionModel(newSelection);
    };

    // const handleDeleteButtonClick = async () => {
    //     if (selectionModel.length === 0) {
    //       swal("กรุณาเลือกลูกจ้างอย่างน้อยหนึ่งคนเพื่อลบ.", { icon: "warning" });
    //       return;
    //     }

    //     swal({
    //       title: "แน่ใจหรือไม่?",
    //       text: "เมื่อลบแล้ว, ลูกจ้างที่คุณเลือกไว้จะถูกลบหายไป!",
    //       icon: "warning",
    //       buttons: true,
    //       dangerMode: true,
    //     }).then(async (willDelete) => {
    //       if (willDelete) {
    //         await Promise.all(
    //           selectionModel.map(async (id) => {
    //             await EmployeeService.deleteEmployee(id);
    //           })
    //         );
    //         setAllUsers(employees.filter((employee) => !selectionModel.includes(employee.id)));
    //         setSelectionModel([]);
    //         swal("ลบลูกจ้างที่คุณเลือกเรียบร้อย!", { icon: "success" });
    //       }
    //     });
    //   };


      const handleRowClick = (params) => {
        navigate(`/updateuser/${params.id}`);
      };

    //   const createClick = () => {
    //     navigate(`/createemployee`)
    //   }

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
            field: "telephone",
            headerName: "เบอร์โทรศัพท์",

        },
        {
            field: "email",
            headerName: "อีเมล",

        },
        {
            field: "role",
            headerName: "สถานะ",
        },
        {
            field: "company",
            headerName: "ชื่อบริษัท",
            renderCell: (params) => {
              if (params.value && params.value.name) {
                return (
                  <Box sx={{ cursor: "pointer" }}>
                    {params.value.name}
                  </Box>
                );
              }
              return null; // หรือจะแสดงข้อความเปล่าๆ หรือ Element อื่นๆ ตามที่ต้องการ
            },

        },
        {
            field: "username",
            headerName: "ยูสเซอร์เมน",

        },
    ];

    const [pageSize, setPageSize] = useState(10);

    const handlePageSizeChange = (params) => {
        setPageSize(params.pageSize);
    };

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="ผู้ใข้งาน" />
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
                        // onClick={createClick}
                        >
                            <CreateOutlined sx={{ mr: "10px" }} />
                            เพิ่มข้อมูลผู้ใข้งาน
                        </Button>

                        <Button
                            sx={{
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.neutral.font,
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                        // onClick={handleDeleteButtonClick}
                        >
                            <DeleteOutline sx={{ mr: "10px" }} />
                            ลบข้อมูลผู้ใช้งาน
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
    )
}

export default UserAllData