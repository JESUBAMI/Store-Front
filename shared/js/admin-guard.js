// Admin route guard — load this AFTER firebase-config.js on every admin page
// (dashboard, add-product, products, orders). Kicks out anyone not signed in,
// or signed in but not tagged role: "admin" in Firestore.
// Admin route guard – load AFTER firebase-config.js on every admin page
auth.onAuthStateChanged((user) => {
    if (!user) {
        // 1. Kick out anyone not signed in
        window.location.href = "/admin/login.html";
    } else {
        // 2. Check if signed-in user has the 'admin' role in Firestore
        db.collection("users").doc(user.uid).get().then(function (doc) {
            if (!doc.exists || doc.data().role !== "admin") {
                auth.signOut();
                window.location.href = "/admin/login.html";
            } else {
                console.log("Admin access granted:", user.email);
            }
        }).catch(function (error) {
            console.error("Admin guard error:", error);
            window.location.href = "/admin/login.html";
        });
    }
});