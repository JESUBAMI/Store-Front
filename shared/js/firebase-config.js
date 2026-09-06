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
const auth = firebase.auth();       
const db = firebase.firestore();    


const PAYSTACK_PUBLIC_KEY = "pk_test_13b81a13a072c75675a757c317c9c78e26bee02f";