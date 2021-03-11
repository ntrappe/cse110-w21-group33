class PomoSettings extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const element = document.createElement('p');

    element.textContent = 'Settings';

    shadow.appendChild(element);
  }
}

customElements.define('pomo-settings', PomoSettings);

export default PomoSettings;
