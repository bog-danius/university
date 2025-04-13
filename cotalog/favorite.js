

// Работа с избранным и корзиной
async function toggleFavorite(productId, button) {
    try {
        const checkResponse = await fetch(`${FAVORITES_URL}?productId=${productId}`);
        const existing = await checkResponse.json();

        if (existing.length > 0) {
            // Удаление
            await fetch(`${FAVORITES_URL}/${existing[0].id}`, {
                method: 'DELETE'
            });
            favorites = favorites.filter(id => id !== productId);
            button.textContent = 'В избранное';
            button.classList.remove('active');
        } else {
            // Добавление
            const product = products.find(p => p.id === productId);
            await fetch(FAVORITES_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    addedAt: new Date().toISOString()
                })
            });
            favorites.push(productId);
            button.textContent = 'Убрать из избранного';
            button.classList.add('active');
        }
    } catch (error) {
        console.error('Ошибка при работе с избранным:', error);
    }
}
