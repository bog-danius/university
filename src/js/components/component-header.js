import Logo from "../../img/Logo.svg";

class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log(userData);
        const userInfoHtml = userData
            ? `<div class="user-info">
                    <span class="nav-link">Welcome, ${userData.firstName} (${userData.nickname})</span>
                    <button id="logoutBtn" class="get-tickets1">Logout</button>
               </div>`
            : `<a href="/reg/index.html" class="nav-link">Login</a>`;

        const adminLink = userData && userData.role === "admin"
            ? `<li><a href="../../../admin/index.html" class="nav-link">Админ-панель</a></li>`
            : '';

        this.innerHTML = `
            <div class="header-container">
                 <a href="/index.html">
                  <img src="${Logo}" alt="лого" class="logo">
                </a>
                <input type="checkbox" id="burger-toggle" class="burger-checkbox">
                <label for="burger-toggle" class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <nav class="navbar">
                    <ol class="nav-list">
                        <li><a href="/" class="nav-link">Home</a></li>
                        <li><a href="/feedback/index.html" class="nav-link">Отзывы</a></li>
                        ${adminLink}
                        <li>
                            <button class="get-tickets"><a href="/catalog/index.html">Get Tickets</a></button>
                        </li>
                        <li class="nav-link">${userInfoHtml}</li>
                    </ol>
                </nav>
            </div>
        `;
    }

    connectedCallback() {
        const logoutBtn = this.querySelector("#logoutBtn");
        logoutBtn.addEventListener("click", () => {
            const user = JSON.parse(localStorage.getItem("loggedInUser"));
            if (user) {
                localStorage.removeItem(`favorites_${user.id}`);
                localStorage.removeItem(`cart_${user.id}`);
            }
            localStorage.removeItem("loggedInUser");
            window.location.href = "../reg/index.html";
        });
    }

}

customElements.define('widget-header', ComponentHeader);
