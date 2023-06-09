import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBq4Hn9oU1zi3iOOwY6cd2wYMvn1-IfTeU",
    authDomain: "book-management-a.firebaseapp.com",
    projectId: "book-management-a",
    storageBucket: "book-management-a.appspot.com",
    messagingSenderId: "221069313554",
    appId: "1:221069313554:web:f15b84b89b53ed6f07bacb",
    measurementId: "G-95NRVGGSEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = new getFirestore(app);
