import { setStartButton, setResetButton, display, set, initProgess, setProgressHelper } from './pomo-timer-helpers.js';

const START = 'Start';
const RESET = 'Reset';
const NUM_MIN = 2;
const SEC_SPEED = 250;

class PomoTimer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        const link = document.createElement('link');
        link.setAttribute('id', 'timer-styles');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './components/pomo-timer.css');

        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        // label for mode e.g. 'Work'
        let currentMode = document.createElement('p');          
        currentMode.setAttribute('class', 'mode'); 

        // squares to represent progress
        let progressContainerItems = initProgess(); 
        const progressContainer = progressContainerItems[0];

        // timer countdown display
        let timerText = document.createElement('h1')            
        timerText.setAttribute('class', 'time');
        timerText.setAttribute('id', 'timer-text');

        // timer button
        let timerButton = document.createElement('button');     
        
        /* Initialize all elements */
        currentMode.textContent = "WORK";
        timerText.textContent = "02:00";
        timerButton.textContent = START;

        let ticker;                                             // timer object
        this.totalSeconds = 0;                                  // total seconds in timer
        let modeDuration = 0;                                   // time to put on clock

        style.textContent = `
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
        `;

        shadow.appendChild(style);
        shadow.appendChild(link);
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

        const tickEvent = new CustomEvent('tick', {
            bubbles: true,      
            composed: true,
            detail: {timeRemaining: () => this.totalSeconds}
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
            //this.totalSeconds = set(NUM_MIN);
            this.totalSeconds = set(modeDuration);
            display(this.totalSeconds, timerText);
        }

        /**
         * Sets time on timer and starts ticking based on button click
         */
        this.timerStart = () => {
            shadow.dispatchEvent(timerStartEvent);
            //this.totalSeconds = set(NUM_MIN);
            this.totalSeconds = set(modeDuration);
            display(this.totalSeconds, timerText);
            ticker = setInterval(this.timerTick, SEC_SPEED);
        }

        /**
        * Timer hits 0:00 and resets
        */
        this.timerFinish = () => {
            shadow.dispatchEvent(timerFinishEvent);
            clearInterval(ticker);
            this.totalSeconds = set(NUM_MIN);
            //this.totalSeconds = set(modeDuration);
            display(this.totalSeconds, timerText);
        }

        /**
        * Decrement each second. If time has run out, stop "ticking" by clearing Interval and 
        * reset the timer. Otherwise, keep decrementing seconds and updating time on screen
        */
       this.timerTick = () => {
           shadow.dispatchEvent(tickEvent);
            if (this.totalSeconds == 0) {
                this.timerFinish();
                setStartButton(timerButton);
            } else {
                this.totalSeconds = this.totalSeconds - 1;
                display(this.totalSeconds, timerText);
            }  
        }

        /**
         * Function for control to call to set time on clock
         * @param {Number} min number of minutes to set the clock to
         */
        function setTimer(min) {
            modeDuration = min;
        }
        /* @NOTE: uncomment to call setTimer function to set time on clock */
        //setTimer(6);

        /**
         * Updates squares on screen to match number of breaks taken
         * @param {Number} progress number of breaks taken
         */
        function setProgress(progress) {
            setProgressHelper(progress, progressContainerItems[1], progressContainerItems[2],
                progressContainerItems[3], progressContainerItems[4]);
        }
        /* @NOTE: uncomment to call setProgress function to update squares */
        //setProgress(0);
        
    }
}

customElements.define('pomo-timer', PomoTimer);

/* Helpful Resources:
 * https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
 */