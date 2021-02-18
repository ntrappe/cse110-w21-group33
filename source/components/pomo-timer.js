import { setStartButton, setResetButton, display, set } from './pomo-timer-helpers.js';

const START = 'Start';
const RESET = 'Reset';
const NUM_MIN = 2;
const SEC_SPEED = 250;

class PomoTimer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');
        element.textContent = "Timer";

        let timerText = document.createElement('h1');
        timerText.textContent = "02:00";
        
        let timerButton = document.createElement('button');
        timerButton.textContent = START;

        let totalSeconds = 0;
        let ticker;

        shadow.appendChild(element);
        element.appendChild(timerText);
        element.appendChild(timerButton);

        /**
         * Function calls to toggle button and control timer based on user input
         */
        timerButton.onclick = () => {
            if (timerButton.textContent === START) {
                setResetButton(timerButton);
                timerStart();
            } else {
                setStartButton(timerButton);
                timerReset();
            }
        };

        /**
        * Stops the timer from ticking and resets it based on button click
        */
        function timerReset() {
            clearInterval(ticker);
            totalSeconds = set(NUM_MIN);
            display(totalSeconds, timerText);
        }

        /**
         * Sets time on timer and starts ticking based on button click
         */
        function timerStart() {
            totalSeconds = set(NUM_MIN);
            display(totalSeconds, timerText);
            ticker = setInterval(tick, SEC_SPEED);
        }

        /**
        * Timer hits 0:00 and resets
        */
        function timerFinish() {
            clearInterval(ticker);
            totalSeconds = set(NUM_MIN);
            display(totalSeconds, timerText);
        }

        /**
        * Decrement each second. If time has run out, stop "ticking" by clearing Interval and 
        * reset the timer. Otherwise, keep decrementing seconds and updating time on screen
        */
        function tick() {
            if (totalSeconds == 0) {
                timerFinish();
                setStartButton(timerButton);
            } else {
                totalSeconds--;
                display(totalSeconds, timerText);
            }  
        }
        
    }
}

customElements.define('pomo-timer', PomoTimer);