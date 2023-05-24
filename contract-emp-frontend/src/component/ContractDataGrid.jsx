import { React, useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ContractService from "../services/ContractService";
import CompanyService from "../services/CompanyService";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import swal from "sweetalert";

const Contracts = () => {
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
            await ContractService.deleteContract(id);
          })
        );
        setContracts(
          contracts.filter((contract) => !selectionModel.includes(contract.id))
        );
        setSelectionModel([]);
        swal("สัญญาที่คุณเลือกไว้ถูกลบเรียบร้อย!", {
          icon: "success",
        });
      }
    });
  };

  const handleRowClick = (params) => {
    navigate(`/updatecontract/${params.id}`);
  };

  const createClick = () => {
    navigate(`/createcontract`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "number",
      headerName: "เลขที่สัญญา",

      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
    },
    {
      field: "start_date",
      headerName: "วันที่เริ่ม",
    },
    {
      field: "end_date",
      headerName: "วันที่สิ้นสุด",
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
          rows={contracts}
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

export default Contracts;
