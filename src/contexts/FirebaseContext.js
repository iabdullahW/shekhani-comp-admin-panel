import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project configuration
const firebaseConfig = {
 apiKey: "AIzaSyAsgct0mPjxlDDNT5vTVjwRP1XT8Ymspow",
  authDomain: "admin-84b44.firebaseapp.com",
  projectId: "admin-84b44",
  storageBucket: "admin-84b44.firebasestorage.app",
  messagingSenderId: "344239800307",
  appId: "1:344239800307:web:7dbdd01c205ea1b84a5c86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };