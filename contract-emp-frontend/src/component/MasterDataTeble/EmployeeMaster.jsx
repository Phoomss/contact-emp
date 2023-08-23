import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

const EmployeeMaster = () => {
    const { id } = useParams()
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await EmployeeService.getEmployeeById(id);
            setEmployees(response.data);
        };
        fetchData();
    }, [id]);

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
    ];

    const [pageSize, setPageSize] = useState(10);

    const handlePageSizeChange = (params) => {
        setPageSize(params.pageSize);
    };

    return (
        <Box m="1.5rem 2.5rem" >
            <Box height="calc(24vh)">
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                />
            </Box>
        </Box>
    );
};

export default EmployeeMaster;
