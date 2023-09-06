import { React, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ContractService from "../../services/ContractService";
import CompanyService from "../../services/CompanyService";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const ContractMaster = () => {
  const { id } = useParams()
  const [contracts, setContracts] = useState([]);
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const responseContract = await ContractService.getContractById(id);
      setContracts(responseContract.data);
      const responseCompany = await CompanyService.getCompanies();
      setCompanies(responseCompany.data);
    };
    fetchData();
  }, [id]);

  return (
    <Box m="1.5rem 2.5rem">
      {contracts.map((contract) => (
        <div key={contract.id}>
          <h2>เลขที่สัญญา: {contract.number}</h2>
          <p>วันที่เริ่ม: {format(new Date(contract.start_date), "d MMM yyyy", { locale: th })} || <span>วันที่สิ้นสุด: {format(new Date(contract.end_date), "d MMM yyyy", { locale: th })}</span> </p>
          <p>ชื่อบริษัท: {companies.find(company => company.id === contract.company_id)?.name || ''}</p>
          {/* ตรงนี้คุณสามารถเพิ่มข้อมูลอื่นๆ ตามต้องการ */}
        </div>
      ))}
    </Box>
  );
};

export default ContractMaster;
