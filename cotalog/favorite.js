async function checkFavoritesStatus(productId) {
    try {
        const response = await fetch(`${FAVORITES_URL}?productId=${productId}`);
        const favorites = await response.json();
        return favorites.some(item => item.productId === productId);
    } catch (error) {
        console.error('Error checking favorites status:', error);
        return false;
    }
}

async function toggleFavorite(product) {
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