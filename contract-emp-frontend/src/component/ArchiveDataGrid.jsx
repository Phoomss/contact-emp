import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ArchiveService from "../services/ArchiveService";
import CompanyService from "../services/CompanyService";
import EmployeeService from "../services/EmployeeService";
import ContractService from "../services/ContractService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import swal from "sweetalert";

const Archives = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [archives, setArchives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseArchive = await ArchiveService.getArchives();
      setArchives(responseArchive.data);
      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);
      const responseContract = await ContractService.getContracts();
      setContracts(responseContract.data);
      const responseEmployee = await EmployeeService.getEmployees();
      setEmployees(responseEmployee.data);
    };
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleDeleteButtonClick = async () => {
    if (selectionModel.length === 0) {
      swal("กรุณาเลือกสัญญาอย่างน้อยหนึ่งสัญญาเพื่อลบ.", { icon: "warning" });
      return;
    }

    swal({
      title: "แน่ใจหรือไม่?",
      text: "เมื่อลบแล้ว, สัญญาที่คุณเลือกไว้จะถูกลบหายไป!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await Promise.all(
          selectionModel.map(async (id) => {
            await ArchiveService.deleteArchive(id);
          })
        );
        setArchives(
          archives.filter((archive) => !selectionModel.includes(archive.id))
        );
        setSelectionModel([]);
        swal("สัญญาที่คุณเลือกไว้ถูกลบเรียบร้อย!", {
          icon: "success",
        });
      }
    });
  };

  const handleRowClick = (params) => {
    navigate(`/updatearchive/${params.id}`);
  };

  const createClick = () => {
    navigate(`/createarchive`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
    },
    {
      field: "contract_id",
      headerName: "เลขที่สัญญา",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.value
        );
        return contract ? contract.number : "";
      },
    },
    {
      field: "start_date",
      headerName: "วันที่เริ่ม",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.row.contract_id
        );
        return contract ? contract.start_date : "";
      },
    },

    {
      field: "end_date",
      headerName: "วันที่เริ่ม",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.row.contract_id
        );
        return contract ? contract.end_date : "";
      },
    },

    {
      field: "employee_name",
      headerName: "ชื่อ",
      valueGetter: (params) => {
        const employee = employees.find(
          (employee) => employee.id === params.row.employee_id
        );
        return employee ? employee.name : "";
      },
    },
    {
      field: "employee_surname",
      headerName: "นามสกุล",
      valueGetter: (params) => {
        const employee = employees.find(
          (employee) => employee.id === params.row.employee_id
        );
        return employee ? employee.surname : "";
      },
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
      field: "company_id",
      headerName: "ชื่อบริษัท",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.row.id
        );
        if (contract) {
          const company = companies.find(
            (company) => company.id === contract.company_id
          );
          return company ? company.name : "";
        }
        return "";
      },
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="สัญญาจ้าง" />
        <Box>
          <FlexBetween gap="1rem">
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={createClick}
            >
              <CreateOutlined sx={{ mr: "10px" }} />
              เพิ่มสัญญาจ้าง
            </Button>

            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={handleDeleteButtonClick}
            >
              <DeleteOutline sx={{ mr: "10px" }} />
              ลบสัญญาจ้าง
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        <DataGrid
          rows={archives}
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

export default Archives;
