import {FAVORITES_URL} from "../api/api.js";

export default async function checkFavoritesStatus(productId) {
    try {
        const response = await fetch(`${FAVORITES_URL}?productId=${productId}`);
        const favorites = await response.json();
        return favorites.some(item => item.productId === productId);
    } catch (error) {
        console.error('Error checking favorites status:', error);
        return false;
    }
}
