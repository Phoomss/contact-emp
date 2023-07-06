import http from "./http-common";

const getEmpData = (empId) => {
  return http.get(`/emp/${empId}`)
}

const HrApiService = {
  getEmpData
}

export default HrApiService

