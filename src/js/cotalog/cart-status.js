import {CART_URL} from "../api/api.js";

export default async function checkCartStatus(productId) {
    try {
        const response = await fetch(`${CART_URL}?productId=${productId}`);
        const cartItems = await response.json();
        return cartItems.some(item => item.productId === productId);
    } catch (error) {
        console.error('Error checking cart status:', error);
        return false;
    }
}