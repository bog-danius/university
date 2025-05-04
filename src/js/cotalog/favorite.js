import loadProducts from './pagination.js';
import {FAVORITES_URL} from "../api/api.js";
import {currentPage, currentFilter} from './pagination.js';
import checkFavoritesStatus from './favorite-status.js'


export default async function toggleFavorite(product) {
    try {
        const isFavorite = await checkFavoritesStatus(product.id);

        if (isFavorite) {

            const response = await fetch(`${FAVORITES_URL}?productId=${product.id}`);
            const favorites = await response.json();
            const favoriteItem = favorites.find(item => item.productId === product.id);

            if (favoriteItem) {
                await fetch(`${FAVORITES_URL}/${favoriteItem.id}`, {
                    method: 'DELETE'
                });
            }
        } else {

            await fetch(FAVORITES_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product.id,
                    ...product
                })
            });
        }

        loadProducts(currentPage, currentFilter);
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}