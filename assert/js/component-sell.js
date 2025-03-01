class ComponentSell extends HTMLElement {
    constructor() {
        super();

        const logo = this.getAttribute('logo');
        const sell = this.getAttribute('sell');
        const infologo = this.getAttribute('infologo');
        const infotext = this.getAttribute('infotext');
        const text = this.getAttribute('text');
        const btnsell = this.getAttribute('btnsell');
        const opacity1 = this.getAttribute('opacity1');
        const opacity2 = this.getAttribute('opacity2');
        const colorsell = this.getAttribute('colorsell');
        const bordercolor = this.getAttribute('bordercolor')

        this.innerHTML = `
        <div class="component-sell-block" style="border-top: 5px solid ${bordercolor}">
            <div class="component-sell-block-title">
                <p class="component-sell-title" style="color:${colorsell}">${logo}</p>
                <p class="component-sell-text" style="color:${colorsell}">${sell}</p>
            </div>
            <div class="component-sell-block-info">
                <p class="component-sell-block-info-text">${infologo}</p>
                <p class="component-sell-block-info-text" style="opacity: ${opacity1}">${text}</p>
                <p class="component-sell-block-info-text" style="opacity: ${opacity2}">${infotext}</p>
            </div>
            <button class="btn-sell">${btnsell}</button>
        </div>
        `
        const button = this.querySelector(".btn-sell");
        button.style.border = `1px solid ${colorsell}`;
        button.style.color = colorsell;
        button.style.background = "transparent";
        button.style.transition = "all 0.3s ease-in-out";

        button.addEventListener("mouseover", () => {
            button.style.background = colorsell;
            button.style.color = "white";
        });

        button.addEventListener("mouseout", () => {
            button.style.background = "transparent";
            button.style.color = colorsell;
        });
    }
}

customElements.define('widget-sell', ComponentSell);