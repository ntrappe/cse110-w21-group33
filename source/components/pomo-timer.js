import { setStartButton, setResetButton, display, set, initProgess, setProgressHelper } from './pomo-timer-helpers.js';

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

        /* label for mode e.g. 'Work' / 'Short Break' */
        let currentMode = document.createElement('p');
        currentMode.setAttribute('class', 'mode');
        currentMode.textContent = "WORK";

        /* progress squares */
        let progressContainerItems = initProgess();
        let progressContainer = progressContainerItems[0];
        function setProgress(progress) {
            setProgressHelper(progress, progressContainerItems[1], progressContainerItems[2],
                progressContainerItems[3], progressContainerItems[4]);
        }
        /* @NOTE: uncomment to call setProgress function to update squares */
        setProgress(4);

        let timerText = document.createElement('h1');
        timerText.setAttribute('class', 'time');
        timerText.setAttribute('id', 'timer-text');
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

            .progress-container {
                /*display: flex;*/
                /*flex-direction: col;*/
                /*justify-content: space-between;*/
                /* old version of side-by-side */
                /*border-bottom: 1px solid;*/
               /* border-color: #31363C;*/
                /*text-align: right;*/
            }

            .progress-top-section {
                /*margin-bottom: -23px;*/
                align-items: right;
                color: #80858E;
                font-size: 10px;
                font-weight: 700;
            }

            .progress-bottom-section {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .square-off {
                color: #171B21;
                background-color: #171B21;
                border: 1px solid;
                padding: 7px;
                border-radius: 3px;
                border-color: #171B21;
            }

            .square-on {
                color: #429046;
                background-color: #429046;
                border: 1px solid;
                padding: 7px;
                border-radius: 3px;
                border-color: #55A758;
            }

            #square4[class="square-on"] {
                color: #67C75C;
                background-color: #67C75C;
                border: 1px solid;
                padding: 7px;
                border-radius: 3px;
                border-color: #8CE96B;
            }

            .mode {
                color: #F1F6FB;
                background-color: #63A259;
                font-family: 'Work Sans', sans-serif;
                font-weight: 600;
                font-size: 18px;
                margin-botom: -1px; 
                padding: 5px 25px;
                border-radius: 6px;
                border: 1.5px solid;
                border-color: #67D25A;
            }

            .space {
                background-color: #0E1116;
                padding: 6px;
            }

            .time {
                font-size: 110px;
                font-weight: 800;
                background-color: #171B21;
                color: #A2AAB5;
                border: 1.5px solid;
                padding: 10px 50px;
                border-radius: 6px;
                border-color: #31363C;
            }

            button {
                color: #8D949D;
                background-color: #22262C;
                font-weight: 600;
                font-size: 15px;
                border: 1.5px solid;
                padding: 5px 20px;
                border-radius: 6px;
                border-color: #31363C;
                width: 80px;
                cursor: pointer;
            }
            
            button:hover {
                color: #CBD1D8;
                background-color: #31363C;
                border-color: #8D949D;
                transition-duration: .1s;
            }
        `;

        let totalSeconds = 0;
        let ticker;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(currentMode);
        wrapper.appendChild(progressContainer);
        wrapper.appendChild(timerText);
        wrapper.appendChild(timerButton);

        /* Events */
        const timerStartEvent = new CustomEvent('timerStart', {
            bubbles: true,          // event listenable outside of container
            composed: true
        });

        const timerResetEvent = new CustomEvent('timerReset', {
            bubbles: true,      
            composed: true
        });

        const timerFinishEvent = new CustomEvent('timerFinish', {
            bubbles: true,      
            composed: true
        });

        timerButton.addEventListener('click', () => {
            if (timerButton.textContent === START) {
                shadow.dispatchEvent(timerStartEvent);
            } else {
                shadow.dispatchEvent(timerResetEvent);
            }
        });

        
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
            shadow.dispatchEvent(timerFinishEvent);
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