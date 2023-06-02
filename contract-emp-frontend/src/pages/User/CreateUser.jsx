import FormCrateUser from "component/FormCreate/FormCrateUser";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";

const CreateUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      UserService.getUserInfo()
        .then(() => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);
  return <FormCrateUser />;
};

export default CreateUser;
