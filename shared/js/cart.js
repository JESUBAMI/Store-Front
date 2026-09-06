// Read the whole cart
function getCart() {
    const raw = localStorage.getItem("ojaCart");
    return raw ? JSON.parse(raw) : [];
}

// Overwrite the whole cart
function saveCart(cart) {
    localStorage.setItem("ojaCart", JSON.stringify(cart));
}

// Add an item (or bump its quantity if it's already in the cart)
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

// Remove one line entirely
function removeFromCart(id) {
    saveCart(getCart().filter(function (line) { return line.id !== id; }));
}

// Change one line's quantity (never below 1) 
function updateCartQuantity(id, quantity) {
    const cart = getCart();
    const line = cart.find(function (l) { return l.id === id; });
    if (line) {
        line.quantity = quantity < 1 ? 1 : quantity;
    }
    saveCart(cart);
}

// Total item count, for the navbar badge
function getCartCount() {
    return getCart().reduce(function (sum, line) { return sum + line.quantity; }, 0);
}