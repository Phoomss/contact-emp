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

const postRegister = (createuserData, callback) => {
  http.post('user/register', createuserData)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      // จัดการเมื่อเกิด error ที่ต้องการ
      console.error(error);
      callback(error, null);
    });
};


const getAlluser = () => {
  return http.get('/user')
}

const updataUser = (id, updataData) => {
  return http.put(`/user/${id.toString()}`, updataData)
}

const getUserById = async (id) => {
  try {
    const response = await http.get(`/user/search/?id=${id}`);
    return response;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}



const UserService = {
  getUserInfo,
  postUserLogin,
  postRegister,
  getAlluser,
  updataUser,
  getUserById
};

export default UserService;