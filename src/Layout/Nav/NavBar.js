import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./NavBar.css";
import { InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Reducers/Reducers";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const { auth } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }} className="navbarCus">
      <CssBaseline />
      <AppBar component="nav" style={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <img src="/assets/sehalogo.png" alt="" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }} className="">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="field"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ background: "white" }}
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button sx={{ color: "#fff" }}>EN</Button>
            <Button sx={{ color: "#fff" }}>
              <Link to="/Cart">
                <ShoppingCartOutlinedIcon />
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }} className="sign">
              {auth === null ? (
                <Link to="/Login" style={{ textDecoration: "none" }}>
                  Sign in
                </Link>
              ) : (
                <div class="dropdown">
                  <button class="dropbtn">
                    Welcome! <span className="welcom">{auth.data.first_name}</span>
                  </button>
                  <div class="dropdown-content">
                    <Link
                      onClick={() => {
                        dispatch(Logout());
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default NavBar;
