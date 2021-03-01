const START = 'Start';
const RESET = 'Reset';
class PomoTimer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        // label for mode e.g. 'Work'
        let currentMode = document.createElement('p');          
        currentMode.setAttribute('id', 'mode'); 
        currentMode.textContent = "WORK";

        // timer countdown display
        let timerText = document.createElement('h1')            
        timerText.setAttribute('class', 'time');
        timerText.setAttribute('id', 'timer-text');
        timerText.textContent = "TIME";

        // timer button
        let timerButton = document.createElement('button'); 
        timerButton.setAttribute('id', 'button');
        timerButton.textContent = START; 

        shadow.appendChild(wrapper);
        wrapper.appendChild(currentMode);
        wrapper.appendChild(timerText);
        wrapper.appendChild(timerButton);

        /**
         * Function calls to toggle button and control timer based on user input
         */
        timerButton.onclick = () => {
            if (timerButton.textContent === START) {
                setResetButton(timerButton);
            } else {
                setStartButton(timerButton);
            }
        };

        /**
         * Changes button to represent Start
         *  @param {Button} timerButton button for Start/Reset timer
         */
        function setStartButton(timerButton) {
            timerButton.innerHTML = START;
        }

        /**
         * Changes button to represent Reset
         *  @param {Button} timerButton button for Start/Reset timer
         */
        function setResetButton(timerButton) {
            timerButton.innerHTML = RESET;
        }
    }
}

customElements.define('pomo-timer', PomoTimer);

export { PomoTimer };