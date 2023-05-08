// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL7xm-aSYBe2youpxEfrsDPgDZL6Ipua8",
  authDomain: "company-mgmt-app.firebaseapp.com",
  projectId: "company-mgmt-app",
  storageBucket: "company-mgmt-app.appspot.com",
  messagingSenderId: "297752760658",
  appId: "1:297752760658:web:a5ab274fd5498492fd2a8b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();