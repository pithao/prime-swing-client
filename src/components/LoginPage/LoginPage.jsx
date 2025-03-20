import { useState, useEffect } from "react";
import useStore from "../../zustand/store";

import {
  Container,
  Button,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logIn = useStore((state) => state.logIn);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage("");
    };
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();

    logIn({
      username: username,
      password: password,
    });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography>
          <h2>Login Page</h2>
        </Typography>
        <form onSubmit={handleLogIn}>
          <div>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              id="username"
              variant="filled"
              required
            />
          </div>
          <div>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              variant="filled"
              required
            />
          </div>
          <div>
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </div>
        </form>
        {
          // Conditionally render login error:
          errorMessage && <h3>{errorMessage}</h3>
        }
      </Container>
    </>
  );
}

export default LoginPage;
