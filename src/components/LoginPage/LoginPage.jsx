import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from '../../firebase-config'; 
import useStore from "../../zustand/store";
import { doc, setDoc, getDoc } from "firebase/firestore";
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
    fetchUser();  // Call fetchUser when the component mounts to initialize user and role
  }, [fetchUser]);


  
  // Handle login
  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");  // Clear email input
    setLoginPassword("");  // Clear password input
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle registration
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const newUser = userCredential.user;

      // 🆕 Save to Firestore with default role
      await setDoc(doc(db, "users", newUser.uid), {
        email: newUser.email,
        role: "admin"
      });

      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      clearUser();  // Ensure the role is also cleared
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h2>Login Page</h2>
      <form onSubmit={handleLogIn}>
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}  // Use loginEmail state
        />
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          required
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}  // Use loginPassword state
        />
        <button type="submit">Log In</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          required
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}  // Use registerEmail state
        />
        <label htmlFor="register-password">Password:</label>
        <input
          type="password"
          id="register-password"
          required
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}  // Use registerPassword state
        />
        <button type="submit">Register</button>
      </form>

      {errorMessage && <h3>{errorMessage}</h3>}

      {user && (
        <>
          <h4>Logged in as: {user.email}</h4>
          <h5>Role: {role}</h5>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </>
  );
}

export default LoginPage;
