class ComponentCategories extends HTMLElement {
    constructor() {
        super();

        const logo = this.getAttribute('logo');
        const text = this.getAttribute('text');
        const img = this.getAttribute('img');
        const bg = this.getAttribute('bg');

        this.innerHTML = `
        <div class="component-list-slider-block" style="background:${bg};">
        <img src="${img}" alt="component-list-icon" class="component-list-slider-block-icon">
            <p class="component-list-slider-block-logo" >${logo}</p>
            <p class="component-list-slider-block-description" >${text}</p>
        </div>
        `
        const block = this.querySelector('.component-list-slider-block');
        const originalBg = bg;

        block.addEventListener('mouseenter', () => {
            block.style.background = originalBg.replace(/rgba?\(([^)]+),\s*[\d\.]+\)/, 'rgba($1, 0.8)');
        });

        block.addEventListener('mouseleave', () => {
            block.style.background = originalBg;
        });
    }
}

customElements.define('widget-categories', ComponentCategories);