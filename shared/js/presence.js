// PRESENCE — lightweight "who's viewing what right now" tracker.
//
// CONCEPT: There's no built-in way to know who else is looking at a
// webpage. We fake "live" presence with a heartbeat: every device that
// opens a product page writes a small Firestore doc saying "I'm here,
// looking at product X", and keeps re-writing it every 20 seconds to
// prove it's still there. Anyone who hasn't "checked in" for the last
// 60 seconds is treated as gone (closed tab, lost connection, etc.),
// even if they never got a chance to formally announce they're leaving.
//
// Collection shape:  presence/{sessionId} = { productId, productName, lastSeen }
// sessionId is random per browser tab, stored in sessionStorage so a
// refresh re-uses the same doc instead of creating a new one each time.

const PRESENCE_STALE_MS = 60 * 1000;   // treat as "gone" after 60s of silence
const PRESENCE_HEARTBEAT_MS = 20 * 1000; // re-announce every 20s

function getSessionId() {
    let id = sessionStorage.getItem("ojaSessionId");
    if (!id) {
        id = "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("ojaSessionId", id);
    }
    return id;
}

let presenceInterval = null;

// Call this on a product page: announces "I'm viewing this product" and
// keeps re-announcing until stopWatchingProduct() runs or the tab closes.
function startWatchingProduct(productId, productName) {
    const sessionId = getSessionId();
    const ref = db.collection("presence").doc(sessionId);

    function beat() {
        ref.set({
            productId: productId,
            productName: productName,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function () { /* best-effort — a missed beat just expires naturally */ });
    }

    beat();
    presenceInterval = setInterval(beat, PRESENCE_HEARTBEAT_MS);

    window.addEventListener("beforeunload", function () {
        ref.delete().catch(function () { });
    });

    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
            ref.delete().catch(function () { });
        } else {
            beat();
            if (!presenceInterval) presenceInterval = setInterval(beat, PRESENCE_HEARTBEAT_MS);
        }
    });
}

function stopWatchingProduct() {
    if (presenceInterval) {
        clearInterval(presenceInterval);
        presenceInterval = null;
    }
    db.collection("presence").doc(getSessionId()).delete().catch(function () { });
}

// Live count of people currently viewing ONE product. Calls onUpdate(count)
// every time it changes. Returns the unsubscribe function.
function watchViewersForProduct(productId, onUpdate) {
    return db.collection("presence")
        .where("productId", "==", productId)
        .onSnapshot(function (snapshot) {
            const cutoff = Date.now() - PRESENCE_STALE_MS;
            let count = 0;
            snapshot.forEach(function (doc) {
                const data = doc.data();
                if (data.lastSeen && data.lastSeen.toMillis() > cutoff) count++;
            });
            onUpdate(count);
        });
}

// Live activity across the WHOLE store, grouped by product — for the
// admin dashboard. Calls onUpdate([{ productId, productName, count }, ...]).
function watchAllActivity(onUpdate) {
    return db.collection("presence").onSnapshot(function (snapshot) {
        const cutoff = Date.now() - PRESENCE_STALE_MS;
        const byProduct = {};

        snapshot.forEach(function (doc) {
            const data = doc.data();
            if (!data.lastSeen || data.lastSeen.toMillis() <= cutoff) return;
            const key = data.productId;
            if (!byProduct[key]) {
                byProduct[key] = { productId: data.productId, productName: data.productName, count: 0 };
            }
            byProduct[key].count++;
        });

        const list = Object.values(byProduct).sort(function (a, b) { return b.count - a.count; });
        onUpdate(list);
    });
}