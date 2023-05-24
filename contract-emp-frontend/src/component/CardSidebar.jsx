import React from "react";
import {
 Box,
 Divider,
 Drawer,
 IconButton,
 List,
 ListItem,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Typography,
 useTheme,
 Menu,
 MenuItem,
 Button,
} from "@mui/material";
import {
 SettingsOutlined,
 ChevronLeft,
 ChevronRightOutlined,
 HomeOutlined,
 GroupsOutlined,
 DescriptionOutlined,
 ArchiveOutlined,
 ApartmentOutlined,
 PersonOutlineOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
 //{
 //text: "Dashboard",
 //icon: <HomeOutlined />,
 //},
 // {
 //   text: "Client Facing",
 //   icon: null,
 // },
 /*{
    text: "Archive",
    thaitext: "ประวัติ",
    icon: <ArchiveOutlined />,
  },*/
 {
  text: "Contract",
  thaitext: "ข้อมูลสัญญาจ้าง",
  icon: <DescriptionOutlined />,
 },
 {
  text: "Company",
  thaitext: "ข้อมูลบริษัท",
  icon: <ApartmentOutlined />,
 },
 {
  text: "Employee",
  thaitext: "ข้อมูลลูกจ้างจ้างเหมาบริการ",
  icon: <GroupsOutlined />,
 },
 // {
 //   text: "Sales",
 //   icon: null,
 // },
 {
  text: "User",
  thaitext: "ข้อมูลผู้ใช้งาน",
  icon: <PersonOutlineOutlined />,
 },
 // {
 //   text: "Daily",
 //   icon: <TodayOutlined />,
 // },
 // {
 //   text: "Monthly",
 //   icon: <CalendarMonthOutlined />,
 // },
 // {
 //   text: "Breakdown",
 //   icon: <PieChartOutlined />,
 // },
 // {
 //   text: "Management",
 //   icon: null,
 // },
 // {
 //   text: "Admin",
 //   icon: <AdminPanelSettingsOutlined />,
 // },
 // {
 //   text: "Performance",
 //   icon: <TrendingUpOutlined />,
 // },
];

const Sidebar = ({
 user,
 drawerWidth,
 isSidebarOpen,
 setIsSidebarOpen,
 isNonMobile,
}) => {
 const { pathname } = useLocation();
 const [active, setActive] = useState("");
 const navigate = useNavigate();
 const theme = useTheme();

 useEffect(() => {
  setActive(pathname.substring(1));
 }, [pathname]);

 const [anchorEl, setAnchorEl] = useState(null);
 const isOpen = Boolean(anchorEl);
 const handleClick = (event) => setAnchorEl(event.currentTarget);
 const handleClose = () => setAnchorEl(null);
 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
 };

 return (
  <Box component="nav">
   {isSidebarOpen && (
    <Drawer
     open={isSidebarOpen}
     onClose={() => setIsSidebarOpen(false)}
     variant="persistent"
     anchor="left"
     sx={{
      width: drawerWidth,
      "& .MuiDrawer-paper": {
       color: theme.palette.secondary[200],
       backgroundColor: theme.palette.background.sidebar,
       boxSixing: "border-box",
       borderWidth: isNonMobile ? 0 : "2px",
       width: drawerWidth,
      },
     }}
    >
     <Box width="100%">
      <Box m="1.5rem 2rem 2rem 3rem">
       <FlexBetween color={theme.palette.blue[200]}>
        <Box display="flex" alignItems="center" gap="0.5rem">
         <Typography variant="h4" fontWeight="bold">
          การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย
         </Typography>
        </Box>
        {!isNonMobile && (
         <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <ChevronLeft />
         </IconButton>
        )}
       </FlexBetween>
      </Box>
      <List>
       {navItems.map(({ text, thaitext, icon }) => {
        if (!icon) {
         return (
          <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
           {text}
          </Typography>
         );
        }
        const lcText = text.toLowerCase();

        return (
         <ListItem key={text} disablePadding>
          <ListItemButton
           onClick={() => {
            navigate(`/${lcText}`);
            setActive(lcText);
           }}
           sx={{
            backgroundColor:
             active === lcText ? theme.palette.secondary.light : "transparent",
            color:
             active === lcText
              ? theme.palette.neutral.font
              : theme.palette.blue[200],
           }}
          >
           <ListItemIcon
            sx={{
             ml: "2rem",
             color:
              active === lcText
               ? theme.palette.neutral.font
               : theme.palette.blue[200],
            }}
           >
            {icon}
           </ListItemIcon>
           <ListItemText primary={thaitext || "xxx"} />
           {active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
          </ListItemButton>
         </ListItem>
        );
       })}
      </List>
     </Box>

     <Box position="absolute" bottom="1rem" width="100%">
      <Divider />
      <FlexBetween textTransform="none" gap="1rem" m="1rem 2rem 0 3rem">
       {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}

       <Box textAlign="left">
        <Typography
         fontWeight="bold"
         fontSize="0.9rem"
         sx={{ color: theme.palette.blue[100] }}
        >
         {user.name}
        </Typography>
        <Typography fontSize="0.8rem" sx={{ color: theme.palette.blue[200] }}>
         {user.role}
        </Typography>
       </Box>
       <Button
        onClick={handleClick}
        sx={{
         display: "flex",
         
         alignItems: "center",
         textTransform: "none",
         
        }}
       >
        <SettingsOutlined
         sx={{
          color: theme.palette.blue[300],
          fontSize: "25px ",
         }}
        />
       </Button>
       <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
       >
        <MenuItem onClick={handleLogout}>ล็อกเอาท์</MenuItem>
       </Menu>
      </FlexBetween>
     </Box>
    </Drawer>
   )}
  </Box>
 );
};

export default Sidebar;
