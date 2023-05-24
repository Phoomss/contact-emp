import http from './http-common'

const getContracts = () => {
  return http.get('/contract/')

}

const postContract = (contractData) => {
  return http.post('/contract/', contractData);
}

const deleteContract = (id) => {
  return http.delete(`/contract/${id}`);
}

const updateContract = (id, updateData) => {
  return http.put(`/contract/${id.toString()}`, updateData);
}

const getContractById = (id) => {
  return http.get(`/contract/search/?id=${id}`).then(response => {
    return response;
  });
}

const ContractService = {
  getContracts,
  postContract,
  updateContract,
  getContractById,
  deleteContract
}

export default ContractService