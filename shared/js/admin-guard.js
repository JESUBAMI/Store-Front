// Admin route guard — load this AFTER firebase-config.js on every admin page
// (dashboard, add-product, products, orders). Kicks out anyone not signed in,
// or signed in but not tagged role: "admin" in Firestore.

// ✅ CORRECT: Waits for Firebase to determine auth status
auth.onAuthStateChanged((user) => {
    if (!user) {
        // User is not logged in, send to admin login page
        window.location.href = "/admin/login.html";
    } else {
        // User is authenticated, initialize dashboard data
        console.log("Logged in as:", user.email);
    }
});

db.collection("users").doc(user.uid).get().then(function (doc) {
    if (!doc.exists || doc.data().role !== "admin") {
        auth.signOut();
        window.location.href = "login.html";
    }
}).catch(function () {
    window.location.href = "login.html";
});