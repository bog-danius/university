document.addEventListener('DOMContentLoaded', async () => {
    await loadFavorites();
});

async function loadFavorites() {
    try {
        const response = await fetch(FAVORITES_URL);
        if (!response.ok) throw new Error('Ошибка загрузки избранного');

        const favorites = await response.json();
        const container = document.getElementById('favoritesContainer');

        if (!favorites || favorites.length === 0) {
            container.innerHTML = '<p class="no-favorites">У вас пока нет избранных товаров</p>';
            return;
        }

        container.innerHTML = '';

        favorites.forEach(item => {
            const favoriteElement = document.createElement('div');
            favoriteElement.className = 'favorites-item';
            favoriteElement.innerHTML = `
                <div class="catalog-cart">
                    <img src="${item.image}" alt="product" class="catalog-cart__img">
                    <div class="catalog-cart__text-wrapper">
                        <p class="catalog-cart__name">${item.name}</p>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <p class="catalog-cart__price">${item.price} руб</p>
                            <p class="catalog-cart__price">Рейтинг: ${item.rating}</p>
                        </div>
                    </div>
                    <p class="catalog-cart__description">${item.description}</p>
                    <div class="catalog-cart__buttons">
                         <button class="remove-favorite" data-id="${item.productId}">Удалить из избранного</button>
                    </div>
                </div>
                `;
            container.appendChild(favoriteElement);
        });

        document.querySelectorAll('.remove-favorite').forEach(button => {
            button.addEventListener('click', async (e) => {
                const productId = e.target.getAttribute('data-id');
                await removeFromFavorites(productId);
                await loadFavorites();
            });
        });

    } catch (error) {
        console.error('Error loading favorites:', error);
        document.getElementById('favoritesContainer').innerHTML =
            '<p class="error">Ошибка загрузки избранных товаров</p>';
    }
}

async function removeFromFavorites(productId) {
    try {
        const response = await fetch(`${FAVORITES_URL}?productId=${productId}`);
        const favorites = await response.json();
        const favoriteItem = favorites.find(item => item.productId === productId);

        if (favoriteItem) {
            const deleteResponse = await fetch(`${FAVORITES_URL}/${favoriteItem.id}`, {
                method: 'DELETE'
            });

            if (!deleteResponse.ok) {
                throw new Error('Ошибка при удалении из избранного');
            }
        }
    } catch (error) {
        console.error('Error removing from favorites:', error);
        alert('Не удалось удалить товар из избранного');
    }
}
