import { React, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {  useParams } from "react-router-dom";
import ArchiveService from "services/ArchiveService";
import CompanyService from "services/CompanyService";
import ContractService from "services/ContractService";
import EmployeeService from "services/EmployeeService";
import FlexBetween from "component/FlexBetween";
import Header from "component/Header";
import EmployeeMaster from "component/MasterDataTeble/EmployeeMaster";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const ArchiveInfo = () => {
  const { id } = useParams();
  const [employeeId, setEmployeeId] = useState([]);
  const [archives, setArchives] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseArchive = await ArchiveService.getArchiveByIdEmp(id);
      setArchives(responseArchive.data);

      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);

      const responseContract = await ContractService.getContracts();
      setContracts(responseContract.data);

      const responseEmployee = await EmployeeService.getEmployees();
      setEmployees(responseEmployee.data);
    }
    fetchData();
  }, [id]);

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
      flex: .2
    },
    {
      field: "start_date",
      headerName: "วันที่เริ่ม",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.row.contract_id
        );
        return contract ? format(new Date(contract.start_date), "d MMM yyyy", { locale: th }) : "";
      },
      flex: 0.2
    },
    {
      field: "end_date",
      headerName: "วันที่สิ้นสุด",
      valueGetter: (params) => {
        const contract = contracts.find(
          (contract) => contract.id === params.row.contract_id
        );
        return contract ? format(new Date(contract.end_date), "d MMM yyyy", { locale: th }) : "";
      },
      flex: 0.2
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
      field: "org_id",
      headerName: "สังกัดสำนักงาน",
      flex: .2
    },
  ];

  const [pageSize, setPageSize] = useState(10);
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const NoDataRow = () => {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "18px",
        fontWeight: "bold",
      }}>
        ไม่พบข้อมูลประวัติการทำงาน
      </div>
    );
  };
  return (
    <Box m="1.5rem 2.5rem">

      <FlexBetween>
        <Header title={`ประวัติการทำงาน `} />
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        <EmployeeMaster />
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
            NoRowsOverlay: NoDataRow,
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

export default ArchiveInfo;
