import { React, useState, useEffect } from "react";
import { Box, useTheme, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  DownloadOutlined,
  DeleteOutline,
  CreateOutlined,
  FilterList,
} from "@mui/icons-material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useNavigate } from "react-router-dom";
import CompanyService from "../../services/CompanyService";
import Header from "../Header";
import FlexBetween from "../FlexBetween";
import swal from "sweetalert";

const Companies = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CompanyService.getCompanies();
      setCompanies(response.data);
    };
    fetchData();
  }, []);

  const getRowId = (row) => row.id;

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
  };

  const handleDeleteButtonClick = async () => {
    if (selectionModel.length === 0) {
      swal("Please select at least one company to delete.", {
        icon: "warning",
      });
      return;
    }

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the selected companies!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await Promise.all(
          selectionModel.map(async (id) => {
            await CompanyService.deleteCompany(id);
          })
        );
        setCompanies(
          companies.filter((company) => !selectionModel.includes(company.id))
        );
        setSelectionModel([]);
        swal("The selected companies have been deleted successfully!", {
          icon: "success",
        });
      }
    });
  };

  const createClick = () => {
    navigate(`/createcompany`);
  };

  const handleEditButtonClick = (id) => {
    navigate(`/updatecompany/${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
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
            >
              แก้ไข
            </Button>
          </Box>
        );
      },
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
              <AddBusinessIcon />
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
          rows={companies}
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

export default Companies;
