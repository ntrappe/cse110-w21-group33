class PomoTimer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');

        element.textContent = "Timer";
        
        shadow.appendChild(element);
      }
}

customElements.define('pomo-timer', PomoTimer);

export { PomoTimer };