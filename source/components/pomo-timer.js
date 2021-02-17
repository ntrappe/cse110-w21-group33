class PomoTimer extends HTMLElement {
    constructor() {
        super();
        // constants
        const START = 'Start';
        const RESET = 'Reset';
        const MAX_SEC = 60;
        var NUM_MIN = 2;        // @NOTE: change the number of min on timer 
        const SEC_SPEED = 250;    // @NOTE: change spsed of ticking (right now at 0.25 sec)
        const POMODORO_MIN = 1; // default time for Pomodoro work mode
        const SHORT_MIN = 2;    // default time for Short Break mode
        const LONG_MIN = 3;     // default time for Long Break mode
        const POMODORO_MODE = "Pomodoro";
        const SHORT_BREAK_MODE = "Short Break";
        const LONG_BREAK_MODE = "Long Break";

        const shadow = this.attachShadow({mode: 'open'});

        const element = document.createElement('p');
        element.textContent = "Timer";

        const mode_label = document.createElement('h2');
        mode_label.textContent = "Pomodoro";

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
            setTimer();
            setResetButton();
            startTimer();
          } else {
            setStartButton();
            resetTimer();
          }
        };

        shadow.appendChild(element);
        element.appendChild(mode_label);
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
        * Set timer to correct time based on Mode
        */
        function setTimer() {
          var mode_text = mode_label.innerHTML;
          if (mode_text == POMODORO_MODE) {
              NUM_MIN = POMODORO_MIN;
          }
          else if (mode_text == SHORT_BREAK_MODE) {
              NUM_MIN = SHORT_MIN;
          } else {
              NUM_MIN = LONG_MIN;
          }
        }

        /** 
        * Changes mode to current Mode
        */
        function change_mode() {
          if (mode_label.innerHTML == POMODORO_MODE) {
              if (!(localStorage.getItem('Pomodoro_Count'))) { // Checking if locale storage exist
                  localStorage.setItem('Pomodoro_Count',0); // Creating locale storage 
              }
              var pomo_count = localStorage.getItem('Pomodoro_Count'); // Getting pomodoro finished
              localStorage.setItem('Pomodoro_Count',++pomo_count); // Updating locale storage
              if (pomo_count % 4 == 0) {                           // Checking what breaks to go to
                  mode_label.innerHTML = LONG_BREAK_MODE;
              } else { 
                  mode_label.innerHTML = SHORT_BREAK_MODE;
              }
          } else {
              mode_label.innerHTML = POMODORO_MODE;
          }
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
              change_mode();
              setTimer();
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


