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
import { useDispatch } from 'react-redux';
import { setEmail } from '../redux/authSlice'; 
import supabase from "../Supabase";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignupModal = ({ open, onClose, onSwitchToSignIn }: SignupModalProps) => {
  const dispatch = useDispatch(); 
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, localSetEmail] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (error) throw error;

      dispatch(setEmail(email)); 
      alert("Check your email to confirm your account.");
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
            xs: "80%",  // 80% width on small screens
            sm: 350,    // 350px width on larger screens
          },
          p: {
            xs: 2,  // Padding for small screens
            sm: 3,  // Padding for larger screens
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
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "26px" }} // Reduced font size for mobile
        >
          Sign Up
        </Typography>
        <Typography sx={{ mb: 3, color: "grey", textAlign: "center" }}>
          Create a free account with your email
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => localSetEmail(e.target.value)}
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
            onClick={handleSignup}
            variant="contained"
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "7px",
              height: "45px",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Your Free Account"}
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
          Already have an account?{" "}
          <Link href="#" underline="hover" onClick={onSwitchToSignIn}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignupModal;
