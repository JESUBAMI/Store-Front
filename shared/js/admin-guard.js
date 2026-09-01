// Admin route guard — load this AFTER firebase-config.js on every admin page
// (dashboard, add-product, products, orders). Kicks out anyone not signed in,
// or signed in but not tagged role: "admin" in Firestore.

auth.onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    db.collection("users").doc(user.uid).get().then(function (doc) {
        if (!doc.exists || doc.data().role !== "admin") {
            auth.signOut();
            window.location.href = "login.html";
        }
    }).catch(function () {
        window.location.href = "login.html";
    });
});