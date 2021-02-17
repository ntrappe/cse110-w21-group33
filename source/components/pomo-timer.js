class PomoTimer extends HTMLElement {
    constructor() {
        super();
        // constants
        const START = 'Start';
        const RESET = 'Reset';
        const MAX_SEC = 60;
        const NUM_MIN = 2;        // @NOTE: change default number of min on timer 
        const SEC_SPEED = 250;    // @NOTE: change spsed of ticking (right now at 0.25 sec)

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');
        element.textContent = "Timer";

        // displays time
        let timerText = document.createElement('h1')
        timerText.textContent = "2:00";

        // toggle button for start/reset
        let timerButton = document.createElement('button');
        timerButton.textContent = START; 

        let totalSeconds = 0;
        let ticker;

        /**
         * Function calls to toggle button and control timer based on user input
         */
        timerButton.onclick = () => {
          if (timerButton.textContent === START) {
            setResetButton();
            startTimer();
          } else {
            setStartButton();
            resetTimer();
          }
        };

        shadow.appendChild(element);
        element.appendChild(timerText);
        element.appendChild(timerButton);

        /**
         * Changes button to represent Start
         */
        function setStartButton() {
          timerButton.innerHTML = START;
        }

        /**
        * Changes button to represent Reset
        */
        function setResetButton() {
          timerButton.innerHTML = RESET;
        }

        /**
         * Sets time on timer and starts ticking
         */
        function startTimer() {
          set(NUM_MIN);
          ticker = setInterval(tick, SEC_SPEED);
        }

        /**
        * Stops the timer from ticking and resets it
        */
        function resetTimer() {
          clearInterval(ticker);
          set(NUM_MIN);
        }

        /**
         * Depending on the minutes given, will set the total seconds of timer appropriately 
         * @param {*} m Minutes for the timer to run
         */
        function set(m = NUM_MIN) {
          // Error catching: make sure minimum 1m and maximum 59m
          if (m < 1 || m > 59) {
            totalSeconds = NUM_MIN * MAX_SEC;
          } else {
            totalSeconds = m * MAX_SEC;
          }
          displayTime();
        }

        /**
         * Decrement each second. If time has run out, stop "ticking" by clearing Interval and 
         * reset the timer. Otherwise, keep decrementing seconds and updating time on screen
         */
        function tick() {
          if (totalSeconds == 0) {
              resetTimer();
              setStartButton();
          } else {
              totalSeconds--;
              displayTime();
          }   
        }

        /**
         * Uses the total seconds to split into minutes and seconds and display on screen
         * @TODO: replace all hard-coded numbers with consts
         */
        function displayTime() {
          // calculate minutes and seconds from total seconds in timer
          let minutes = Math.floor(totalSeconds / MAX_SEC);
          let seconds = totalSeconds - (minutes * MAX_SEC);

          // text representations of minutes and seconds
          let t_min;     
          let t_sec;

          // pad with zeros if necessary
          if (minutes < 10) {
              t_min = '0' + String(minutes);
          } else {
              t_min = String(minutes);
          }

          // pad with zeros if necessary
          if (seconds < 10) {
              t_sec = '0' + String(seconds);
          } else {
              t_sec = String(seconds);
          }

          // write text to screen
          timerText.textContent = t_min + ':' + t_sec;
        }
      }
}

customElements.define('pomo-timer', PomoTimer);


