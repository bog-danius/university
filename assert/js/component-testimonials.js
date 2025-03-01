class ComponentTestimonials extends HTMLElement {
    constructor() {
        super();

        const logo = this.getAttribute('logo');
        const text = this.getAttribute('text');
        const img = this.getAttribute('img');
        const opacity = this.getAttribute('opacity');

        this.innerHTML = `
                <div class="testimonial-card" style="opacity: ${opacity}">
                    <div class="testimonial-card-stats">
                        <img src="./assert/img/Quotes-open.svg" alt="quotes-open" class="quotes-open">
                        <p class="testimonial-text">"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</p>
                        <img src="./assert/img/Quotes-clothes.svg" alt="quotes-closes" class="quotes-close">
                    </div>
                    <div class="testimonial-author">
                         <img src="${img}" alt="${logo}" class="author-img">
                         <div class="testimonial-author-info"> 
                            <p class="author-name">${logo}</p>
                            <a href="#" class="author-link">${text}</a>
                         </div>
                    </div>
                </div>
            `;
    }
}

customElements.define('widget-testimonials', ComponentTestimonials);