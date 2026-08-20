// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBZB32-ZZeZDpqF6LGmNuzxTbbfTUbz64",
    authDomain: "my-storefront-app.firebaseapp.com",
    databaseURL: "https://my-storefront-app-default-rtdb.firebaseio.com",
    projectId: "my-storefront-app",
    storageBucket: "my-storefront-app.firebasestorage.app",
    messagingSenderId: "123744625360",
    appId: "1:123744625360:web:55ad58361a11feb2f7b4d5"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);