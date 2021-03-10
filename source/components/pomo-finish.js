class PomoFinish extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');

        element.textContent = "Finish";
        
        shadow.appendChild(element);
    }
}

customElements.define('pomo-finish', PomoFinish);

export { PomoFinish };