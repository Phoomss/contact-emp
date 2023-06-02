import React, { useEffect, useState } from "react";
import UserService from "services/UserService";

const UserDataGrid = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // เรียกใช้งาน getUserInfo เมื่อคอมโพเนนต์ถูกโหลด
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await UserService.getUserInfo();
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      <h1>User Info</h1>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDataGrid;
