const catalog = document.getElementById('catalog');
const search = document.getElementById('search');
const sort = document.getElementById('sort');
const sortCategory = document.getElementById('sortCategory');
const reset = document.getElementById('reset');

let products = [];
let currentProducts = [];
let favorites = [];
let cartItems = [];


function renderCatalog(items) {
    catalog.innerHTML = '';

    if (!items || items.length === 0) {
        catalog.innerHTML = "<p class='error'>Товары не найдены</p>";
        return;
    }

    items.forEach(item => {
        const isFavorite = favorites.includes(item.id);
        const inCart = cartItems.includes(item.id);

        const productElement = document.createElement('div');
        productElement.className = 'catalog-cart';
        productElement.innerHTML = `
                <img src="${item.image}" alt="product" class="catalog-cart__img">
                <div class="catalog-cart__text-wrapper">
                    <p class="catalog-cart__name">${item.name}</p>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <p class="catalog-cart__price">${item.price}руб</p>
                        <p class="catalog-cart__price">Рейтинг: ${item.rating}</p>
                    </div>
                </div>
                <p class="catalog-cart__description">${item.description}</p>
                <div class="catalog-cart__buttons">
                    <button class="btn-catalog ${isFavorite ? 'active' : ''}">
                        ${isFavorite ? 'Убрать из избранного' : 'В избранное'}
                    </button>
                    <button class="btn-catalog ${inCart ? 'active' : ''}">
                        ${inCart ? 'Убрать из корзины' : 'В корзину'}
                    </button>
                </div>
            `;

        const favoriteBtn = productElement.querySelector('.btn-catalog:first-child');
        const cartBtn = productElement.querySelector('.btn-catalog:last-child');

        favoriteBtn.addEventListener('click', () => toggleFavorite(item.id, favoriteBtn));
        cartBtn.addEventListener('click', () => toggleCart(item.id, cartBtn));

        catalog.appendChild(productElement);
    });
}

// Загрузка данных
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        products = await response.json();
        currentProducts = [...products];
        renderCatalog(currentProducts);

        const favResponse = await fetch(FAVORITES_URL);
        favorites = (await favResponse.json()).map(item => item.productId);

        const cartResponse = await fetch(CART_URL);
        cartItems = (await cartResponse.json()).map(item => item.productId);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);