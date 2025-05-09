import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Apple as AppleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import supabase from "../Supabase";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: "demo@example.com",
      });
      if (error) throw error;
      alert("Check your email for the login link!");
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "apple") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) console.error("OAuth error:", error.message);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 350,
          p: 4,
          mx: "auto",
          my: "15%",
          borderRadius: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "gray",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "30px" }}
        >
          Hello!
        </Typography>
        <Typography sx={{ mb: 3, color: "grey", textAlign: "center" }}>
          Use your email or another service to continue with Coolors
        </Typography>
        <Stack spacing={2}>
          <Button
            onClick={() => handleOAuthLogin("google")}
            variant="contained"
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000",
              textTransform: "none",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "45px"
            }}
          >
            <GoogleIcon sx={{ mr: 1 }} />
            <Typography sx={{ textAlign: "center", flexGrow: 1 ,marginLeft:"9"}}>
              Continue with Google
            </Typography>
          </Button>

          <Button
            onClick={() => handleOAuthLogin("apple")}
            variant="contained"
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#000",
              textTransform: "none",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
               height: "45px"
            }}
          >
            <AppleIcon sx={{ mr: 1 }} />
            <Typography sx={{ textAlign: "center", flexGrow: 1 ,marginLeft:"9"}}>
              Continue with Apple
            </Typography>
          </Button>
          {error && <Typography color="error">{error}</Typography>}

          <Button
            onClick={handleEmailLogin}
            variant="contained"
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "7px",
               height: "45px"
            }}
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
  );
};

export default AuthModal;
