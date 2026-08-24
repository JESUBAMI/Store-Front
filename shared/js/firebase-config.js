// Firebase setup — compat SDK, loaded via plain <script> tags.
// Works by just opening the HTML file directly, no local server needed.
// Every page loads the 3 firebase-*-compat.js scripts, THEN this file,
// in that order — see the <head> of signup.html for the pattern.
// Only ever edit the config values here.

const firebaseConfig = {
    apiKey: "AIzaSyBBZB32-ZZeZDpqF6LGmNuzxTbbfTUbz64",
    authDomain: "my-storefront-app.firebaseapp.com",
    databaseURL: "https://my-storefront-app-default-rtdb.firebaseio.com",
    projectId: "my-storefront-app",
    storageBucket: "my-storefront-app.firebasestorage.app",
    messagingSenderId: "123744625360",
    appId: "1:123744625360:web:55ad58361a11feb2f7b4d5"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();