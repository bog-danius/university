import Logo from "../../img/Logo.svg";

class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
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
                <div class="overlay"></div>
                <nav class="navbar">
                    <ol class="nav-list">
                        <li><a href="/" class="nav-link">Home</a></li>
                        <li><a href="about/index.html" class="nav-link">About</a></li>
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
        if (logoutBtn) {
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

        const burgerToggle = this.querySelector("#burger-toggle");
        const navbar = this.querySelector(".navbar");
        const overlay = this.querySelector(".overlay");
        const navLinks = this.querySelectorAll(".nav-link");
        const body = document.body;

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                burgerToggle.checked = false;
                this.toggleMenu(false);
            });
        });

        overlay.addEventListener("click", () => {
            burgerToggle.checked = false;
            this.toggleMenu(false);
        });

        burgerToggle.addEventListener("change", (e) => {
            this.toggleMenu(e.target.checked);
        });
    }

    toggleMenu(show) {
        const navbar = this.querySelector(".navbar");
        const overlay = this.querySelector(".overlay");
        const body = document.body;

        if (show) {
            navbar.style.display = "flex";
            overlay.style.display = "block";
            body.style.overflow = "hidden";

            setTimeout(() => {
                navbar.style.opacity = "1";
                navbar.style.transform = "translateX(0)";
                overlay.style.opacity = "1";
            }, 10);
        } else {
            navbar.style.opacity = "0";
            navbar.style.transform = "translateX(100%)";
            overlay.style.opacity = "0";

            setTimeout(() => {
                navbar.style.display = "none";
                overlay.style.display = "none";
                body.style.overflow = "";
            }, 300);
        }
    }
}

customElements.define('widget-header', ComponentHeader);