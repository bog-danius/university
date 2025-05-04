import Logo from "../../img/Logo.svg"

class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        const userInfoHtml = userData
            ? `<div class="user-info">
                    <span>Welcome, ${userData.firstName} (${userData.nickname})</span>
                    <button id="logoutBtn">Logout</button>
               </div>`
            : `<a href="/reg/index.html" class="login-link">Login</a>`;

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
                        <li><a href="#" class="nav-link">Home</a></li>
                        <li>
                            <a href="#" class="nav-link">Speakers
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path d="..." fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link">Schedule
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path d="..." fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <li><a href="#" class="nav-link">Contact Us</a></li>
                        <li>
                            <button class="get-tickets"><a href="/catalog/index.html">Get Tickets</a></button>
                        </li>
                        <li class="nav-link">${userInfoHtml}</li>
                    </ol>
                </nav>
            </div>
        `;
        this.querySelector(".logo").src = Logo;
    }

    connectedCallback() {
        const logoutBtn = this.querySelector("#logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                window.location.href = "../reg/index.html";
            });
        }
    }
}

customElements.define('widget-header', ComponentHeader);
