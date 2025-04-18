class ComponentHeader extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <div class="header-container">
                <img src="./assert/img/Logo.svg" alt="лого" class="logo">
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
                                    <path d="M7.76375 1.65551C8.07875 1.99628 8.07875 2.54888 7.76375 2.88965L4.5704 6.34429C4.25537 6.68511 3.74464 6.68511 3.42961 6.34429L0.236259 2.88974C0.0790314 2.71951 -4.78938e-08 2.49558 -3.81498e-08 2.27267C-2.84075e-08 2.04979 0.0789151 1.82588 0.236212 1.65565C0.551248 1.31483 1.06201 1.31479 1.37705 1.6556L3.19335 3.62045L4 4.51597L4.80666 3.62043L6.62296 1.65551C6.938 1.3147 7.44872 1.3147 7.76375 1.65551Z"
                                          fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link">Schedule
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                    <path d="M7.76375 1.65551C8.07875 1.99628 8.07875 2.54888 7.76375 2.88965L4.5704 6.34429C4.25537 6.68511 3.74464 6.68511 3.42961 6.34429L0.236259 2.88974C0.0790314 2.71951 -4.78938e-08 2.49558 -3.81498e-08 2.27267C-2.84075e-08 2.04979 0.0789151 1.82588 0.236212 1.65565C0.551248 1.31483 1.06201 1.31479 1.37705 1.6556L3.19335 3.62045L4 4.51597L4.80666 3.62043L6.62296 1.65551C6.938 1.3147 7.44872 1.3147 7.76375 1.65551Z"
                                          fill="white"/>
                                </svg>
                            </a>
                        </li>
                        <li><a href="#" class="nav-link">Contact Us</a></li>
                        <li>
                            <button class="get-tickets">Get Tickets</button>
                        </li>
                    </ol>
                </nav>
            </div>
        `;
    }
}

customElements.define('widget-header', ComponentHeader);