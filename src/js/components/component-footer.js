import Logo from "../../img/Logo.svg"
import Twitter from "../../img/Twitter.svg"
import Facebook from "../../img/Facebook.svg"
import Linkedin from "../../img/Linkedin.svg"
import Instagram from "../../img/Instagram.svg"

class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
             <div class="footer-content">
                <a href="/index.html">
                  <img src="${Logo}" alt="лого" class="logo">
                </a>
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
                                    <img src="#" alt="Facebook" class="Facebook">
                                </a>
                            </li>
                            <li class="footer-item">
                                <a href="" class="footer-link">
                                    <img src="#" alt="Twitter" class="Twitter">
                                </a>
                            </li>
                            <li class="footer-item">
                                <a href="" class="footer-link">
                                    <img src="#" alt="Linkedin" class="Linkedin">
                                </a>
                            </li>
                            <li class="footer-item">
                                <a href="" class="footer-link">
                                    <img src="#" alt="Instagram" class="Instagram">
                                </a>
                            </li>
        
                        </ul>
                        <p class="footer-text">&copy; musik.com, 2024</p>
                    </div>
                 </div>
              </div>
        `;

        this.querySelector(".logo").src = Logo
        this.querySelector(".Facebook").src = Facebook
        this.querySelector(".Instagram").src = Instagram
        this.querySelector(".Linkedin").src = Linkedin
        this.querySelector(".Twitter").src = Twitter

    }
}

customElements.define('widget-footer', ComponentFooter);