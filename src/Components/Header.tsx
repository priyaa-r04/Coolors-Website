import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import logo from "../assets/logo.png";
import { useState } from "react";
import supabase from "../Supabase";
import { Modal, Stack, Typography } from "@mui/material";

function Header() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setError(null);
  };
  const handleEmailLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  const handleOAuthLogin = async (provider: "google" | "apple") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) console.error("OAuth error:", error.message);
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
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            minHeight: 5,
          }}
        >
          <Toolbar disableGutters>
            <Box
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: 20, padding: "0px 10px" }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                href="/tools"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Tools
              </Link>
              <Link
                href="/Gopro"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  ml: 2,
                  fontWeight: 50,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Go Pro
              </Link>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Link
                onClick={handleOpen}
                sx={{
                  ml: 2,
                  textDecoration: "none",
                  color: "black",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                Sign In
              </Link>
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                  ml: 2,
                  backgroundColor: "blue",
                  borderRadius: "10px",
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            backgroundColor: "#fff",
            width: 300,
            p: 4,
            mx: "auto",
            my: "15%",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" 
          >Hello!</Typography>
          <Typography sx={{ mb: 3,  color: 'grey'}}>
            Use your email or another service to continue with Coolors
          </Typography>
          <Stack spacing={2}>
            <Button
              onClick={() => handleOAuthLogin("google")}
              variant="contained"
              sx={{ backgroundColor: "#f5f5f5", color: "#000", textTransform: "none" }}
            >
              Continue with Google
            </Button>
            <Button
              onClick={() => handleOAuthLogin("apple")}
              variant="contained"
              sx={{ backgroundColor: "#e0e0e0", color: "#000" }}
            >
              Continue with Apple
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Button
              onClick={handleEmailLogin}
              variant="contained"
              sx={{ backgroundColor: "blue", color: "white" }}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Continue with Email"}
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 3 }}>
            By continuing, you agree to our{" "}
            <Link href="/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </Link>
            , read our{" "}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Header;
