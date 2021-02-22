class PomoFinish extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        // the window wrapper
        const wrapper = document.createElement('div');

        const finishButton = document.createElement('button');
        finishButton.setAttribute('id', 'finishButton');
        finishButton.textContent = "Finish";
        finishButton.onclick = function() {
          // get the session summary

          // reset localStorage and the timer

          // display the statistics
          modal.style.display = "block";
        }

        // the lightbox
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal');
        modal.onclick = function(event) {
          // close lightbox when click outside of the content area
          if (event.target != modalContent && event.target != content) {
            modal.style.display = "none";
          }
        }

        // wrapper for the content inside the lightbox
        const modalContent = document.createElement('div');
        modalContent.setAttribute('id', 'modalContent');

        // the main content to be display in the lightbox
        const content = document.createElement('div');
        content.setAttribute('id', 'content')
        content.innerHTML = "TODO";

        // button to close the lightbox
        const closeButton = document.createElement('div');
        closeButton.setAttribute('id', 'closeButton');
        closeButton.innerHTML = "&times;";
        closeButton.onclick = function() {
          modal.style.display = "none";
        }

        // append elements to containers
        modalContent.appendChild(closeButton);
        modalContent.appendChild(content);
        modal.appendChild(modalContent);
        wrapper.appendChild(modal);
        wrapper.append(finishButton);

        // element containing the styling
        let style = document.createElement('style');
        style.textContent = `
          #modal {
            display: none;
            position: fixed;
            z-index: 1; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto;  
            background-color: rgba(0,0,0,0.5);
          }
        
          #modalContent {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 15px;
            border: 1px solid #888;
            height: 50%;
            width: 50%;
          }
        
          #closeButton {
            background-color: red;
            color: black;
            float: right;
            font-size: 30px;
            padding: 2px ;
            border: 2px solid #888;
            border-radius: 2px;
            display: block;
          }
        
          #content {
            display: block;
            background-color: yellow;
            width: 100%; 
            height: 100%;
            margin: 0px 0px 0px;
          }
        `
        

        shadow.appendChild(wrapper);
        shadow.appendChild(style);
      }
}

customElements.define('pomo-finish', PomoFinish);