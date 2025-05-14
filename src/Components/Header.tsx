import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Link,
  Button,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { useState } from "react";
import AuthModal from "../Components/AuthModal";
import SignupModal from "../Components/SignupModal";
import SignInModal from "./SignInModal";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signinModalOpen, setSigninModalOpen] = useState(false);

  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);
  const handleOpenSignupModal = () => setSignupModalOpen(true);
  const handleCloseSignInModal = () => setSigninModalOpen(false);

  const handleSwitchToSignIn = () => {
    setSignupModalOpen(false);
    setSigninModalOpen(true);
  };

  const handleSwitchToSignUp = () => {
    setSigninModalOpen(false);
    setSignupModalOpen(true);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", px: 2 }}
          >
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: 24, padding: "0 10px" }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Link
                href="#"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  mx: 1,
                }}
              >
                Tools
              </Link>
              <Link
                href="#"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  mx: 1,
                }}
              >
                Go Pro
              </Link>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Link
                onClick={handleOpen}
                sx={{
                  color: "black",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  mx: 1,
                }}
              >
                Sign In
              </Link>
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  borderRadius: "10px",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  ml: 2,
                  fontSize: "16px",
                  padding: "6px 12px",
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem component="button" onClick={toggleDrawer(false)}>
            <ListItemText primary="Tools" />
          </ListItem>
          <ListItem component="button" onClick={toggleDrawer(false)}>
            <ListItemText primary="Go Pro" />
          </ListItem>
          <ListItem component="button" onClick={handleOpen}>
            <ListItemText primary="Sign In" />
          </ListItem>
          <ListItem component="button" onClick={handleOpen}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </Drawer>

      <AuthModal
        open={authModalOpen}
        onClose={handleClose}
        openSignupModal={handleOpenSignupModal}
      />
      <SignupModal
        open={signupModalOpen}
        onClose={handleCloseSignInModal}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
      <SignInModal
        open={signinModalOpen}
        onClose={handleCloseSignInModal}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </>
  );
}

export default Header;
