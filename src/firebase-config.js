// firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Để sử dụng Authentication

const firebaseConfig = {
  apiKey: "AIzaSyCRCdIsPNNS0en7e_5dKQTMMxDLbYtr4ew",
  authDomain: "green-points-web-458003.firebaseapp.com",
  projectId: "green-points-web-458003",
  storageBucket: "green-points-web-458003.firebasestorage.app",
  messagingSenderId: "32373923635",
  appId: "1:32373923635:web:b6790a80cd9951133f2846",
  measurementId: "G-9DWQ4BCB3B"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Authentication
const auth = getAuth(app);

// Xuất auth để sử dụng ở các phần khác trong ứng dụng
export { auth };
