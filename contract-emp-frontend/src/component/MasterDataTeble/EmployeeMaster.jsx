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
        <Box m="1.5rem 2.5rem">
            <Box >
                <h2>รายละเอียดพนักงาน</h2>
                {selectedEmployee && (
                    <div>
                        <p>หมายเลขประจำตัว: {selectedEmployee.e_number} หมายเลขบัตรประชาชน: {selectedEmployee.e_Idcard}</p>
                        <p>ชื่อ - นามสกุล: {selectedEmployee.name} {selectedEmployee.surname}</p>
                        <p>เบอร์โทรศัพท์: {selectedEmployee.telephone}</p>
                    </div>
                )}
            </Box>
        </Box>
    );

};

export default EmployeeMaster;
