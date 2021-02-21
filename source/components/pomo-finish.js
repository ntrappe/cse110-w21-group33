class PomoFinish extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        const finishButton = document.createElement('button');
        const modal = document.createElement('div');
        const modalContent = document.createElement('div');
        const content = document.createElement('div');
        const closeButton = document.createElement('div');

        modal.appendChild(modalContent);
        modalContent.appendChild(content);
        modalContent.appendChild(closeButton);
        wrapper.appendChild(finishButton);
        wrapper.appendChild(modal);

        content.textContent = "TODO";
        closeButton.innerHTML = "&times;";
        finishButton.textContent = "Finish";

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

        closeButton.style.cssText = `
          background-color: red;
          color: black;
          float: right;
          font-size: 50px;
          display: block;`;

        modal.onclick = function(event) {
          if (event.target != modalContent) {
            modal.style.display = "none";
          }
        }
        
        closeButton.onclick = function() {
          modal.style.display = "none";
        }
        
        finishButton.onclick = function() {
          modal.style.display = "block";
        }
        
        shadow.appendChild(wrapper);
      }
}

customElements.define('pomo-finish', PomoFinish);