const db = require('../models')
const axios = require('axios');
require('dotenv').config({path: './config.env'})

const Archive = db.archive
const Employee = db.employee
const Contract = db.contract
const Company = db.company

const createArchives = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { employee_id, contract_id, org_id, remark } = req.body;
  if (isNaN(employee_id)) {
    return res.status(402).json({ message: "Employee_id should be a number!" });
  }
  if (isNaN(contract_id)) {
    return res.status(402).json({ message: "Contract_id should be a number!" });
  }

  try {
    const newArchive = new Archive({ employee_id, contract_id, org_id ,remark });
    const saveArchive = await newArchive.save();

    if (saveArchive) {
      const departInfo = await getHrDepart(org_id);
      console.log("depeartInfo :", departInfo);
      if (departInfo.status_code !== 200) {
        return res.status(departInfo.status_code).json({ message: departInfo.message });
      }

      const modifiedDepartInfo = {
        org_id: departInfo.data?.org_id,
        org_parent_id: departInfo.data?.org_parent_id,
        org_code: departInfo.data?.org_code,
        org_cost_center_code: departInfo.data?.org_cost_center_code,
        org_type_name: departInfo.data?.org_type_name,
        org_type_code: departInfo.data?.org_type_code,
        org_thai_shortname: departInfo.data?.org_thai_shortname,
        org_thai_longname: departInfo.data?.org_thai_longname,
        org_division_thai_short_name: departInfo.data?.org_division_thai_short_name,
        org_division_thai_long_name: departInfo.data?.org_division_thai_long_name,
        org_department_thai_short_name: departInfo.data?.org_department_thai_short_name,
        org_department_thai_long_name: departInfo.data?.org_department_thai_long_name,
        org_section_thai_short_name: departInfo.data?.org_section_thai_short_name,
        org_section_thai_long_name: departInfo.data?.org_section_thai_long_name,
        org_thai_name_path: departInfo.data?.org_thai_name_path,
        org_thai_name_reverse_path: departInfo.data?.org_thai_name_reverse_path,
      };

      return res.status(200).json({
        message: "Archive created successfully!",
        employee_id,
        contract_id,
        org_id,
        departInfo: modifiedDepartInfo,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
    return res.status(403).json({ error: "Cannot create archive at the moment!" });
  }
};

const getHrDepart = async (org_id) => {
  let url = `https://hrapi.egat.co.th/api/v1/organizations?filter[Name]=${org_id}`;
  let _token = process.env.HR_API_TOKEN;
  console.log(url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ` + _token,
      },
    });

    const result = response.data;
    if (!result) {
      return {
        message: "No organization data found",
        status_code: 404,
        data: { result: "" },
      };
    }

    return {
      message: "Success",
      status_code: 200,
      data: result.data[0],
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error fetching organization data",
      status_code: 500,
      data: { result: "" },
    };
  }
};

const getAllArchives = async (req, res) => {
  if (req.user.role === "admin" || req.user.role === "card") {
    const archive = await Archive.findAll({
      include: [
        { model: Employee, as: "employee" },
        { model: Contract, as: "contract", include: { model: Company, as: "company" } },
      ]
    });
    res.status(200).send(archive);
  } else if (req.user.role === "company") {
    const archive = await Archive.findAll({
      include: [
        { model: Employee, as: "employee" },
        { model: Contract, as: "contract", include: { model: Company, as: "company" } },
      ],
      where: { "$contract.company_id$": req.user.company_id },
    });
    res.status(200).send(archive);
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const getArchiveWithAllParams = async (req, res) => {
  const whereClause = {};
  // ตรวจสอบบทบาทของผู้ใช้งาน
  if (req.user.role === "company") {
    // ไม่มีการกำหนดเงื่อนไขเพิ่มเติมสำหรับบทบาท "company"
  }

  const { id, employee_id, contract_id, org_id, remark, company_id } = req.query;

  if (id) {
    whereClause.id = id;
  }
  if (employee_id) {
    whereClause.employee_id = employee_id;
  }
  if (contract_id) {
    whereClause.contract_id = contract_id;
  }
  if (org_id) {
    whereClause.org_id = org_id;
  }
  if (remark) {
    whereClause.remark = remark;
  }
  if (company_id) {
    whereClause['$contract.company.id$'] = company_id;
  }

  const archives = await Archive.findAll({
    where: whereClause,
    include: [
      { model: Employee, as: "employee" },
      { model: Contract, as: "contract", include: { model: Company, as: "company" } },
    ]
  })

  if (archives.length === 0) {
    return res.status(404).json({ message: "No Archives found with the given parameters" });
  }

  return res.status(200).json(archives)
}

const updateArchive = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { employee_id, contract_id, org_id, remark } = req.body;

  const archive = await Archive.findOne({ where: { id: req.params.id } })

  if (!archive) {
    return res.status(404).json({ message: "Archive not found" })
  }

  if (employee_id) {
    if (isNaN(employee_id)) {
      return res.status(403).json({ message: "Employee_id should be a number!" });
    }
    archive.employee_id = employee_id || archive.employee_id;
  }
  if (contract_id) {
    if (isNaN(contract_id)) {
      return res.status(403).json({ message: "Contract_id should be a number!" });
    }
    archive.contract_id = contract_id || archive.contract_id;
  }

  archive.org_id = org_id || archive.org_id;
  archive.remark = remark || archive.remark;

  const updatedArchive = await archive.save();
  if (!updatedArchive) {
    return res.status(400).json({ message: "Error updating Archive" })
  }
  return res.status(200).json({ message: "Archive update successfully!" })
}

const deleteArchive = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const archive = await Archive.findOne({ where: { id: req.params.id } });

  if (!archive) {
    return res.status(404).json({ message: "Archive not found" });
  }

  await archive.destroy();

  return res.status(200).json({ message: "Archive deleted successfully" });
};

module.exports = {
  createArchives,
  getAllArchives,
  getArchiveWithAllParams,
  updateArchive,
  deleteArchive
}