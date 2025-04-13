// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1K2Ahq6BC9TdLA9hyaKf2vFAe0mxkKI",
  authDomain: "fruitbazaar-3db86.firebaseapp.com",
  projectId: "fruitbazaar-3db86",
  storageBucket: "fruitbazaar-3db86.firebasestorage.app",
  messagingSenderId: "416326904923",
  appId: "1:416326904923:web:3aa38951bc766f207e237e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};