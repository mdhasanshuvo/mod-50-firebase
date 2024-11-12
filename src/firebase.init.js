// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRk4m3xpRcYbx4yBW1oFFwP-UJoX8pZVY",
  authDomain: "email-password-auth-fe760.firebaseapp.com",
  projectId: "email-password-auth-fe760",
  storageBucket: "email-password-auth-fe760.firebasestorage.app",
  messagingSenderId: "788967257960",
  appId: "1:788967257960:web:f189de2c89d2b0587648dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;