class PomoInfo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // wrapper for element
    const wrapper = document.createElement('div');

    // style element for the component
    const infoStyle = document.createElement('link');
    infoStyle.setAttribute('id', 'info-styles');
    infoStyle.setAttribute('rel', 'stylesheet');
    infoStyle.setAttribute('href', './components/pomo-info.css');
    shadow.append(infoStyle);

    // the modal window
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'info-modal');
    modal.style.display = 'none';
    modal.onclick = (event) => {
      // close lightbox when click outside of the content area
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // info button
    const infoButton = document.createElement('button');
    infoButton.setAttribute('id', 'info-button');
    infoButton.onclick = () => {
      modal.style.display = 'block';
    };
    infoButton.innerHTML = 'Info';

    // the lightbox
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    modalContent.setAttribute('id', 'info-modal-content');

    // the main info Content
    const infoContent = document.createElement('div');
    infoContent.setAttribute('id', 'info-content');
    const title = document.createElement('h3');
    const content = document.createElement('div');
    title.innerHTML = 'HOW IT WORKS';
    content.innerHTML = `The Pomodoro Technique is a time 
    management method developed by Francesco Cirillo in the 
    late 1980s. The technique uses a timer to break down work
    into intervals, traditionally 25 minutes in length, 
    separated by short breaks, traditionally 5 minutes. After 
    4 working intervals, the break is 15 minutes`;

    // button to close the modal window
    const closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'close-button');
    closeButton.setAttribute('id', 'info-close-button');
    closeButton.setAttribute('class', 'button-off');
    closeButton.onclick = () => {
      modal.style.display = 'none';
    };
    closeButton.innerHTML = '&times;';

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
    wrapper.appendChild(infoButton);

    shadow.appendChild(wrapper);

    /**
     * Allows the control to open the info page
     */
    this.enableInfo = () => {
      infoButton.disabled = false;
    };

    /**
     * Prevent the control from open the info page
     */
    this.disableInfo = () => {
      infoButton.disabled = true;
    };

    /**
     * Modify elements' data-mode to dark-mode or light-mode
     * @param {Boolean} dark  indicate whether or not the setting is in dark mode
     */
    this.setDark = (dark) => {
      if (dark) {
        infoStyle.setAttribute('href', './components/pomo-info.css');
      } else {
        infoStyle.setAttribute('href', './components/pomo-info-light.css');
      }
    };

    /**
     * For transforming the whole object
     * @param {String} transformText the text to put in transform css
     */
    this.changeTransform = (transformText) => {
      infoButton.style.transform = transformText;
    };
  }
}

customElements.define('pomo-info', PomoInfo);

export default PomoInfo;
