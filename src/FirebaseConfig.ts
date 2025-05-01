// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0DbcFHscA__esXO274pn7dFmVEb2iLbY",
  authDomain: "coolors-webapp.firebaseapp.com",
  projectId: "coolors-webapp",
  storageBucket: "coolors-webapp.firebasestorage.app",
  messagingSenderId: "151657629625",
  appId: "1:151657629625:web:a9950987987423f6e31868",
  measurementId: "G-9CL6RQWJKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);