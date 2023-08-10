import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import ArchiveService from "services/ArchiveService";
import CompanyService from "services/CompanyService";
import ContractService from "services/ContractService";
import EmployeeService from "services/EmployeeService";
import swal from "sweetalert";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";

const Contract_Archive_InfoData = () => {
  const { id } = useParams();
  const [archives, setArchives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseArchive = await ArchiveService.getArchiveByContract(id);
      setArchives(responseArchive.data);
      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);
      const responseContract = await ContractService.getContracts();
      setContracts(responseContract.data);
      const responseEmployee = await EmployeeService.getEmployees();
      setEmployees(responseEmployee.data);
    };
    fetchData();
    console.log(fetchData());
  }, [id]);

  // const filteredArchives = archives.filter(
  //     (archive) => archive.employee_id === employeeId
  // );

  const getRowId = (row) => row.id;

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const columns = [
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
      field: "company_id",
      headerName: "ชื่อบริษัท",
      valueGetter: (params) => {
        const archive = archives.find(
          (archive) => archive.id === params.row.id
        );
        if (archive) {
          const contract = contracts.find(
            (contract) => contract.id === archive.contract_id
          );
          if (contract) {
            const company = companies.find(
              (company) => company.id === contract.company_id
            );
            return company ? company.name : "";
          }
        }
        return "";
      },
      flex: .2
    },
    {
      field: "department1",
      headerName: "สังกัดกอง",
    },
    {
      field: "department2",
      headerName: "สังกัดฝ่าย",
    },
  ];

  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ข้อมูลลูกจ้างที่อยู่ในสัญญา" />
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        <DataGrid
          rows={archives}
          columns={columns}
          getRowId={getRowId}
          checkboxSelection
          // onRowClick={handleRowClick}
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

export default Contract_Archive_InfoData;
