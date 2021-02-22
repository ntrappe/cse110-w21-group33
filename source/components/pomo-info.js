class PomoInfo extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');

        element.textContent = "Info";
        
        shadow.appendChild(element);
      }
}

customElements.define('pomo-info', PomoInfo);

export { PomoInfo };