import { setStartButton, setResetButton, display, set } from './pomo-timer-helpers.js';

const START = 'Start';
const SEC_SPEED = 250;
class PomoTimer extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    /*
        const link = document.createElement('link');
        link.setAttribute('id', 'timer-styles');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/pomo-timer.css');
        */

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    // label for mode e.g. 'Work'
    const currentMode = document.createElement('p');
    currentMode.setAttribute('id', 'timer-mode');

    // timer countdown display
    const timerText = document.createElement('h1');
    timerText.setAttribute('id', 'timer-text');
    timerText.setAttribute('class', 'time');

    // timer button
    const timerButton = document.createElement('button');
    timerButton.setAttribute('id', 'timer-button');
    timerButton.setAttribute('class', 'start');

    /* Initialize elements */
    /*
        currentMode.textContent = "WORK";
        timerText.textContent = "TIME"; */
    timerButton.textContent = START;

    let ticker; // timer object
    this.totalSeconds = 0; // total seconds in timer
    let modeDuration = 0; // time to put on clock

    shadow.appendChild(wrapper);
    wrapper.appendChild(currentMode);
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
      // this.totalSeconds = set(NUM_MIN);
      this.totalSeconds = set(modeDuration);
      display(this.totalSeconds, timerText);
    };

    /**
     * Sets time on timer and starts ticking based on button click
     */
    this.timerStart = () => {
      shadow.dispatchEvent(timerStartEvent);
      // this.totalSeconds = set(NUM_MIN);
      this.totalSeconds = set(modeDuration);
      display(this.totalSeconds, timerText);
      ticker = setInterval(this.timerTick, SEC_SPEED);
    };

    /**
     * Timer hits 0:00 and resets
     */
    this.timerFinish = () => {
      shadow.dispatchEvent(timerFinishEvent);
      clearInterval(ticker);
      // this.totalSeconds = set(NUM_MIN);
      this.totalSeconds = set(modeDuration);
      display(this.totalSeconds, timerText);
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
        display(this.totalSeconds, timerText);
      }
    };

    /**
     * For CONTROL to set time on clock for current mode
     * @param {Number} min number of minutes to set the clock to
     */
    this.setTimer = (min, mode) => {
      modeDuration = min;
      this.totalSeconds = set(min);
      display(this.totalSeconds, timerText);
      currentMode.setAttribute('class', mode);
      currentMode.textContent = mode.toUpperCase();
    };
  }
}

customElements.define('pomo-timer', PomoTimer);

export default PomoTimer;
