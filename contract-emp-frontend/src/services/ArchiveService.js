import http from './http-common'

const getArchives = () => {
  return http.get('/archive/')

}

const postArchive = (archiveData) => {
  return http.post('/archive/', archiveData);
}

const deleteArchive = (id) => {
  return http.delete(`/archive/${id}`);
}

const updateArchive = (id, updateData) => {
  return http.put(`/archive/${id.toString()}`, updateData);
}

const getArchiveById = (id) => {
  return http.get(`/archive/search/?id=${id}`).then(response => {
    return response;
  });
}

const ArchiveService = {
  getArchives,
  postArchive,
  updateArchive,
  getArchiveById,
  deleteArchive
}

export default ArchiveService