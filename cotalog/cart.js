async function checkCartStatus(productId) {
    try {
        const response = await fetch(`${CART_URL}?productId=${productId}`);
        const cartItems = await response.json();
        return cartItems.some(item => item.productId === productId);
    } catch (error) {
        console.error('Error checking cart status:', error);
        return false;
    }
}

async function toggleCart(product) {
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