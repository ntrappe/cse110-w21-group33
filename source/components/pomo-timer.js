const START = 'Start';
const RESET = 'Reset';

class PomoTimer extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    // label for mode e.g. 'Work'
    const currentMode = document.createElement('p');
    currentMode.setAttribute('id', 'mode');
    currentMode.textContent = 'WORK';

    // timer countdown display
    const timerText = document.createElement('h1');
    timerText.setAttribute('class', 'time');
    timerText.setAttribute('id', 'timer-text');
    timerText.textContent = 'TIME';

    // timer button
    const timerButton = document.createElement('button');
    timerButton.setAttribute('id', 'button');
    timerButton.setAttribute('class', 'start');
    timerButton.textContent = START;

    shadow.appendChild(wrapper);
    wrapper.appendChild(currentMode);
    wrapper.appendChild(timerText);
    wrapper.appendChild(timerButton);

    /**
     * Changes button to represent Start
     */
    function setStartButton() {
      timerButton.innerHTML = START;
      timerButton.setAttribute('class', 'start');
    }

    /**
     * Changes button to represent Reset
     */
    function setResetButton() {
      timerButton.innerHTML = RESET;
      timerButton.setAttribute('class', 'reset');
    }

    /**
     * Function calls to toggle button and control timer based on user input
     */
    timerButton.onclick = () => {
      if (timerButton.textContent === START) {
        setResetButton();
      } else {
        setStartButton();
      }
    };
  }
}

customElements.define('pomo-timer', PomoTimer);

export default PomoTimer;
