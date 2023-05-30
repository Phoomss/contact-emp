import http from './http-common';

const getUserInfo = () => {

  const token = localStorage.getItem("token")
  http.defaults.headers.common['Authorization'] = token;

  return http.get("/user/info");

}
const postUserLogin = (credentials) => {
  return http.post('/user/login', credentials)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response;
    });
};

const getAlluser = () => {
  return http.get('/user')
}


const UserService = {
  getUserInfo,
  postUserLogin,
  getAlluser,
};

export default UserService;