/**
 * @module PomoInfo
 */

class PomoInfo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // event listener for opening info page
    this.openEvent = new CustomEvent('openEvent', {
      bubbles: true,
      composed: true,
    });

    // event listener for closing info page
    this.closeEvent = new CustomEvent('closeEvent', {
      bubbles: true,
      composed: true,
    });

    // value of accessibility
    this.accessible = true;

    // wrapper for element
    const wrapper = document.createElement('div');

    // style element for the component
    const infoStyle = document.createElement('link');
    infoStyle.setAttribute('id', 'info-styles');
    infoStyle.setAttribute('rel', 'stylesheet');
    infoStyle.setAttribute('href', './components/pomo-info/pomo-info.css');
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
        shadow.dispatchEvent(this.closeEvent);
      }
    };

    // info button
    const infoButton = document.createElement('button');
    infoButton.setAttribute('id', 'info-button');

    const infoIcon = document.createElement('img');
    infoIcon.setAttribute('id', 'info-button-icon');
    infoIcon.setAttribute('src', './assets/i_info.png');
    infoIcon.textContent = 'Info';

    infoButton.appendChild(infoIcon);

    infoButton.onclick = () => {
      modal.style.display = 'block';
      shadow.dispatchEvent(this.openEvent);
    };

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
      shadow.dispatchEvent(this.closeEvent);
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

    // Enabled determines if this component can be opened
    this.enabled = true;

    /**
     * @method
     * Allows the control to open the info page
     */
    this.enableInfo = () => {
      this.enabled = true;
      infoButton.disabled = false;
    };

    /**
     * @method
     * Prevent the control from open the info page
     */
    this.disableInfo = () => {
      this.enabled = false;
      infoButton.disabled = true;
    };

    /**
     * @method
     * Modify elements' data-mode to dark-mode or light-mode
     * @param {Boolean} dark  indicate whether or not the setting is in dark mode
     */
    this.setDark = (dark) => {
      if (dark) {
        infoStyle.setAttribute('href', './components/pomo-info/pomo-info.css');
        infoIcon.setAttribute('src', './assets/i_info.png');
      } else {
        infoStyle.setAttribute('href', './components/pomo-info/pomo-info-light.css');
        infoIcon.setAttribute('src', './assets/i_info_light.png');
      }
    };

    /**
     * @method
     * For transforming the whole object
     * @param {String} transformText the text to put in transform css
     */
    this.changeTransform = (transformText) => {
      infoButton.style.transform = transformText;
    };

    /**
     * @method
     * For CONTROL to determine whether we can open info, setting, stats
     * @param {Boolean} enabled true for being able to open, false otherwise
     */
    this.setAccessibility = (enabled) => {
      this.accessible = enabled;
    };

    /**
     * Functions that opens and closes the info page with the i key
     */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'i' && this.accessible === true) {
        if (modal.style.display === 'block') {
          closeButton.onclick();
        } else if (this.enabled === true) {
          infoButton.onclick();
        }
      }
    });
  }
}

customElements.define('pomo-info', PomoInfo);

export default PomoInfo;
