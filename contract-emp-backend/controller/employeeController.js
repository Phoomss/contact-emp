const db = require("../models");

const Employee = db.employee;
const Contract = db.contract;

const createEmployee = async (req, res) => {
  const { name, surname, e_numberber, e_Idcard, telephone, note } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Please fill out the name field" });
  }

  if (!surname) {
    return res.status(400).json({ message: "Please fill out the surname field" });
  }

  if (!e_number) {
    return res.status(400).json({ message: "Please fill out the e_number field" });
  }

  if (e_Idcard && e_Idcard.length < 13) {
    return res.status(400).json({ message: "คุณกรอกตัวเลขให้ถึง 13 หลัก" });
  } else if (e_Idcard && e_Idcard.length > 13) {
    return res.status(400).json({ message: "คุณกรอกตัวเลขเกิน 13 หลัก" });
  }
  
  if (!telephone) {
    return res
      .status(400)
      .json({ message: "Please fill out the telephone field" });
  }

  let createby = null;
  if (req.user.role === "company") {
    createby = req.user.company_id;
  }

  if (req.user.role !== "admin" && req.user.role !== "card" && note) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const alreadyExistsEmployee = await Employee.findOne({
    where: { e_number },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  // if (alreadyExistsEmployee) {
  //   return res.status(402).json({ message: "Employee already exists!" });
  // }
  if (isNaN(e_number)) {
    return res.status(404).json({ message: "Number should be an e_number!" });
  }
  if (isNaN(telephone)) {
    return res
      .status(405)
      .json({ message: "Telephone number should be a number!" });
  }

  const newEmployee = new Employee({
    name,
    surname,
    e_number,
    e_Idcard,
    telephone,
    note,
    createby,
  });
  const saveEmployee = await newEmployee.save().catch((err) => {
    console.log("Error: ", err);
    res.status(403).json({ error: "Cannot create employee at the moment!" });
  });

  if (saveEmployee) {
    console.log(saveEmployee.dataValues);
    return res
      .status(200)
      .json({
        message: "Employee created successfully!",
        data: saveEmployee.dataValues,
      });
  }
};

const getAllEmployees = async (req, res) => {
  let employees;
  if (req.user.role === "company") {
    employees = await Employee.findAll({
      where: { createby: req.user.company_id },
    });
  } else {
    employees = await Employee.findAll({});
  }

  return res.status(200).send(employees);
};

const getEmployeeWithAllParams = async (req, res) => {
  let whereClause = {};
  if (req.user.role === "company") {
    whereClause.createby = req.user.company_id;
  }

  const { id, name, surname, e_number, e_Idcard, telephone, note } = req.query;

  if (id) {
    whereClause.id = id;
  }
  if (name) {
    whereClause.name = name;
  }
  if (surname) {
    whereClause.surname = surname;
  }
  if (e_number) {
    whereClause.e_number = e_number;
  }
  if (e_Idcard) {
    whereClause.e_Idcard = e_Idcard;
  }
  if (telephone) {
    whereClause.telephone = telephone;
  }
  if (note && (req.user.role === "admin" || req.user.role === "card")) {
    whereClause.note = note;
  }

  const employees = await Employee.findAll({
    where: whereClause,
    include: {
      model: Contract,
      // as: "contract",
    }
  });
  if (employees.length === 0) {
    return res
      .status(404)
      .json({ message: "No employees found with the given parameters" });
  }

  return res.status(200).send(employees);
};

const updateEmployee = async (req, res) => {
  const { name, surname, e_number, e_Idcard, telephone, note } = req.body;

  const employee = await Employee.findOne({ where: { id: req.params.id } });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found!" });
  }

  if (req.user.role === "company" && employee.createby !== req.user.company_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  employee.name = name || employee.name;
  employee.surname = surname || employee.surname;

  if (e_number) {
    if (isNaN(e_number)) {
      return res.status(403).json({ message: "Number should be an e_number!" });
    }
    employee.e_number = e_number || employee.e_number;
  }

  if (e_Idcard) {
    if (isNaN(e_Idcard)) {
      return res.status(403).json({ message: "Number should be an e_Idcard!" });
    }
    employee.e_Idcard = e_Idcard || employee.e_Idcard;
  }

  if (telephone) {
    if (isNaN(telephone)) {
      return res
        .status(403)
        .json({ message: "Telephone number should be a number!" });
    }
    employee.telephone = telephone || employee.telephone;
  }

  if (req.user.role === "admin" || req.user.role === "card") {
    employee.note = note || employee.note;
  }

  const updatedEmployee = await employee.save();
  if (!updatedEmployee) {
    return res.status(400).json({ message: "Error updating Employee" });
  }

  return res.status(200).json({ message: "Employee updated successfully!" });
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findOne({ where: { id: req.params.id } });

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  await employee.destroy();

  return res.status(200).json({ message: "Employee deleted successfully" });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeWithAllParams,
  updateEmployee,
  deleteEmployee,
};
