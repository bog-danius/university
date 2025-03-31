class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
             <div class="footer-content">
        <img src="./assert/img/Logo.svg" alt="лого" class="logo">
        <div class="footer-content-info">
            <ul class="footer-menu1">
                <li class="footer-item"><a href="#" class="footer-link">Home</a></li>
                <li class="footer-item"><a href="#" class="footer-link">Company</a></li>
                <li class="footer-item"><a href="#" class="footer-link">Blog</a></li>
                <li class="footer-item"><a href="#" class="footer-link">Contact Us</a></li>
                <li class="footer-item"><a href="#" class="footer-link">Sitemap</a></li>
            </ul>
            <div class="footer-social">
                <ul class="footer-menu2">
                    <li class="footer-item">
                        <a href="" class="footer-link">
                            <img src="assert/img/Facebook.svg" alt="Facebook">
                        </a>
                    </li>
                    <li class="footer-item">
                        <a href="" class="footer-link">
                            <img src="assert/img/Twitter.svg" alt="Twitter">
                        </a>
                    </li>
                    <li class="footer-item">
                        <a href="" class="footer-link">
                            <img src="assert/img/Linkedin.svg" alt="Linkedin">
                        </a>
                    </li>
                    <li class="footer-item">
                        <a href="" class="footer-link">
                            <img src="assert/img/Instagram.svg" alt="Instagram">
                        </a>
                    </li>

                </ul>
                <p class="footer-text">&copy; musik.com, 2024</p>
            </div>

        </div>

    </div>
        `;
    }
}

customElements.define('widget-footer', ComponentFooter);