/* Helper Functions for Timer (imported by pomo-timer.js) */

const MAX_SEC = 60;
const NUM_MIN = 2;
const SEC_SPEED = 250;
const TWO_DIGIT = 10;
const START = 'Start';
const RESET = 'Reset';

/**
 * Uses the total seconds to split into minutes and seconds and display on screen
 * @param {Number} totalSeconds current total number of seconds on timer
 * @param {String} timerText text for current time on timer
 */
function display(totalSeconds, timerText) {
    // calculate minutes and seconds from total seconds in timer
    let minutes = Math.floor(totalSeconds / MAX_SEC);
    let seconds = totalSeconds - (minutes * MAX_SEC);

    let t_min;              // text repr of minutes 
    let t_sec;              // text repr of seconds

    // pad with zeros if necessary
    if (minutes < TWO_DIGIT) {
        t_min = '0' + String(minutes);
    } else {
        t_min = String(minutes);
    }

    // pad with zeros if necessary
    if (seconds < TWO_DIGIT) {
        t_sec = '0' + String(seconds);
    } else {
        t_sec = String(seconds);
    }

    // write text to screen
    timerText.textContent = t_min + ':' + t_sec;
    //setTab(t_min, t_sec);
}

/**
 * Updates browser tab text and icon to reflect time
 * @param {String} t_min text version of curr minute
 * @param {String} t_sec text version of curr second
 */
function setTab(t_min, t_sec) {
    let tabText = document.querySelector('title');
    tabText.textContent = 'Pomo: ' + t_min + ':' + t_sec;
}

/**
 * Depending on the minutes given, will set the total seconds of timer appropriately 
 * @param {Number} m Minutes for the timer to run
 * @return {Number} totalSeconds
 */
function set(m) {
    // Error catching: make sure minimum 1m and maximum 59m
    if (m < 1 || m > 59) {
        return(NUM_MIN * MAX_SEC);
    } else {
        return(m * MAX_SEC);
    }
}

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

export {display, setStartButton, setResetButton, set};

/* End pomo-timer-helpers.js */