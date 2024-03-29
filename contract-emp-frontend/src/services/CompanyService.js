import http from "./http-common";

const getCompanies = () => {
  return http.get("/company/");
};

const postCompany = (companyData) => {
  return http.post("/company/", companyData);
};

const deleteCompany = (id) => {
  return http.delete(`/company/${id}`);
};

const updateCompany = (id, updateData) => {
  return http.put(`/company/${id.toString()}`, updateData);
};

const getCompanyById = (id) => {
  return http.get(`/company/search/?id=${id}`).then((response) => {
    return response;
  });
};

const getInfoCompany = (token) => {
  http.defaults.headers.common["Authorization"] = token;
  return http.get("/company/info");
}

const CompanyService = {
  getCompanies,
  postCompany,
  updateCompany,
  getCompanyById,
  deleteCompany,
  getInfoCompany
};

export default CompanyService;
