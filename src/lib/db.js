import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaiFjkFHdxdaYNHb5XjD5y6w35YFcAwy0",
  authDomain: "weather-5450e.firebaseapp.com",
  databaseURL: "https://weather-5450e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weather-5450e",
  storageBucket: "weather-5450e.firebasestorage.app",
  messagingSenderId: "178435094402",
  appId: "1:178435094402:web:5fa2e0f54300fd46f2c19b",
  measurementId: "G-FXGGY269EM"
    
};


const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const db = getFirestore(app)