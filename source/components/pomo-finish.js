class PomoFinish extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        const button = document.createElement('button');
        const modal = document.createElement('div');
        const modalContent = document.createElement('div');

        modal.appendChild(modalContent);

        modal.style.cssText = `
          display: none;
          position: fixed;
          z-index: 1; 
          left: 0;
          top: 0;
          width: 100%; 
          height: 100%; 
          overflow: auto; 
          background-color: rgb(0,0,0); 
          background-color: rgba(0,0,0,0.5);`;

        modalContent.style.cssText = `
          background-color: #fefefe;
          margin: 5% auto;
          padding: 15px;
          border: 1px solid #888;
          height: 95%;
          width: 50%;`;

        modalContent.textContent = "TODO";

        button.textContent = "Finish";
        button.onclick = function() {
          modal.style.display = "block";
        }

        wrapper.appendChild(button);
        wrapper.appendChild(modal);
        shadow.appendChild(wrapper);
      }
}

customElements.define('pomo-finish', PomoFinish);