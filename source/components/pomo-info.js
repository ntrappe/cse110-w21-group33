class PomoInfo extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        // wrapper for element
        const wrapper = document.createElement('div');

        // style element for the component
        const link = document.createElement('link');
        link.setAttribute('id', 'timer-styles');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/pomo-finish.css');

        // info button
        this.infoButton = document.createElement('button');
        this.infoButton.setAttribute('id', 'infoButton');
        this.infoButton.onclick = () => {
          modal.style.display = 'block';
        }
        this.infoButton.innerHTML = 'Info';

        // the modal window
        const modal = document.createElement('div');
        modal.setAttribute('id', 'modal');
        modal.onclick = (event) => {
          // close lightbox when click outside of the content area
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }

        // the lightbox
        const modalContent = document.createElement('div');
        modalContent.setAttribute('id', 'modalContent');

        // the main info Content
        const infoContent = document.createElement('div');
        infoContent.setAttribute('id', 'infoContent');
        const title = document.createElement('h3')
        const content = document.createElement('div');
        title.innerHTML = "HOW IT WORKS";
        content.innerHTML = `The Pomodoro Technique is a time 
        management method developed by Francesco Cirillo in the 
        late 1980s. The technique uses a timer to break down work
        into intervals, traditionally 25 minutes in length, 
        separated by short breaks, traditionally 5 minutes. After 
        4 working intervals, the break is 15 minutes`;

        // button to close the modal window
        const closeButton = document.createElement('div');
        closeButton.setAttribute('id', 'closeButton');
        closeButton.setAttribute('class', 'button-off');
        closeButton.onclick = () => {
          modal.style.display = 'none';
        }
        closeButton.innerHTML = "&times;";
        
        /* mimic a button hover event */
        closeButton.addEventListener('mouseover', () => {
          closeButton.setAttribute('class', 'button-on');
        });

        closeButton.addEventListener('mouseout', () => {
          closeButton.setAttribute('class', 'button-off');
        });
        
        // add element to containers
        infoContent.appendChild(title);
        infoContent.appendChild(content);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(infoContent);
        modal.appendChild(modalContent);
        wrapper.appendChild(modal);
        wrapper.appendChild(this.infoButton);

        shadow.appendChild(wrapper);
        shadow.appendChild(link)
      }

      /**
       * Allows the control to open the info page
       */
      enableInfo() {
        this.infoButton.disabled = false;
      }

      /**
       * Prevent the control from open the info page
       */
      disableInfo() {
        this.infoButton.disabled = true;
      }
}

customElements.define('pomo-info', PomoInfo);

export { PomoInfo };