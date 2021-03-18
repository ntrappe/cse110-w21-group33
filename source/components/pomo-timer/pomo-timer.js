/**
 * @module PomoTimer
 */

import {
  setStartButton,
  setResetButton,
  display,
  setTime,
  initProgess,
  setProgressHelper,
} from './pomo-timer-helpers.js';

const START = 'Start';
const RESET = 'Reset';
const SEC_SPEED = 250;
class PomoTimer extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const timerStyle = document.createElement('link');
    timerStyle.setAttribute('id', 'timer-style-dark');
    timerStyle.setAttribute('rel', 'stylesheet');
    timerStyle.setAttribute('href', './components/pomo-timer/pomo-timer.css');
    shadow.append(timerStyle);

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

    // timer button
    const timerButton = document.createElement('button');
    timerButton.setAttribute('id', 'timer-button');

    /* Initialize elements */
    timerButton.textContent = START;

    let ticker; // timer object
    this.totalSeconds = 0; // total seconds in timer
    let modeDuration = 0; // time to put on clock
    this.calmTimerText = false; // display w or w/o sec
    this.accessible = true;

    shadow.appendChild(wrapper);
    wrapper.appendChild(currentMode);
    wrapper.appendChild(progressContainer);
    wrapper.appendChild(timerText);
    wrapper.appendChild(timerButton);

    // Enabled determines if this component can be opened
    this.enabled = true;

    /**
     * Used for allowing keyboard shortcuts
     */
    this.enableTimer = () => {
      this.enabled = true;
    };

    /**
     * Used for preventing keyboard shortcuts
     */
    this.disableTimer = () => {
      this.enabled = false;
    };

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
      switch (mode) {
        case 'short break':
          currentMode.setAttribute('class', 'short-break');
          break;
        case 'long break':
          currentMode.setAttribute('class', 'long-break');
          break;
        default:
          currentMode.setAttribute('class', mode);
          break;
      }
      currentMode.textContent = mode.toUpperCase();
      timerText.setAttribute('class', mode);
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
     * @param {Boolean} calm true for min; false for min and sec
     */
    this.setCalm = (calm) => {
      this.calmTimerText = calm;
      display(this.totalSeconds, timerText, this.calmTimerText);
    };

    /**
     * For CONTROL to determine whether to use default dark styling
     * or use light to override some colors of dark
     * @param {Boolean} dark true for dark css; false for light css
     */
    this.setDark = (dark) => {
      if (dark) {
        timerStyle.setAttribute('href', './components/pomo-timer/pomo-timer.css');
      } else {
        timerStyle.setAttribute('href', './components/pomo-timer/pomo-timer-light.css');
      }
    };

    /**
     * For transforming the whole object
     * @param {String} transformText the text to put in transform css
     */
    this.changeTransform = (transformText) => {
      wrapper.style.transform = transformText;
    };

    /**
     * For CONTROL to determine whether we can open info, setting, stats
     * @param {Boolean} enabled true for being able to open, false otherwise
     */
    this.setAccessibility = (enabled) => {
      this.accessible = enabled;
    };

    /**
     * Functions that calls timerButton.onclick() if s or r key is pressed
     */
    document.addEventListener('keydown', (e) => {
      // Checking if the key clicked is a s
      if (e.key === 's' && this.accessible === true && this.enabled === true) {
        if (timerButton.innerHTML === START) {
          timerButton.onclick(); // Forces a onclick button for timerButton
        }
        // Key clicked is a e
      } else if (e.key === 'r' && this.accessible === true && this.enabled === true) {
        if (timerButton.innerHTML === RESET) {
          timerButton.onclick(); // Forces a onclick button for timerButton
        }
      }
    });
  }
}

customElements.define('pomo-timer', PomoTimer);

export default PomoTimer;
