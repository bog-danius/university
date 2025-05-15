import loadProducts from './pagination.js';
import toggleFavorite from './favorite.js';
import toggleCart from './cart.js';
import checkFavoritesStatus from './favorite-status.js';
import checkCartStatus from './cart-status.js';
import { totalPages } from "./pagination.js";

const catalog = document.getElementById("catalog");
let productModal = null;

// Создание модального окна
function createModal() {
    if (productModal) return productModal;

    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img class="modal-image" src="" alt="Product Image">
                <div class="modal-info">
                    <h2 class="modal-title"></h2>
                    <p class="modal-price"></p>
                    <p class="modal-rating"></p>
                    <p class="modal-description"></p>
                    <div class="modal-buttons">
                        <button class="btn-catalog modal-favorite-btn"></button>
                        <button class="btn-catalog modal-cart-btn"></button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Обработчики закрытия
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    productModal = modal;
    return modal;
}

function closeModal() {
    if (productModal) {
        productModal.style.display = 'none';
        document.body.style.overflow = '';
    }

}

async function openProductModal(product) {
    const modal = createModal();

    // Защита — убедимся, что модалка корректно создана
    const titleEl = modal.querySelector('.modal-title');
    if (!titleEl) {
        console.error('Ошибка: модальное окно не содержит .modal-title');
        return;
    }

    const imageEl = modal.querySelector('.modal-image');
    const priceEl = modal.querySelector('.modal-price');
    const ratingEl = modal.querySelector('.modal-rating');
    const descEl = modal.querySelector('.modal-description');
    const favoriteBtn = modal.querySelector('.modal-favorite-btn');
    const cartBtn = modal.querySelector('.modal-cart-btn');

    if (!imageEl || !priceEl || !ratingEl || !descEl || !favoriteBtn || !cartBtn) {
        console.error('Ошибка: не найдены элементы модалки');
        return;
    }

    const [isFavorite, inCart] = await Promise.all([
        checkFavoritesStatus(product.id),
        checkCartStatus(product.id)
    ]);

    imageEl.src = product.image || '';
    titleEl.textContent = product.name || '';
    priceEl.textContent = product.price ? `${product.price} руб` : 'Цена не указана';
    ratingEl.textContent = product.rating ? `Рейтинг: ${product.rating}` : 'Рейтинг не указан';
    descEl.textContent = product.description || 'Описание отсутствует';

    favoriteBtn.textContent = isFavorite ? 'Убрать из избранного' : 'В избранное';
    favoriteBtn.className = `btn-catalog ${isFavorite ? 'active' : ''}`;
    favoriteBtn.onclick = async () => {
        await toggleFavorite(product);
        const newStatus = await checkFavoritesStatus(product.id);
        favoriteBtn.textContent = newStatus ? 'Убрать из избранного' : 'В избранное';
        favoriteBtn.className = `btn-catalog ${newStatus ? 'active' : ''}`;
    };

    cartBtn.textContent = inCart ? 'Убрать из корзины' : 'В корзину';
    cartBtn.className = `btn-catalog ${inCart ? 'active' : ''}`;
    cartBtn.onclick = async () => {
        await toggleCart(product);
        const newStatus = await checkCartStatus(product.id);
        cartBtn.textContent = newStatus ? 'Убрать из корзины' : 'В корзину';
        cartBtn.className = `btn-catalog ${newStatus ? 'active' : ''}`;
    };

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

export default async function renderCatalog(items) {
    console.log('Rendering catalog with items:', items);
    if (!items || items.length === 0) {
        catalog.innerHTML = '<p class="no-products">Товары не найдены</p>';
        return;
    }

    try {
        catalog.innerHTML = '';

        items.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'catalog-item';

            productElement.innerHTML = `
                <div class="catalog-cart">
                    <img src="${item.image}" alt="product" class="catalog-cart__img">
                    <div class="catalog-cart__text-wrapper">
                        <p class="catalog-cart__name">${item.name}</p>
                        <div class="price-rating-wrapper">
                            <p class="catalog-cart__price">${item.price} руб</p>
                            <p class="catalog-cart__rating">Рейтинг: ${item.rating}</p>
                        </div>
                    </div>
                    <p class="catalog-cart__description">${item.description}</p>
                    <div class="catalog-cart__buttons">
                        <button class="btn-catalog" data-id="${item.id}" data-type="favorite">
                            В избранное
                        </button>
                        <button class="btn-catalog" data-id="${item.id}" data-type="cart">
                            В корзину
                        </button>
                    </div>
                </div>
            `;

            // Обработчик клика по карточке
            productElement.addEventListener('click', async (e) => {
                if (!e.target.closest('.btn-catalog')) {
                    await openProductModal(item);
                }
            });

            catalog.appendChild(productElement);
        });

        // Обновление статуса кнопок после рендера
        for (const item of items) {
            const [isFavorite, inCart] = await Promise.all([
                checkFavoritesStatus(item.id),
                checkCartStatus(item.id)
            ]);

            const favoriteBtn = catalog.querySelector(`[data-id="${item.id}"][data-type="favorite"]`);
            const cartBtn = catalog.querySelector(`[data-id="${item.id}"][data-type="cart"]`);

            if (favoriteBtn) {
                favoriteBtn.textContent = isFavorite ? 'Убрать из избранного' : 'В избранное';
                favoriteBtn.classList.toggle('active', isFavorite);
                favoriteBtn.onclick = () => toggleFavorite(item);
            }

            if (cartBtn) {
                cartBtn.textContent = inCart ? 'Убрать из корзины' : 'В корзину';
                cartBtn.classList.toggle('active', inCart);
                cartBtn.onclick = () => toggleCart(item);
            }
        }
    } catch (error) {
        console.error('Error rendering catalog:', error);
        catalog.innerHTML = '<p class="error">Ошибка отображения товаров</p>';
    }
}

function initCatalog() {
    console.log('Catalog initialized');
    loadProducts(totalPages);
}

document.addEventListener('DOMContentLoaded', () =>{
    createModal()
    initCatalog()
});