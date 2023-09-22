import { React, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import ArchiveService from "services/ArchiveService";
import CompanyService from "services/CompanyService";
import ContractService from "services/ContractService";
import EmployeeService from "services/EmployeeService";
import ContractMaster from "component/MasterDataTeble/ContractMaster";

const Contract_Archive_InfoData = () => {
  const { id } = useParams();
  const [archives, setArchives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const [contractId, setContractId] = useState("")

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
      field: "title",
      headerName: "คำนำหน้า",
      valueGetter: (params) => {
        const employee = employees.find(
          (employee) => employee.id === params.row.employee_id
        );
        return employee ? employee.title : "";
      },
      flex: .2
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
      flex: .2
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
      flex: .2
    },
    {
      field: "org_id",
      headerName: "สังกัดสำนักงาน",
      flex: .2
    },
  ];

  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      
      <Box height="calc(100vh - 200px)" >
        <ContractMaster />
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

export default Contract_Archive_InfoData;
