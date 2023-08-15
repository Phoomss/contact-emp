import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeService from "services/EmployeeService";

const Employee_Info = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSurname, setEmployeeSurname] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchEmployee = async () => {
    try {
      const responseEmployee = await EmployeeService.getEmployeeById(id);
      if (responseEmployee && responseEmployee.data) {
        const { name, surname } = responseEmployee.data;
        setEmployeeName(name);
        setEmployeeSurname(surname);
        console.log(responseEmployee);
        console.log(responseEmployee.data);
        console.log(name)
      } else {
        console.error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Name: {employeeName}</p>
      <p>Surname: {employeeSurname}</p>
      {/* แสดงข้อมูลอื่น ๆ ของพนักงาน */}
    </div>
  );
};

export default Employee_Info;
