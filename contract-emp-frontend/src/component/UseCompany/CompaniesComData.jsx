import { React, useState, useEffect } from "react";
import { Box, useTheme, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  DownloadOutlined,
  DeleteOutline,
  CreateOutlined,
  FilterList,
} from "@mui/icons-material";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

const CompaniesComData = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [companiesInfo, setCompaniesInfo] = useState(null);
  const [selectionModel, setSelectionModel] = useState([])
  const [loading, setLoading] = useState(true)
  
  const fetchData = async () => {
    try {
      const response = await CompanyService.getInfoCompany();
      const data = response.data
      setCompaniesInfo(data)
      setLoading(false)
    } catch (error) {
      console.error("Eror fetching data", error);
      setLoading(false)
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "telephone",
      headerName: "Phone Number",
      flex: 0.5,
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box ml="2.5rem" mr="2.5rem">
      <FlexBetween>
        <Header title="บริษัท" />
      </FlexBetween>
      <Box height="calc(100vh - 200px)" sx={{ mt: "1.5rem" }}>
        {loading ? (
          <div>Loading...</div>
        ) : companiesInfo.length > 0 ? (
          <DataGrid
            rows={companiesInfo}
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
          />
        ) : (
          <div>No data available.</div>
        )
        }
      </Box>
    </Box>
  );
};

export default CompaniesComData;
