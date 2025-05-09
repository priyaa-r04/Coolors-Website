import { AppBar, Box, Toolbar, Container, Link, Button, Divider } from "@mui/material";
import logo from "../assets/logo.png";
import { useState } from "react";
import AuthModal from "../Components/AuthModal";

function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", borderBottom: "1px solid #ccc" }}>
        <Container maxWidth={false} disableGutters sx={{ minHeight: 5 }}>
          <Toolbar disableGutters>
            <Box component="a" href="/" sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, alignItems: "center", textDecoration: "none" }}>
              <img src={logo} alt="Logo" style={{ height: 20, padding: "0px 10px" }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box >
                <Link href="#" sx={{ color: "black", textDecoration: "none", fontFamily: "Inter, sans-serif", position: "relative" }}>
                  Tools
                </Link>
              </Box>

              <Link href="#" sx={{ color: "black", textDecoration: "none", ml: 2, fontWeight: 50, fontFamily: "Inter, sans-serif" }}>
                Go Pro
              </Link>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Link onClick={handleOpen} sx={{ ml: 2, textDecoration: "none", color: "black", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>
                Sign In
              </Link>
              <Button onClick={handleOpen} variant="contained" sx={{ ml: 2, backgroundColor: "blue", borderRadius: "10px", color: "white", textDecoration: "none", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AuthModal open={authModalOpen} onClose={handleClose} />
    </>
  );
}

export default Header;
