import http from "./http-common";

const getUserInfo = () => {
  const token = localStorage.getItem("token");
  http.defaults.headers.common["Authorization"] = token;

  return http.get("/user/info");
};

const postUserLogin = (credentials) => {
  return http.post("/user/login", credentials).then((response) => {
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response;
  });
};

const postRegister = (userData) => {
  return http.post("/user/register",userData)
};

const getAlluser = () => {
  return http.get("/user");
};

const updataUser = (id, updataData) => {
  return http.put(`/user/${id.toString()}`, updataData);
};

const getUserById = async (id) => {
  try {
    const response = await http.get(`/user/search/?id=${id}`);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

const deleteUser = (id) => {
  return http.delete(`/user/${id}`);
};

const UserService = {
  getUserInfo,
  postUserLogin,
  postRegister,
  getAlluser,
  updataUser,
  getUserById,
  deleteUser,
};

export default UserService;
