const db = require("../models");

const Contract = db.contract;
const Company = db.company

const createContract = async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "card") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { number, start_date, end_date, company_id } = req.body;

  if (!number) {
    return res.status(400).json({ message: "Please fill out the number field" });
  }

  if (!start_date) {
    return res.status(400).json({ message: "Please fill out the start_date field" });
  }

  if (!end_date) {
    return res.status(400).json({ message: "Please fill out the end_date field" });
  }

  if (!company_id) {
    return res.status(400).json({ message: "Please fill out the company field" });
  }

  const alreadyExistsContract = await Contract.findOne({
    where: { number },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (alreadyExistsContract) {
    return res.status(402).json({ message: "Contract already exists!" });
  }
  if (isNaN(number)) {
    return res.status(403).json({ message: "Telephone number should be a number!" });
  }
  if (isNaN(company_id)) {
    return res.status(404).json({ message: "Company_id should be a number!" });
  }

  const newContract = new Contract({ number, start_date, end_date, company_id });
  const saveContract = await newContract.save().catch((err) => {
    console.log("Error: ", err);
    res.status(405).json({ error: "Cannot create contract at the moment!" });
  });

  if (saveContract)
    return res.status(200).json({ message: "Contract created successfully!" });
};

  
const getAllContracts = async (req, res) => {
  let contracts;

  if (req.user.role === "company") {
    contracts = await Contract.findAll({
      where: {
        company_id: req.user.company_id
      },
      include: {
        model: Company,
        as: "company"
      }
    });
  } else if (req.user.role === "admin" || req.user.role === "card") {
    contracts = await Contract.findAll({
      include: {
        model: Company,
        as: "company"
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.status(200).send(contracts);
};


  const getContractWithAllParams = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const { id, number, start_date, end_date, company_id } = req.query;
  
    const whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    if (number) {
      whereClause.number = number;
    }
    if (start_date) {
      whereClause.start_date = start_date
    }
    if (end_date) {
      whereClause.end_date = end_date
    }
    if (company_id) {
      whereClause.company_id = company_id;
    }

    const contracts = await Contract.findAll({ 
      where: whereClause,
      include: {
      model: Company,
      as: 'company',
    } });
    if (contracts.length === 0) {
      return res.status(404).json({ message: "No contracts found with the given parameters" });
    }
  
    return res.status(200).send(contracts);
  };

  const updateContract = async (req, res) => {
    if ( req.user.role !== "admin" && req.user.role !== "card" ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { number, start_date, end_date, company_id } = req.body;
  
    const alreadyExistsContract = await Contract.findOne({
      where: { number },
    }).catch((err) => {
      console.log("Error: ", err);
    });
  
    if (alreadyExistsContract) {
      if (alreadyExistsContract.id !== parseInt(req.params.id)) {
        return res.status(402).json({ message: "Contract already exists!" });
      }
    }
  
    const contract = await Contract.findOne({ where: { id: req.params.id } });
  
    if (!contract) {
      return res.status(404).json({ message: "Contract not found!" });
    }
  
    if (number) {
      if (isNaN(number)) {
        return res.status(403).json({ message: "Number should be a number!" });
      }
      contract.number = number || contract.number;
    }
    contract.start_date = start_date || contract.start_date;
    contract.end_date = end_date || contract.end_date;
    contract.company_id = company_id || contract.company_id;
    if (company_id) {
      if (isNaN(company_id)) {
        return res.status(403).json({ message: "Company_id should be a number!" });
      }
      archive.company_id = company_id || archive.company_id;
    }
    
    
    const updatedContract = await contract.save();
    if (!updatedContract) {
      return res.status(400).json({ message: "Error updating Contract" });
    }
  
    return res.status(200).json({ message: "Contract updated successfully!" });
  };
   
    

  const deleteContract = async (req, res) => {
    if (req.user.role !== "admin" && req.user.role !== "card") {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const contract = await Contract.findOne({ where: { id: req.params.id }});
  
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
  
    await contract.destroy();
  
    return res.status(200).json({ message: "Contract deleted successfully" });
  };


module.exports = {
    createContract,
    getAllContracts,
    getContractWithAllParams,
    updateContract,
    deleteContract
}