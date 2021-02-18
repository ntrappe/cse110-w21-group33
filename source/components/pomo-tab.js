class PomoTab extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        let icon = document.createElement('link');
        icon.rel = 'icon';
        icon.href = '../../green.ico';
        
        document.title = 'Pomo';
        document.head.appendChild(icon);

        let button = document.createElement('button');
        button.textContent = "Red";

        shadow.appendChild(button);

        button.onclick = () => {
            if (button.textContent === "Red") {
                button.textContent = "Green";
                icon.href = '../../red.ico';
            } else {
                button.textContent = "Red";
                icon.href = '../../green.ico';
            }
        };
      }
}

customElements.define('pomo-tab', PomoTab);



//link rel="icon" href="../favicon.ico">
