// The cart is a plain array stored in the browser's localStorage:
// [{ id, name, price, quantity }, ...]
// This is per-browser, not tied to a signed-in account, and doesn't
// need Firebase at all — just the browser's own built-in storage.

function getCart() {
    const raw = localStorage.getItem("ojaCart");
    return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
    localStorage.setItem("ojaCart", JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(function (line) { return line.id === item.id; });

    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }

    saveCart(cart);
}

function removeFromCart(id) {
    saveCart(getCart().filter(function (line) { return line.id !== id; }));
}

function updateCartQuantity(id, quantity) {
    const cart = getCart();
    const line = cart.find(function (l) { return l.id === id; });
    if (line) {
        line.quantity = quantity < 1 ? 1 : quantity;
    }
    saveCart(cart);
}

function getCartCount() {
    return getCart().reduce(function (sum, line) { return sum + line.quantity; }, 0);
}