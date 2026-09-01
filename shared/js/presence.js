// PRESENCE — lightweight "who's viewing what right now" tracker.
const PRESENCE_STALE_MS = 60 * 1000;
const PRESENCE_HEARTBEAT_MS = 20 * 1000;

function getSessionId() {
    let id = sessionStorage.getItem("ojaSessionId");
    if (!id) {
        id = "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("ojaSessionId", id);
    }
    return id;
}

let presenceInterval = null;

function startWatchingProduct(productId, productName) {
    const sessionId = getSessionId();
    const ref = db.collection("presence").doc(sessionId);

    function beat() {
        ref.set({
            productId: productId,
            productName: productName,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(function () { });
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