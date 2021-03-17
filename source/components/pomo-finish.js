class PomoFinish extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // the component wrapper
    const wrapper = document.createElement('div');
    const statsStyle = document.createElement('link');
    statsStyle.setAttribute('id', 'statistics-styles');
    statsStyle.setAttribute('rel', 'stylesheet');
    statsStyle.setAttribute('href', './components/pomo-finish.css');
    shadow.append(statsStyle);

    // custom event for modal display
    this.event = new CustomEvent('modalRequest', {
      bubbles: true,
      composed: true,
    });

    // button to finish session and display statistics
    const finishButton = document.createElement('button');
    finishButton.setAttribute('id', 'finish-button');
    finishButton.textContent = 'Statistics';
    finishButton.onclick = () => {
      shadow.dispatchEvent(this.event);
    };

    // the lightbox
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'statistics-modal');
    modal.onclick = (event) => {
      // close lightbox when click outside of the content area
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // wrapper for the content inside the lightbox
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    modalContent.setAttribute('id', 'statistics-modal-content');

    // button to close the lightbox
    const closeButton = document.createElement('div');
    closeButton.setAttribute('id', 'statistics-close-button');
    closeButton.setAttribute('class', 'button-off');
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => {
      modal.style.display = 'none';
    };

    /* mimic a button hover event */
    closeButton.addEventListener('mouseover', () => {
      closeButton.setAttribute('class', 'button-on');
    });

    closeButton.addEventListener('mouseout', () => {
      closeButton.setAttribute('class', 'button-off');
    });

    modalContent.appendChild(closeButton);

    // the main content to be display in the lightbox

    const modalTitle = document.createElement('h3');
    modalTitle.setAttribute('class', 'modal-title');
    modalTitle.setAttribute('id', 'statistics-modal-title');
    modalTitle.textContent = 'Session Statistics';
    modalContent.appendChild(modalTitle);

    const statsContent = document.createElement('div');
    statsContent.setAttribute('class', 'stats-content');

    const workContainer = document.createElement('div');
    workContainer.setAttribute('class', 'stats-entry');
    const workSquares = document.createElement('div');
    workContainer.appendChild(workSquares);
    const workTitle = document.createElement('h4');
    workTitle.setAttribute('class', 'stats-subtitle');
    workTitle.textContent = 'Work';
    workContainer.appendChild(workTitle);
    statsContent.appendChild(workContainer);

    const shortContainer = document.createElement('div');
    shortContainer.setAttribute('class', 'stats-entry');
    const shortSquares = document.createElement('div');
    shortContainer.appendChild(shortSquares);
    const shortTitle = document.createElement('h4');
    shortTitle.setAttribute('class', 'stats-subtitle');
    shortTitle.textContent = 'Short Breaks';
    shortContainer.appendChild(shortTitle);
    statsContent.appendChild(shortContainer);

    const longContainer = document.createElement('div');
    longContainer.setAttribute('class', 'stats-entry');
    const longSquares = document.createElement('div');
    longContainer.appendChild(longSquares);
    const longTitle = document.createElement('h4');
    longTitle.setAttribute('class', 'stats-subtitle');
    longTitle.textContent = 'Long Breaks';
    longContainer.appendChild(longTitle);
    statsContent.appendChild(longContainer);

    const interruptContainer = document.createElement('div');
    interruptContainer.setAttribute('class', 'stats-entry');
    const interruptSquares = document.createElement('div');
    interruptContainer.appendChild(interruptSquares);
    const interruptTitle = document.createElement('h4');
    interruptTitle.setAttribute('class', 'stats-subtitle');
    interruptTitle.textContent = 'Interruptions';
    interruptContainer.appendChild(interruptTitle);
    statsContent.appendChild(interruptContainer);

    modalContent.appendChild(statsContent);
    modal.appendChild(modalContent);
    wrapper.appendChild(modal);
    wrapper.append(finishButton);

    shadow.appendChild(wrapper);

    /**
     * Allows the control to open the finish page
     */
    this.enableFinish = () => {
      finishButton.disabled = false;
    };

    /**
     * Prevent the control from open the finish page
     */
    this.disableFinish = () => {
      finishButton.disabled = true;
    };

    /**
     * Modify elements' data-mode to dark-mode or light-mode
     * @param {Boolean} dark  indicate whether or not the setting is in dark mode
     */

    this.setDark = (dark) => {
      if (dark) {
        statsStyle.setAttribute('href', './components/pomo-finish.css');
      } else {
        statsStyle.setAttribute('href', './components/pomo-finish-light.css');
      }
    };

    function generateGrid(container, count, type) {
      // clear old content
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      for (let row = 3; row >= 0; row -= 1) {
        const rowContainer = document.createElement('div');
        rowContainer.setAttribute('class', 'stats-row');

        for (let col = 0; col < 3; col += 1) {
          if (row * 3 + col + 1 <= count) {
            const fillSquare = document.createElement('div');
            fillSquare.setAttribute('class', `square ${type}`);
            rowContainer.appendChild(fillSquare);
          } else {
            const emptySquare = document.createElement('div');
            emptySquare.setAttribute('class', 'square');
            rowContainer.appendChild(emptySquare);
          }
        }

        container.appendChild(rowContainer);
      }

      if (count > 12) {
        const fancySquare = document.createElement('div');
        fancySquare.setAttribute('class', 'fancy work');
        container.appendChild(fancySquare);
      }
    }

    /**
     * Render session's statistics to the screen
     * @param {Number} workCount            the number of pomodoro sessions completed
     * @param {Number} shortBreakCount      the number of short breaks
     * @param {Number} longBreakCount       the number of long breaks
     * @param {Number} interruptedCount     the number of time reset because of interruptions
     * @return {void}
     */
    this.showModal = (workCount, shortBreakCount, longBreakCount, interruptedCount) => {
      generateGrid(workSquares, workCount, 'work');
      generateGrid(shortSquares, shortBreakCount, 'short');
      generateGrid(longSquares, longBreakCount, 'long');
      generateGrid(interruptSquares, interruptedCount, 'interrupt');

      // show the statistics panel
      modal.style.display = 'block';
    };
  }
}

customElements.define('pomo-finish', PomoFinish);

export default PomoFinish;
