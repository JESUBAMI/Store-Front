// =========================================================
// FIREBASE CONFIG
// Compat SDK, loaded via plain <script> tags — works by just
// double-clicking the HTML file, no local server required.
//
// Load order on every page that needs Firebase:
//   1. firebase-app-compat.js
//   2. firebase-auth-compat.js
//   3. firebase-firestore-compat.js
//   4. this file (firebase-config.js)
//   5. (admin pages only) admin-guard.js
//   6. (pages using presence) presence.js
//
// Only ever edit the config values below — every other file
// imports the "auth" and "db" shortcuts this file creates.
// =========================================================

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

// Shortcuts every other script uses:
const auth = firebase.auth();       // authentication (sign up / sign in)
const db = firebase.firestore();    // database (products, orders, users)

// Paystack Public Key (Replace 'pk_test_placeholder_key' with your actual key from dashboard.paystack.com)
const PAYSTACK_PUBLIC_KEY = "pk_test_0123456789abcdef0123456789abcdef01234567";