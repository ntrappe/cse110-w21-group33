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

        let modeContainer = document.createElement('div');
        modeContainer.setAttribute('class', 'mode-container');
        let modeTopSection = document.createElement('div');
        let modeBottomSection = document.createElement('div');
        modeContainer.appendChild(modeTopSection);
        modeContainer.appendChild(modeBottomSection);

        /* empty space (matches background) */
        let space = document.createElement('p');
        space.setAttribute('class', 'space');
        space.textContent = "nada";

        /* text for current and next */
        modeTopSection.setAttribute('class', 'mode-top-section');
        modeTopSection.textContent = "UP NEXT";
        let currentModeLabel = document.createElement('p');
        currentModeLabel.setAttribute('class', 'mode-label');
        let nextModeLabel = document.createElement('p');
        nextModeLabel.setAttribute('class', 'mode-label');
        //nextModeLabel.textContent = "UP NEXT";
        modeTopSection.appendChild(currentModeLabel);
        modeTopSection.appendChild(nextModeLabel);

        /* current and next modes */  
        modeBottomSection.setAttribute('class', 'mode-bottom-section');
        let currentMode = document.createElement('p');
        currentMode.setAttribute('class', 'mode');
        currentMode.textContent = "WORK";
        let nextMode = document.createElement('p');
        nextMode.setAttribute('class', 'next-mode');
        nextMode.textContent = "SHORT BREAK";
        modeBottomSection.appendChild(currentMode);
        modeBottomSection.appendChild(space);
        modeBottomSection.appendChild(nextMode);


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
                border-bottom: 1px solid;
                border-color: #31363C;
                text-align: right;
            }

            .mode-top-section {
                margin-bottom: -23px;
                align-items: right;
                color: #80858E;
                font-size: 10px;
                font-weight: 700;
            }

            .mode-bottom-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .mode {
                color: #F1F6FB;
                background-color: #FA604E;
                font-family: 'Work Sans', sans-serif;
                font-weight: 600;
                font-size: 18px;
                margin-botom: -1px; 
                padding: 5px 20px;
                border-radius: 6px;
                border: 1.5px solid;
                border-color: #EA8872;
            }

            .next-mode {
                color: #8D949D;
                background-color: #22262C;
                font-family: 'Work Sans', sans-serif;
                font-weight: 600;
                font-size: 18px;
                margin-botom: -1px; 
                padding: 5px 20px;
                border-radius: 6px;
                border: 1.5px solid;
                border-color: #31363C;
            }

            .space {
                color: #0E1116;
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