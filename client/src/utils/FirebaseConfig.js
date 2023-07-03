import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW3tR-yw6U2zhFKLsoPSA6yO8GtnYgrII",
  authDomain: "whatsapp-clone-5bf97.firebaseapp.com",
  projectId: "whatsapp-clone-5bf97",
  storageBucket: "whatsapp-clone-5bf97.appspot.com",
  messagingSenderId: "173990092978",
  appId: "1:173990092978:web:54d73a8a03b9a0ee1ce9ab",
  measurementId: "G-YZJSQ2NZPW",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
