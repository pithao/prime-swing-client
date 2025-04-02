// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkOyxGKbQMtM70GidIJqY9lKrQecyXM3U",
  authDomain: "prime-swing-client.firebaseapp.com",
  databaseURL: "https://prime-swing-client-default-rtdb.firebaseio.com",
  projectId: "prime-swing-client",
  storageBucket: "prime-swing-client.firebasestorage.app",
  messagingSenderId: "931550620643",
  appId: "1:931550620643:web:2f41dfea59ee20572dced6",
  measurementId: "G-4LZNGMMD5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db };