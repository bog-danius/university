const API_URL = 'http://localhost:3000/services';
const FAVORITES_URL = 'http://localhost:3000/favorites';
const CART_URL = 'http://localhost:3000/cart';


async function checkAPI() {
    try {
        const test = await fetch(API_URL);
        if (!test.ok) throw new Error('API недоступен');

        const data = await test.json();
        if (!Array.isArray(data)) throw new Error('Некорректный ответ API');

        console.log('[API] Connection OK');
        return true;
    } catch (error) {
        console.error('[API ERROR]', error);
        document.body.innerHTML = `
      <div class="api-error">
        <h2>Ошибка соединения</h2>
        <p>${error.message}</p>
        <p>Проверьте:</p>
        <ul>
          <li>Запущен ли сервер</li>
          <li>Правильный ли URL: ${API_URL}</li>
          <li>Доступность CORS</li>
        </ul>
      </div>
    `;
        return false;
    }
}
checkAPI();