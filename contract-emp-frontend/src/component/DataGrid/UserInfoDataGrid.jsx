import React, { useEffect, useState } from "react";
import UserService from "services/UserService";

const UserDataGrid = () => {
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const response = await UserService.getUserInfo();
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>User Info</h1>
      {userInfo ? (
        <div>
          <p>ชื่อ: {userInfo.name || "N/A"}</p>
          <p>อีเมล: {userInfo.email || "N/A"}</p>
          <p>ชื่อผู้ใช้งาน: {userInfo.username || "N/A"}</p>
          <p>สถานะ: {userInfo.role || "N/A"}</p>
          <p>บริษัท: {userInfo.company?.name || "N/A"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDataGrid;
