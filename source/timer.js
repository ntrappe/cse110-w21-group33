// timer.js

/** 
 * @NOTE Change these globals to change how long the timer is run and speed of seconds
 */
const NUM_MIN = 2;      // default number of minutes on clock
const SEC_SPEED = 250;  // 1/4 sec (how fast clock ticks)
const START_NAME = 'Start';
const RESET_NAME = 'Reset';

// Main Button Toggle
var toggle_btn = document.getElementById("main-btn");

/**
 * Listens to any clicks of the Start/Reset button to toggle between the two and
 * start or reset the timer
 * @param {String} click The action to listen for
 * @param {Event} e The event that occured
 */
toggle_btn.addEventListener('click', function(e) {
    var button_text = toggle_btn.innerHTML;
    if (button_text === START_NAME) {
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


