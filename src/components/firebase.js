// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEyVQdan96CoBEHV2ucyU91x63VlKelOY",
  authDomain: "world-map-cd8de.firebaseapp.com",
  projectId: "world-map-cd8de",
  storageBucket: "world-map-cd8de.appspot.com",
  messagingSenderId: "116406571373",
  appId: "1:116406571373:web:f41a1fcf018e57e8fb0a64",
  measurementId: "G-XRG58CKJP0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
