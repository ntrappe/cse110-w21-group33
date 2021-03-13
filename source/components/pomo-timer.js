import {
  setStartButton,
  setResetButton,
  display,
  setTime,
  initProgess,
  setProgressHelper,
} from './pomo-timer-helpers.js';

const START = 'Start';
const SEC_SPEED = 250;
class PomoTimer extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');

    const link = document.createElement('link');
    link.setAttribute('id', 'timer-style-dark');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './components/pomo-timer.css');

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    // label for mode e.g. 'Work'
    const currentMode = document.createElement('p');
    currentMode.setAttribute('id', 'timer-mode');

    // squares to represent progress
    const progressContainerItems = initProgess();
    const progressContainer = progressContainerItems[0];
    progressContainer.setAttribute('id', 'timer-progress-container');

    // timer countdown display
    const timerText = document.createElement('h1');
    timerText.setAttribute('id', 'timer-text');
    timerText.setAttribute('class', 'time');

    // timer button
    const timerButton = document.createElement('button');
    timerButton.setAttribute('id', 'timer-button');
    timerButton.setAttribute('class', 'start');

    /* Initialize elements */
    timerButton.textContent = START;

    let ticker; // timer object
    this.totalSeconds = 0; // total seconds in timer
    let modeDuration = 0; // time to put on clock
    this.calmTimerText = false; // display w or w/o sec

    shadow.appendChild(wrapper);
    shadow.appendChild(link);
    shadow.appendChild(style);
    wrapper.appendChild(currentMode);
    wrapper.appendChild(progressContainer);
    wrapper.appendChild(timerText);
    wrapper.appendChild(timerButton);

    /* Events */
    const timerStartEvent = new CustomEvent('timerStart', {
      bubbles: true, // event listenable outside of container
      composed: true,
    });

    const timerResetEvent = new CustomEvent('timerReset', {
      bubbles: true,
      composed: true,
    });

    const timerFinishEvent = new CustomEvent('timerFinish', {
      bubbles: true,
      composed: true,
    });

    const tickEvent = new CustomEvent('tick', {
      bubbles: true,
      composed: true,
      detail: { timeRemaining: () => this.totalSeconds },
    });

    /**
     * Function calls to toggle button and control timer based on user input
     */
    timerButton.onclick = () => {
      if (timerButton.textContent === START) {
        setResetButton(timerButton);
        this.timerStart();
      } else {
        setStartButton(timerButton);
        this.timerReset();
      }
    };

    /**
     * Stops the timer from ticking and resets it based on button click
     */
    this.timerReset = () => {
      shadow.dispatchEvent(timerResetEvent);
      clearInterval(ticker);
      this.totalSeconds = setTime(modeDuration);
      display(this.totalSeconds, timerText, this.calmTimerText);
    };

    /**
     * Sets time on timer and starts ticking based on button click
     */
    this.timerStart = () => {
      shadow.dispatchEvent(timerStartEvent);
      this.totalSeconds = setTime(modeDuration);
      display(this.totalSeconds, timerText, this.calmTimerText);
      ticker = setInterval(this.timerTick, SEC_SPEED);
    };

    /**
     * Timer hits 0:00 and resets
     */
    this.timerFinish = () => {
      shadow.dispatchEvent(timerFinishEvent);
      clearInterval(ticker);
      this.totalSeconds = setTime(modeDuration);
      display(this.totalSeconds, timerText, this.calmTimerText);
    };

    /**
     * Decrement each second. If time has run out, stop "ticking" by clearing Interval and
     * reset the timer. Otherwise, keep decrementing seconds and updating time on screen
     */
    this.timerTick = () => {
      shadow.dispatchEvent(tickEvent);
      if (this.totalSeconds === 0) {
        this.timerFinish();
        setStartButton(timerButton);
      } else {
        this.totalSeconds -= 1;
        display(this.totalSeconds, timerText, this.calmTimerText);
      }
    };

    /**
     * For CONTROL to set time on clock for current mode
     * @param {Number} min number of minutes to set the clock to
     */
    this.setTimer = (min, mode) => {
      modeDuration = min;
      this.totalSeconds = setTime(min);
      display(this.totalSeconds, timerText, this.calmTimerText);
      currentMode.setAttribute('class', mode);
      currentMode.textContent = mode.toUpperCase();
    };

    /**
     * For CONTROL to update squares on screen to match number of breaks taken
     * @param {Number} progress - number of breaks taken
     */
    this.setProgress = (progress) => {
      setProgressHelper(
        progress,
        progressContainerItems[1],
        progressContainerItems[2],
        progressContainerItems[3],
        progressContainerItems[4]
      );
    };

    /**
     * For CONTROL to determine if timer text display will show normal
     * minutes & seconds or just minutes
     * @param {Boolean} calm - true for min; false for min and sec
     */
    this.setCalm = (calm) => {
      this.calmTimerText = calm;
      display(this.totalSeconds, timerText, this.calmTimerText);
    };

    this.setDark = (dark) => {
      if (dark) {
        shadow.removeChild(shadow.getElementById('timer-style-light'));
      } else {
        const lightStyle = document.createElement('link');
        lightStyle.setAttribute('id', 'timer-style-light');
        lightStyle.setAttribute('rel', 'stylesheet');
        lightStyle.setAttribute('href', './components/pomo-timer-light.css');
        shadow.append(lightStyle);
      }
    };

    style.textContent = `
      .progress-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    `;
  }
}

customElements.define('pomo-timer', PomoTimer);

export default PomoTimer;
