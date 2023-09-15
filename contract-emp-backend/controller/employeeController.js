const db = require("../models");

const Employee = db.employee;
const Contract = db.contract;

const createEmployee = async (req, res) => {
  const {title, name, surname, e_num, e_Idcard, telephone, note } = req.body;

  if(!title){
    return res.status(400).json({message: "กรุณาเลือกคำนำหน้า"})
  }
  if (!name) {
    return res.status(400).json({ message: "กรุณากรอกชื่อ" });
  }

  if (!surname) {
    return res.status(400).json({ message: "กรุณากรอกนามสกุล" });
  }

  if (!e_num) {
    return res.status(400).json({ message: "กรุณากรอกหมายเลขพนักงาน" });
  }

  if (e_Idcard && e_Idcard.length < 13) {
    return res.status(400).json({ message: "คุณกรอกเลขบัตรประชาชนไม่ถูกต้อง ควรมี 13 หลัก" });
  } else if (e_Idcard && e_Idcard.length > 13) {
    return res.status(400).json({ message: "คุณกรอกเลขบัตรประชาชนเกิน 13 หลัก" });
  }
  
  if (!telephone) {
    return res.status(400).json({ message: "กรุณากรอกหมายเลขโทรศัพท์" });
  }

  let createby = null;
  if (req.user.role === "company") {
    createby = req.user.company_id;
  }

  if (req.user.role !== "admin" && req.user.role !== "card" && note) {
    return res.status(401).json({ message: "ไม่มีสิทธิ์ในการทำรายการนี้" });
  }

  const alreadyExistsEmployee = await Employee.findOne({
    where: { e_num },
  }).catch((err) => {
    console.log("ผิดพลาด: ", err);
  });

  // if (alreadyExistsEmployee) {
  //   return res.status(402).json({ message: "Employee already exists!" });
  // }
  if (isNaN(e_num)) {
    return res.status(404).json({ message: "หมายเลขพนักงานควรเป็นตัวเลข" });
  }
  if (isNaN(telephone)) {
    return res
      .status(405)
      .json({ message: "หมายเลขโทรศัพท์ควรเป็นตัวเลข" });
  }

  const newEmployee = new Employee({
    title,
    name,
    surname,
    e_num,
    e_Idcard,
    telephone,
    note,
    createby,
  });
  const saveEmployee = await newEmployee.save().catch((err) => {
    console.log("ผิดพลาด: ", err);
    res.status(403).json({ error: "ไม่สามารถสร้างพนักงานในขณะนี้ได้" });
  });

  if (saveEmployee) {
    console.log(saveEmployee.dataValues);
    return res
      .status(200)
      .json({
        message: "สร้างพนักงานเรียบร้อยแล้ว",
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

  const { id, name, surname, e_num, e_Idcard, telephone, note } = req.query;

  if (id) {
    whereClause.id = id;
  }
  if (name) {
    whereClause.name = name;
  }
  if (surname) {
    whereClause.surname = surname;
  }
  if (e_num) {
    whereClause.e_num = e_num;
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
      .json({ message: "ไม่พบข้อมูลพนักงานที่ตรงกับเงื่อนไขที่กำหนด" });
  }

  return res.status(200).send(employees);
};

const updateEmployee = async (req, res) => {
  const {title, name, surname, e_num, e_Idcard, telephone, note } = req.body;

  const employee = await Employee.findOne({ where: { id: req.params.id } });

  if (!employee) {
    return res.status(404).json({ message: "ไม่พบข้อมูลพนักงาน" });
  }

  if (req.user.role === "company" && employee.createby !== req.user.company_id) {
    return res.status(401).json({ message: "ไม่มีสิทธิ์ในการทำรายการนี้" });
  }

  employee.title = title || employee.title;
  employee.name = name || employee.name;
  employee.surname = surname || employee.surname;

  if (e_num) {
    if (isNaN(e_num)) {
      return res.status(403).json({ message: "หมายเลขพนักงานควรเป็นตัวเลข" });
    }
    employee.e_num = e_num || employee.e_num;
  }

  if (e_Idcard) {
    if (isNaN(e_Idcard)) {
      return res.status(403).json({ message: "หมายเลขบัตรประชาชนควรเป็นตัวเลข" });
    }
    employee.e_Idcard = e_Idcard || employee.e_Idcard;
  }

  if (telephone) {
    if (isNaN(telephone)) {
      return res
        .status(403)
        .json({ message: "หมายเลขโทรศัพท์ควรเป็นตัวเลข" });
    }
    employee.telephone = telephone || employee.telephone;
  }

  if (req.user.role === "admin" || req.user.role === "card") {
    employee.note = note || employee.note;
  }

  const updatedEmployee = await employee.save();
  if (!updatedEmployee) {
    return res.status(400).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลพนักงาน" });
  }

  return res.status(200).json({ message: "อัปเดตข้อมูลพนักงานเรียบร้อยแล้ว" });
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findOne({ where: { id: req.params.id } });

  if (!employee) {
    return res.status(404).json({ message: "ไม่พบข้อมูลพนักงาน" });
  }

  await employee.destroy();

  return res.status(200).json({ message: "ลบข้อมูลพนักงานเรียบร้อยแล้ว" });
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeWithAllParams,
  updateEmployee,
  deleteEmployee,
};
