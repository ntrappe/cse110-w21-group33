import { setStartButton, setResetButton, display, set } from './pomo-timer-helpers.js';

const START = 'Start';
const RESET = 'Reset';
const NUM_MIN = 2;
const SEC_SPEED = 250;

class PomoTimer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        let wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
        
        let mode = document.createElement('div');
        mode.setAttribute('class', 'mode');
        let pomo = document.createElement('p');
        pomo.textContent = "POMODORO";
        pomo.setAttribute('class', 'pomo');
        mode.appendChild(pomo);
        let short = document.createElement('p');
        short.textContent = "SHORT BREAK";
        mode.appendChild(short);
        let long = document.createElement('p');
        long.textContent = "LONG BREAK";
        mode.appendChild(long);

        let timerText = document.createElement('h1');
        timerText.setAttribute('class', 'time');
        timerText.textContent = "02:00";
        
        let timerButton = document.createElement('button');
        timerButton.textContent = START;

        style.textContent = `
            :root {
                --darkest-blue: #0E1116;
                --timer-background: #161B22;
                --timer-text: #8B949E;
                --button-background: #22262C;
                --border: #30363D;
            }
            
            .wrapper {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }

            .mode {
                display: flex;
                flex-direction: row;
                width: 400px;
                justify-content: space-between;
                color: #8D949D;
                font-family: 'Work Sans', sans-serif;
                font-weight: 600;
                font-size: 18px;
                margin-botom: -1px;
                border-bottom: 1px solid;
                border-color: #31363C;
            }

            .pomo {
                margin-bottom: -2px;
                border-bottom: 3px solid;
                border-color: #459648;      /* green */
            }

            .time {
                font-size: 110px;
                font-weight: 800;
                background-color: #171B21;
                color: #A2AAB5;
                border: 1px solid;
                padding: 10px 50px;
                border-radius: 6px;
                border-color: #31363C;
            }

            button {
                color: #8D949D;
                background-color: #22262C;
                font-weight: 600;
                font-size: 15px;
                border: 1px solid;
                padding: 5px 20px;
                border-radius: 6px;
                border-color: #31363C;
                width: 80px;
            }
        `;

        let totalSeconds = 0;
        let ticker;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(mode);
        wrapper.appendChild(timerText);
        wrapper.appendChild(timerButton);

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

/* Helpful Resources:
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 */