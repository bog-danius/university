async function toggleCart(productId, button) {
    try {
        const checkResponse = await fetch(`${CART_URL}?productId=${productId}`);
        const existing = await checkResponse.json();

        if (existing.length > 0) {
            // Удаление
            await fetch(`${CART_URL}/${existing[0].id}`, {
                method: 'DELETE'
            });
            cartItems = cartItems.filter(id => id !== productId);
            button.textContent = 'В корзину';
            button.classList.remove('active');
        } else {
            // Добавление
            const product = products.find(p => p.id === productId);
            await fetch(CART_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    addedAt: new Date().toISOString(),
                    quantity: 1
                })
            });
            cartItems.push(productId);
            button.textContent = 'Убрать из корзины';
            button.classList.add('active');
        }
    } catch (error) {
        console.error('Ошибка при работе с корзиной:', error);
    }
}