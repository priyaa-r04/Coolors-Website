import {
  Modal,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/authSlice"; 
import supabase from "../Supabase";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

const SignInModal = ({ open, onClose, onSwitchToSignUp }: SignInModalProps) => {
  const dispatch = useDispatch();
  const [email, setEmailLocal] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) throw error;
  
      dispatch(setEmail(email)); 
  
      alert("Signed in successfully");
      onClose(); 
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: {
            xs: "80%", 
            sm: 350,    
          },
          p: {
            xs: 2,  
            sm: 3,  
          },
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
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "26px" }} 
        >
          Sign In
        </Typography>
        <Typography sx={{ mb: 3, color: "grey", textAlign: "center" }}>
          Sign in with your email here
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)} 
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            onClick={handleSignIn}
            variant="contained"
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "7px",
              height: "45px",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
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

        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", color: "gray" }}
        >
          Don't have an account?{" "}
          <Link href="#" underline="hover" onClick={onSwitchToSignUp}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignInModal;
