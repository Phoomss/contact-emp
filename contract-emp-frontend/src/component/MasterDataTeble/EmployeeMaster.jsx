import { React, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";

const EmployeeMaster = () => {
    const { id } = useParams()
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await EmployeeService.getEmployeeById(id);
            setEmployees(response.data);
            if (response.data.length > 0) {
                setSelectedEmployee(response.data[0]); // กำหนดให้เลือกพนักงานแรกเป็นพนักงานที่เลือก
            }
        };
        fetchData();
    }, [id]);

    return (
        <Box >
            <Box >
                {selectedEmployee && (
                    <div>
                        <p>หมายเลขประจำตัว: {selectedEmployee.e_num} หมายเลขบัตรประชาชน: {selectedEmployee.e_Idcard}</p>
                        <p>ชื่อ - นามสกุล: {selectedEmployee.title}{selectedEmployee.name} {selectedEmployee.surname}</p>
                        <p>หมายเลขเบอร์โทรศัพท์: {selectedEmployee.telephone}</p>
                    </div>
                )}
            </Box>
        </Box>
    );

};

export default EmployeeMaster;
