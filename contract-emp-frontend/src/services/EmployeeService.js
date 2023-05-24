import http from './http-common'

const getEmployees = () => {
  return http.get('/employee/')

}

const postEmployee = (employeeData) => {
  return http.post('/employee/', employeeData);
}

const deleteEmployee = (id) => {
  return http.delete(`/employee/${id}`);
}

const updateEmployee = (id, updateData) => {
  return http.put(`/employee/${id.toString()}`, updateData);
}

const getEmployeeById = (id) => {
  return http.get(`/employee/search/?id=${id}`).then(response => {
    return response;
  });
}

const EmployeeService = {
  getEmployees,
  postEmployee,
  updateEmployee,
  getEmployeeById,
  deleteEmployee
}

export default EmployeeService