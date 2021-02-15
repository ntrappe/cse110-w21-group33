// timer.js

/** 
 * @NOTE Change these globals to change how long the timer is run and speed of seconds
 */
var NUM_MIN = 2;       // default number of minutes on clock
var POMODORO_MIN = 1; // default time for Pomodoro work mode
var SHORT_MIN = 2;    // default time for Short Break mode
var LONG_MIN = 3;     // default time for Long Break mode
const SEC_SPEED = 50;   // 1/4 sec (how fast clock ticks)
const START_NAME = 'Start';
const RESET_NAME = 'Reset';
const POMODORO_MODE = "Pomodoro";
const SHORT_BREAK_MODE = "Short Break";
const LONG_BREAK_MODE = "Long Break";

// Main Button Toggle
var toggle_btn = document.getElementById("main-btn");
// Mode Tracker
var mode_label = document.getElementById("mode");

/**
 * Listens to any clicks of the Start/Reset button to toggle between the two and
 * start or reset the timer
 * @param {String} click The action to listen for
 * @param {Event} e The event that occured
 */
toggle_btn.addEventListener('click', function(e) {
    var button_text = toggle_btn.innerHTML;
    if (button_text === START_NAME) {
        setTimer();
        setResetButton();
        start_timer();
    } else {
        setStartButton();
        reset_timer();
    }
});


// Helper Functions
/**
 * Sets time on timer and starts ticking
 */
function start_timer() {
    timer.set(NUM_MIN);
    ticker = setInterval(tick, SEC_SPEED);
}

/**
 * Stops the timer from ticking and resets it
 */
function reset_timer() {
    clearInterval(ticker);
    timer.set(NUM_MIN);
}

/**
 * Changes button to represent Start
 */
function setStartButton() {
    toggle_btn.innerHTML = START_NAME;
}

/**
 * Changes button to represent Reset
 */
function setResetButton() {
    toggle_btn.innerHTML = RESET_NAME;
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

//---------------------------------------------------------------------------

// Timer code
var timer_text = document.querySelector('h3');
var ticker;

/**
 * Timer object with total number of seconds and set function
 */
let timer = {
    default_minutes: NUM_MIN,
    total_seconds: 0,

    /**
     * Depending on the minutes given, will set the total seconds of timer appropriately 
     * @param {*} m Minutes for the timer to run
     */
    set: function(m = this.default_minutes) {
        // Error catching: make sure minimum 1m and maximum 59m
        if (m < 1 || m > 59) {
            this.total_seconds = this.default_minutes * 60;
        } else {
            this.total_seconds = m * 60;
        }
        // display initial time on screen
        display_time();
    }
};

/**
 * Decrement each second and display current time
 * @name NicoleTrappe
 */
function tick() {
    // if time has run out, stop "ticking" by clearing Interval and reset the timer
    if (timer.total_seconds == 0) {
        change_mode();
        setTimer();
        reset_timer();
        setStartButton();
    // otherwise, keep decrementing seconds and updating time on screen
    } else {
        timer.total_seconds--;
        display_time();
    }   
}

/**
 * Uses the total seconds to split into minutes and seconds and display on screen
 * @TODO: replace all hard-coded numbers with consts
 */
function display_time() {
    // calculate minutes and seconds from total seconds in timer
    var minutes = Math.floor(timer.total_seconds / 60);
    var seconds = timer.total_seconds - (minutes * 60);

    // text representations of minutes and seconds
    var t_min;     
    var t_sec;

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
    timer_text.textContent = t_min + ':' + t_sec;
}


