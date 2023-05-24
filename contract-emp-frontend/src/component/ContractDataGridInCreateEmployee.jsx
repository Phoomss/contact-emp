import { React, useState, useEffect } from "react";
import { Box, useTheme, Button, Modal, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, CreateOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ContractService from "../services/ContractService";
import CompanyService from "../services/CompanyService";
import ArchiveService from "../services/ArchiveService";
import ModalCreateContract from "./ModalCreateContract";
import Header from "./Header";
import FlexBetween from "./FlexBetween";
import swal from "sweetalert";
import CreateContractsModal from "./ModalCreateContract";

const Contracts = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [archives, setArchives] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseContract = await ContractService.getContracts();
      setContracts(responseContract.data);
      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);
      const responseArchive = await ArchiveService.getArchives();
      setArchives(responseArchive.data);
    };
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      field: "department1",
      headerName: "สังกัดกอง",
      valueGetter: (params) => {
        const archive = archives.find(
          (archive) => archive.contract_id === params.row.id
        );
        return archive ? archive.department1 : "";
      },
    },

    {
      field: "department2",
      headerName: "สังกัดฝ่าย",
      valueGetter: (params) => {
        const archive = archives.find(
          (archive) => archive.contract_id === params.row.id
        );
        return archive ? archive.department2 : "";
      },
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
    {
      field: "note",
      headerName: "หมายเหตุ",
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
              onClick={handleOpenModal}
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
          onSelectionModelChange={handleSelectionModelChange} // added closing parentheses
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <CreateContractsModal open={openModal} onClose={handleCloseModal} />
    </Box>
  );
};

export default Contracts;
