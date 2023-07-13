import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_iFBne_QXsJuiddtoY9JKCqrY_Po3zt8",
  authDomain: "react-assessment-dmp.firebaseapp.com",
  projectId: "react-assessment-dmp",
  storageBucket: "react-assessment-dmp.appspot.com",
  messagingSenderId: "867575763812",
  appId: "1:867575763812:web:12e9fa27554f982ff22071",
  measurementId: "G-22QHVPX72H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp({
  firebaseConfig
});

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.FacebookAuthProvider.react-assessment-dmp,
    firebase.auth.GoogleAuthProvider.project-867575763812
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Login;