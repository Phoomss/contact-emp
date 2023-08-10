import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  GroupsOutlined,
  DescriptionOutlined,
  ApartmentOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    thaitext: "แดชบอร์ด",
    icon: <DashboardOutlinedIcon />,
  },
  {
    text: "Company",
    thaitext: "ข้อมูลบริษัท",
    icon: <ApartmentOutlined />,
  },
  {
    text: "Contract",
    thaitext: "ข้อมูลสัญญาจ้าง",
    icon: <DescriptionOutlined />,
  },
  {
    text: "Employee",
    thaitext: "ข้อมูลลูกจ้างจ้างเหมาบริการ",
    icon: <GroupsOutlined />,
  },
  {
    text: "UserAll",
    thaitext: "ข้อมูลผู้ใช้งาน",
    icon: <PersonOutlineOutlined />,
  },
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
    navigate("/");
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
            <Box>
              <FlexBetween color={theme.palette.blue[200]}>
                <Box display="flex" alignItems="center" gap="0.5rem" justifyContent="center">
                  <img src="/assets/logo.png" width={"50%"} />
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
                          active === lcText
                            ? theme.palette.secondary.light
                            : "transparent",
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
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box
            position="absolute"
            bottom="1rem"
            width="100%"
            onClick={handleLogout}
            sx={{ cursor: "pointer" }}
          >
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1rem 2rem 0 3rem">
              <Box textAlign="left" sx={{ display: "flex" }}>
                <Typography
                  fontWeight="bold"
                  fontSize="1rem"
                  sx={{ color: theme.palette.blue[100] }}
                >
                  ออกจากระบบ
                </Typography>
                <LogoutIcon
                  sx={{
                    color: theme.palette.blue[300],
                    fontSize: "1rem ",
                    mt: .6,
                    ml: 1
                  }}
                />
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
