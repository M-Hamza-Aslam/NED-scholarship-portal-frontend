import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ProfileIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import TopicIcon from "@mui/icons-material/Topic";
import LoginIcon from "@mui/icons-material/ExitToApp";

import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import useLoader from "../../Hooks/UseLoader";
import { userActions } from "../../store/userSlice";
import { adminActions } from "../../store/adminSlice";
import useWindowSize from "../../Hooks/UseWindowSize";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbar = () => {
  // const theme = useTheme();
  const { LoadingComponent, loader, handleLoader } = useLoader();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const size = useWindowSize();
  let status = useSelector((state) => state.user.user.userRole);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef();

  const navbarNavigationHandler = (event) => {
    navigate(`/${event?.currentTarget?.id}`);
    handleDrawerClose();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    drawerRef.current.children[0].id = "navbar";

    const handleClick = (event) => {
      if (open && event.target.id !== "navbar") handleDrawerClose();
    };

    document.body.addEventListener("click", handleClick, true);

    return () => document.body.removeEventListener("click", handleClick, true);
  }, [open]);

  const handleLogout = () => {
    handleLoader(true);
    localStorage.removeItem("token");
    dispatch(userActions.clearUserData());
    dispatch(adminActions.clearAdminData());
    navigate("/auth/login");
    handleLoader(false);
  };
  return (
    <Box className={classes["navbar"]}>
      {loader && LoadingComponent}
      <CssBaseline />
      <AppBar
        sx={{
          background: "linear-gradient(135deg, #0f2d25 11.2%, #217a77 100%)",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon id="navbar" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            NED Scholarship Program
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={!open && size.width < 601 && { visibility: "hidden" }}
        className={classes.drawer}
        variant="permanent"
        open={open}
        ref={drawerRef}
      >
        <div>
          <DrawerHeader className={classes.deactive}>
            <IconButton sx={{ color: "inherit" }} onClick={handleDrawerClose}>
              <ChevronLeftIcon color="inherit" />
            </IconButton>
          </DrawerHeader>
          <Divider />
          {status === "admin" ? (
            <List>
              <ListItem
                className={
                  location.pathname === "/admin/scholarship-list"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Scholarship List">
                  <ListItemButton
                    id="admin/scholarship-list"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <HomeIcon color="inherit" />
                    </ListItemIcon>

                    <ListItemText
                      primary="Home"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/admin/alumni-scholarship-list"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Alumni Scholarship List">
                  <ListItemButton
                    id="admin/alumni-scholarship-list"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <SchoolIcon color="inherit" />
                    </ListItemIcon>

                    <ListItemText
                      primary="Alumni Scholarships"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/admin/create-scholarship"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Create Scholarship">
                  <ListItemButton
                    id="admin/create-scholarship"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <CreateIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Create Scholarship"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          ) : status === "alumni" ? (
            <List>
              <ListItem
                className={
                  location.pathname === "/profile"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Profile">
                  <ListItemButton
                    id="profile"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <ProfileIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/alumni/request-scholarship"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Request Scholarship">
                  <ListItemButton
                    id="alumni/request-scholarship"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <CreateIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Request Scholarship"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/my-scholarship-list"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="My Scholarships">
                  <ListItemButton
                    id="my-scholarship-list"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <SchoolIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Scholarships"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem
                className={
                  location.pathname === "/" ? classes.active : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Home">
                  <ListItemButton
                    id=""
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <HomeIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Home"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/profile"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Profile">
                  <ListItemButton
                    id="profile"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <ProfileIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/scholarship-list"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="Scholarship List">
                  <ListItemButton
                    id="scholarship-list"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <SchoolIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Scholarship List"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/applied-scholarship-list"
                    ? classes.active
                    : classes.deactive
                }
                disablePadding
                sx={{ display: "block" }}
              >
                <Tooltip title="My Scholarship List">
                  <ListItemButton
                    id="applied-scholarship-list"
                    onClick={navbarNavigationHandler}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "inherit",
                      }}
                    >
                      <TopicIcon color="inherit" />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Scholarships"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          )}
          <Divider sx={{ color: "white" }} />
        </div>
        <List>
          <ListItem
            className={classes.deactive}
            disablePadding
            sx={{ display: "block" }}
          >
            {status ? (
              <Tooltip title="Logout">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleLogout}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <LogoutIcon color="inherit" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            ) : (
              <Tooltip title="Sign In">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => navigate("/auth/login")}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    <LoginIcon color="inherit" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sign In"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            )}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
