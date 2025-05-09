import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../zustand/store";

// Docs: MUI App Bar with Responsive Menu
// https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const pages = [
  {
    label: "Surveys",
    subpages: [
      { label: "Class Survey", path: "/class-survey" },
      { label: "Dance Survey", path: "/dance-survey" },
      { label: "Location Survey", path: "/location-survey" },
      { label: "Event Survey", path: "/event-survey" },
    ],
  },
  {
    label: "Responses",
    subpages: [
      { label: "Class Responses", path: "/class-survey-responses" },
      { label: "Dance Responses", path: "/dance-survey-responses" },
      { label: "Event Responses", path: "/event-survey-responses" },
      { label: "Location Responses", path: "/location-survey-responses" },
    ],
  },
];

console.log(pages);

const settings = ["Dashboard", "Logout"];

function Header() {
  const user = useStore((state) => state.user);
  const { role, setUser, setRole, clearUser, fetchUser } = useStore();
  const logOut = useStore((state) => state.logOut);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuAnchors, setMenuAnchors] = React.useState({}); // Separate state for each menu

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenMenu = (label) => (event) => {
    setMenuAnchors((prev) => ({ ...prev, [label]: event.currentTarget }));
  };
  const handleCloseMenu = (label) => () => {
    setMenuAnchors((prev) => ({ ...prev, [label]: null }));
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      clearUser(); // Ensure the role is also cleared
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <AppBar
      position="static"
      color="primary"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Toolbar logo */}
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to="/">
              <img
                src="/images/rebels-logo.png"
                style={{ width: "7rem", padding: "1rem" }}
                alt="Twin Cities Rebels Swing Dance Club"
              />
            </Link>
          </Box>

          {user && (
            <>
              {/* Mobile nav drop-down */}
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <Box key={page.label}>
                      {/* Main menu item */}
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          pl: 2,
                          backgroundColor: "black",
                          color: "white",
                          padding: ".5rem",
                        }}
                      >
                        {page.label}
                      </Typography>

                      {/* Submenu for subpages */}
                      {page.subpages.map((subpage) => (
                        <MenuItem
                          key={subpage.label}
                          component={Link}
                          to={subpage.path}
                          onClick={handleCloseNavMenu}
                          sx={{ pl: 4 }} // Add padding for indentation
                        >
                          {subpage.label}
                        </MenuItem>
                      ))}
                    </Box>
                  ))}
                </Menu>
              </Box>

              {/* Desktop nav with dropdown menus */}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Box key={page.label}>
                    <Button
                      onClick={handleOpenMenu(page.label)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.label}
                    </Button>
                    <Menu
                      anchorEl={menuAnchors[page.label]}
                      open={Boolean(menuAnchors[page.label])}
                      onClose={handleCloseMenu(page.label)}
                    >
                      {page.subpages.map((subpage) => (
                        <MenuItem
                          key={subpage.label}
                          component={Link}
                          to={subpage.path}
                          onClick={handleCloseMenu(page.label)}
                        >
                          {subpage.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Icon/avatar nav link - utility for admins */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
