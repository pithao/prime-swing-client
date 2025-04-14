import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import useStore from "../../zustand/store";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function LoginPage() {
  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for registration form
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, role, setUser, setRole, clearUser, fetchUser } = useStore();
  useEffect(() => {
    fetchUser(); // Call fetchUser when the component mounts to initialize user and role
  }, [fetchUser]);

  // Handle login
  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail(""); // Clear email input
      setLoginPassword(""); // Clear password input
      setErrorMessage(""); // Clear error message
    } catch (error) {
      setErrorMessage(error.message);
    }
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
    <Container
      maxWidth="sm"
      sx={{
        p: 4,
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
        mt: 8,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Welcome
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Login Form */}
      {!user && (
        <>
          <Box component="form" onSubmit={handleLogIn} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="loginEmail"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="loginPassword"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </Box>
        </>
      )}

      {/* User Info and Sign-Out */}
      {user && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Logged in as: {user.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Role: {role}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleSignOut}
            sx={{ mt: 2 }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default LoginPage;
