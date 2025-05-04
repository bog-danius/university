export const API_URL = 'http://localhost:3000/services';
export const FAVORITES_URL = 'http://localhost:3000/favorites';
export const CART_URL = 'http://localhost:3000/cart';
export const USERS_URL = 'http://localhost:3000/users';


async function checkAPI() {
    try {
        console.log('[API] Connecting to:', API_URL);
        const test = await fetch(API_URL);
        if (!test.ok) throw new Error('API недоступен');

        const data = await test.json();
        if (!Array.isArray(data)) throw new Error('Некорректный ответ API');


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