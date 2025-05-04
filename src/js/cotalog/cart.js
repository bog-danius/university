import loadProducts from './pagination.js';
import {CART_URL} from "../api/api.js";
import {currentPage, currentFilter} from './pagination.js';
import checkCartStatus from './cart-status.js'

export default async function toggleCart(product) {
    try {
        const inCart = await checkCartStatus(product.id);

        if (inCart) {
            const response = await fetch(`${CART_URL}?productId=${product.id}`);
            const cartItems = await response.json();
            const cartItem = cartItems.find(item => item.productId === product.id);

            if (cartItem) {
                await fetch(`${CART_URL}/${cartItem.id}`, {
                    method: 'DELETE'
                });
            }
        } else {
            await fetch(CART_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: product.id,
                    ...product,
                    quantity: 1
                })
            });
        }

        // Обновляем отображение
        loadProducts(currentPage, currentFilter);
    } catch (error) {
        console.error('Error toggling cart:', error);
    }
}