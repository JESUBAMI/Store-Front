// Admin route guard — load this AFTER firebase-config.js on every admin page
// (dashboard, add-product, products, orders). Kicks out anyone not signed in,
// or signed in but not tagged role: "admin" in Firestore.
//
// FIX (was disabled): this whole file was commented out before, so NOTHING
// was actually protecting these pages, and nothing here was what stopped
// admin sign-in — that bug was a missing redirect in login.html. This guard
// is still important though: without it, anyone who guesses the URL to
// dashboard.html could open it directly, no login required.

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