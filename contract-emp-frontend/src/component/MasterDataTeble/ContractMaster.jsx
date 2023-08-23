import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ContractService from "../../services/ContractService";
import CompanyService from "../../services/CompanyService";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

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
      flex:.2
    },
    {
      field: "end_date",
      headerName: "วันที่สิ้นสุด",
      flex:.2
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
