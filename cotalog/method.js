// Поиск товаров
search.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value === '') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(p =>
            p.name.toLowerCase().includes(value) ||
            p.description.toLowerCase().includes(value)
        );
    }

    renderCatalog(currentProducts);
});

// Сортировка
sort.addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === 'default') {
        currentProducts = [...products];
    } else {
        currentProducts = [...currentProducts].sort((a, b) => {
            if (value === 'name') return a.name.localeCompare(b.name);
            if (value === 'price') return b.price - a.price;
            if (value === 'rating') return b.rating - a.rating;
            return 0;
        });
    }

    renderCatalog(currentProducts);
});

// Фильтрация по рейтингу
sortCategory.addEventListener('change', function() {
    const selectedRating = this.value;

    if (selectedRating === "default") {
        currentProducts = [...products];
    } else {
        const targetRating = parseFloat(selectedRating.replace(',', '.'));
        currentProducts = products.filter(product => {
            const productRating = typeof product.rating === 'string'
                ? parseFloat(product.rating.replace(',', '.'))
                : product.rating;
            return productRating === targetRating;
        });
    }

    renderCatalog(currentProducts);
});

// Сброс фильтров
reset.addEventListener('click', () => {
    search.value = '';
    sort.value = 'default';
    sortCategory.value = 'default';
    currentProducts = [...products];
    renderCatalog(currentProducts);
});

// Методы массивов
function applyMethod(method) {
    try {
        const methodHandlers = {
            map: handleMap,
            filter: handleFilter,
            reduce: handleReduce,
            reverse: handleReverse,
            every: handleEvery,
            find: handleFind,
            top10: handleTop10,
            a_names: handleANames
        };

        if (methodHandlers[method]) {
            methodHandlers[method]();
        }
    } catch (error) {
        console.error('Ошибка при применении метода:', error);
    }
}

function handleMap() {
    currentProducts = currentProducts.map(p => ({
        ...p,
        name: `Товар: ${p.name}`
    }));
    renderCatalog(currentProducts);
}

function handleFilter() {
    currentProducts = currentProducts.filter(p => p.price > 30000);
    renderCatalog(currentProducts);
}

function handleReduce() {
    const total = currentProducts.reduce((sum, p) => sum + p.price, 0);
    alert(`Общая стоимость: ${total} руб.`);
}

function handleReverse() {
    currentProducts = [...currentProducts].reverse();
    renderCatalog(currentProducts);
}

function handleEvery() {
    const allExpensive = currentProducts.every(p => p.price > 40000);
    alert(allExpensive ? 'Все товары > 40000 руб.' : 'Есть товары ≤ 40000 руб.');
}

function handleFind() {
    const foundProduct = currentProducts.find(p => p.price > 45000);
    alert(foundProduct ? `Найден: ${foundProduct.name}` : 'Товар не найден');
}

function handleTop10() {
    currentProducts = [...products]
        .sort((a, b) => b.price - a.price)
        .slice(0, 10);
    renderCatalog(currentProducts);
}

function handleANames() {
    currentProducts = products.filter(p =>
        p.name.toLowerCase().startsWith('а')
    );
    renderCatalog(currentProducts);
}