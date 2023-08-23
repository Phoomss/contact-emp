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

  const createClick = () => {
    navigate(`/createcontract`,);
  };

  const handleEditButtonClick = (id) => {
    navigate(`/updatecontract/${id}`);
  };

  const handleContractArchive = (id) => {
    navigate(`/contract/search/${id}`);
  };

  const columns = [
    {
      field: "number",
      headerName: "เลขที่สัญญา",

      renderCell: (params) => {
        return <Box sx={{ cursor: "pointer" }}>{params.value}</Box>;
      },
      flex: .2
    },
    {
      field: "start_date",
      headerName: "วันที่เริ่ม",
      flex: .2
    },
    {
      field: "end_date",
      headerName: "วันที่สิ้นสุด",
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
      flex:.2
    },
    {
      field: "Functions",
      headerName: "แก้ไขข้อมูล",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CreateOutlined />}
              onClick={() => handleEditButtonClick(params.id)}
            ></Button>
          </Box>
        );
      },
      flex: .2
    },
    {
      field: "View",
      headerName: "จำนวนลูกจ้างในสัญญา",
      renderCell: (params) => {
        return (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PageviewOutlinedIcon />}
              onClick={() => handleContractArchive(params.id)}
            ></Button>
          </Box>
        );
      },
      flex: .2
    },
  ];

  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ข้อมูลสัญญาจ้าง" />
        <Box>
          <FlexBetween gap="1rem">
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                alt:"เพิ่มสัญญาจ้าง"
              }}
              onClick={createClick}
            >
              <AddBoxOutlinedIcon />
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
              <DeleteOutline />
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
