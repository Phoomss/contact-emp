import { React, useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContractService from "../../services/ContractService";
import CompanyService from "../../services/CompanyService";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const ContractMaster = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseContract = await ContractService.getContracts();
      setContracts(responseContract.data);
      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "number",
      headerName: "เลขที่สัญญา",

      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
      flex:.2
    },
    {
      field: "start_date",
      headerName: "วันที่เริ่ม",
      valueFormatter: (params) => format(new Date(params.value), "d MMM yyyy", { locale: th }),
      flex: .2
    },
    {
      field: "end_date",
      headerName: "วันที่สิ้นสุด",
      valueFormatter: (params) => format(new Date(params.value), "d MMM yyyy", { locale: th }),
      flex: .2
    },
    {
      field: "company_id",
      headerName: "ชื่อบริษัท",
      valueGetter: (params) => {
        const company = companies.find(
          (company) => company.id === params.value
        );
        return company ? company.name : "";
      },
    },
  ];

  const [pageSize, setPageSize] = useState(1);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem" >
      <Box height="calc(24vh)">
        <DataGrid
          rows={contracts}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
    </Box>
  );
};

export default ContractMaster;
