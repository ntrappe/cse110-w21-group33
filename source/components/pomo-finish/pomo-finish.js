class PomoFinish extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // the component wrapper
    const wrapper = document.createElement('div');
    const statsStyle = document.createElement('link');
    statsStyle.setAttribute('id', 'statistics-styles');
    statsStyle.setAttribute('rel', 'stylesheet');
    statsStyle.setAttribute('href', './components/pomo-finish/pomo-finish.css');
    shadow.append(statsStyle);

    // button to finish session and display statistics
    const finishButton = document.createElement('button');
    finishButton.setAttribute('id', 'finish-button');

    const finishIcon = document.createElement('img');
    finishIcon.setAttribute('id', 'finish-button-icon');
    finishIcon.setAttribute('src', './assets/bar_chart_stats.png');
    finishIcon.textContent = 'Statistics';

    finishButton.appendChild(finishIcon);

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

    // the main content to be display in the lightbox
    // title
    const modalTitle = document.createElement('h3');
    modalTitle.setAttribute('class', 'modal-title');
    modalTitle.setAttribute('id', 'statistics-modal-title');
    modalTitle.innerHTML = 'SESSION SUMMARY';
    // list of stat
    const sessionStatistics = document.createElement('ul');
    sessionStatistics.setAttribute('id', 'statistics-panel');

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

    // append elements to containers
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(sessionStatistics);
    modal.appendChild(modalContent);
    wrapper.appendChild(modal);
    wrapper.append(finishButton);

    shadow.appendChild(wrapper);

    // custom event for modal display
    this.event = new CustomEvent('modalRequest', {
      bubbles: true,
      composed: true,
    });

    // Enabled determines if this component can be opened
    this.enabled = true;

    /**
     * Allows the control to open the finish page
     */
    this.enableFinish = () => {
      this.enabled = true;
      finishButton.disabled = false;
    };

    /**
     * Prevent the control from open the finish page
     */
    this.disableFinish = () => {
      this.enabled = false;
      finishButton.disabled = true;
    };

    /**
     * Modify elements' data-mode to dark-mode or light-mode
     * @param {Boolean} dark  indicate whether or not the setting is in dark mode
     */

    this.setDark = (dark) => {
      if (dark) {
        statsStyle.setAttribute('href', './components/pomo-finish/pomo-finish.css');
        finishIcon.setAttribute('src', './assets/bar_chart_stats.png');
      } else {
        statsStyle.setAttribute('href', './components/pomo-finish/pomo-finish-light.css');
        finishIcon.setAttribute('src', './assets/bar_chart_stats_light.png');
      }
    };

    /**
     * Render session's statistics to the screen
     * @param {Number} workCount            the number of pomodoro sessions completed
     * @param {Number} shortBreakCount      the number of short breaks
     * @param {Number} longBreakCount       the number of long breaks
     * @param {Number} interruptedCount     the number of time reset because of interruptions
     * @return {void}
     */
    this.showModal = (workCount, shortBreakCount, longBreakCount, interruptedCount) => {
      // clear the list before appending elements
      sessionStatistics.innerHTML = '';

      // render infomation
      ['Pomodoro Completed', 'Short Breaks', 'Long Breaks', 'Interrupted Session'].forEach(
        (info) => {
          const li = document.createElement('li');
          li.setAttribute('class', 'session-statistics');
          switch (info) {
            case 'Pomodoro Completed':
              li.innerHTML = `${info}: ${workCount}`;
              break;
            case 'Short Breaks':
              li.innerHTML = `${info}: ${shortBreakCount}`;
              break;
            case 'Long Breaks':
              li.innerHTML = `${info}: ${longBreakCount}`;
              break;
            case 'Interrupted Session':
              li.innerHTML = `${info}: ${interruptedCount}`;
              break;
            default:
              li.innerHTML = 'Buggy!';
          }
          sessionStatistics.appendChild(li);
        }
      );

      // show the statistics panel
      modal.style.display = 'block';
    };

    /**
     * For transforming the whole object
     * @param {String} transformText the text to put in transform css
     */
    this.changeTransform = (transformText) => {
      finishButton.style.transform = transformText;
    };

    // Assessible determines if the keyboard shortcuts should run
    this.accessible = true;

    /**
     * For CONTROL to determine whether we can open info, setting, stats
     * @param {Boolean} enabled true for being able to open, false otherwise
     */
    this.setAccessibility = (accessible) => {
      this.accessible = accessible;
    };

    /**
     * Functions that opens and closes the finish page with the f key
     */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' && this.accessible === true) {
        if (modal.style.display === 'block') {
          closeButton.onclick();
        } else if (this.enabled === true) {
          finishButton.onclick();
        }
      }
    });
  }
}

customElements.define('pomo-finish', PomoFinish);

export default PomoFinish;
