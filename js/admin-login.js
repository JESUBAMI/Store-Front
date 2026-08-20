import { auth, googleProvider, db } from "./firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


const loginForm = document.getElementById("admin-login-form");
const googleBtn = document.getElementById("google-login-btn");
const errorAlert = document.getElementById("error-alert");

