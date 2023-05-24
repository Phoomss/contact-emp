import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import CompanySidebar from "component/CompanySidebar";
import CardSidebar from "component/CardSidebar";
import UserService from "services/UserService";
import Footer from "../component/Footer";

const MainLayout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  let Sidebar = null;
  useEffect(() => {
    const getUserInfoAsync = async () => {
      const response = await UserService.getUserInfo();
      setUserInfo(response.data);
    };
    getUserInfoAsync();
  }, []);
  const sidebarSettings = {
    user: userInfo || {},
    isNonMobile: isNonMobile,
    drawerWidth: "250px",
    isSidebarOpen: isSideBarOpen,
    setIsSideBarOpen: setIsSideBarOpen
  };

  if (userInfo && userInfo.role === "company") {
    Sidebar = <CompanySidebar {...sidebarSettings} />;
  } else {
    Sidebar = <CardSidebar {...sidebarSettings} />;
  }

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {Sidebar}
      <Box flexGrow={1}>
        {isNonMobile && (
          <Navbar
            user={userInfo || {}}
            isSidebarOpen={isSideBarOpen}
            setIsSidebarOpen={setIsSideBarOpen}
          />
        )}
        <Box p={2}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}  

export default MainLayout;
