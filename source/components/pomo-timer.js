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

        let currentMode = document.createElement('p');
        currentMode.setAttribute('class', 'mode');
        currentMode.textContent = "WORK";

        let modeContainer = document.createElement('div');
        modeContainer.setAttribute('class', 'mode-container');

        /* empty space (matches background) */
        let space1 = document.createElement('p');
        space1.setAttribute('class', 'space');
        let space2 = document.createElement('p');
        space2.setAttribute('class', 'space');
        let space3 = document.createElement('p');
        space3.setAttribute('class', 'space');

        let square1 = document.createElement('p');
        square1.setAttribute('class', 'square-on');
        let square2 = document.createElement('p');
        square2.setAttribute('class', 'square');
        let square3 = document.createElement('p');
        square3.setAttribute('class', 'square');
        let square4 = document.createElement('p');
        square4.setAttribute('class', 'square');

        /* text for current and next */
        let modeTopSection = document.createElement('div');
        modeTopSection.setAttribute('class', 'mode-top-section');
        modeContainer.appendChild(modeTopSection);
        
        /* break tracker via squares */  
        let modeBottomSection = document.createElement('div');
        modeBottomSection.setAttribute('class', 'mode-bottom-section');
        modeBottomSection.appendChild(square1);
        modeBottomSection.appendChild(space1);
        modeBottomSection.appendChild(square2);
        modeBottomSection.appendChild(space2);
        modeBottomSection.appendChild(square3);
        modeBottomSection.appendChild(space3);
        modeBottomSection.appendChild(square4);
        modeContainer.appendChild(modeBottomSection);

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

            .mode-container {
                /*display: flex;*/
                /*flex-direction: col;*/
                /*justify-content: space-between;*/
                /* old version of side-by-side */
                /*border-bottom: 1px solid;*/
               /* border-color: #31363C;*/
                /*text-align: right;*/
            }

            .mode-top-section {
                /*margin-bottom: -23px;*/
                align-items: right;
                color: #80858E;
                font-size: 10px;
                font-weight: 700;
            }

            .mode-bottom-section {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .square {
                color: #171B21;
                background-color: #171B21;
                border: 1px solid;
                padding: 7px;
                border-radius: 3px;
                border-color: #171B21;
            }

            .square-on {
                color: #459648;
                background-color: #459648;
                border: 1px solid;
                padding: 7px;
                border-radius: 3px;
                border-color: #55A758;
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
                padding: 5px;
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
        wrapper.appendChild(modeContainer);
        wrapper.appendChild(timerText);
        wrapper.appendChild(timerButton);

        /**
         * Function calls to toggle button and control timer based on user input
         */
        timerButton.onclick = () => {
            if (timerButton.textContent === START) {
                setResetButton(timerButton);
                timerStart();

                timerText.style.color = "#E8ECF2";
                timerText.style.borderColor = "#D2D6DD";
                setTimeout(function(e) {
                    /* change button back to default */
                    timerText.style.color = "#A2AAB5";
                    timerText.style.borderColor = "#31363C";
                }, 250);
                

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