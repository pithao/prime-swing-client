// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Sbu_U-92EJkmbaPeg1QiAGk1McJJTcE",
  authDomain: "swing-dancers.firebaseapp.com",
  projectId: "swing-dancers",
  storageBucket: "swing-dancers.firebasestorage.app",
  messagingSenderId: "757668612407",
  appId: "1:757668612407:web:83a9485583010997c3b2b2",
  measurementId: "G-5CXD9QQDCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);