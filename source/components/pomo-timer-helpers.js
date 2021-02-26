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

/**
 * Creates a div, progressContainer, with an upper and lower div (Sections). Creates
 * 4 squares (and spaces) that live in the lower div to represent break progress
 * @returns {Array} container for progress elements to append to shadow and individual
 *                  squares (for styling)
 */
function initProgess() {
    /* holds 2 layers of div where the second layer is the progress squares */
    let progressContainer = document.createElement('div');  
    progressContainer.setAttribute('class', 'progress-container');
    progressContainer.setAttribute('id', 'progress-container');

    /* text above squares NOT IMPLEMENTED */
    let progressTopSection = document.createElement('div');
    progressTopSection.setAttribute('class', 'progress-top-section');
    progressTopSection.setAttribute('id', 'progress-top-section');
    progressContainer.appendChild(progressTopSection);
    
    /* holder for squares that track break progress */  
    let progressBottomSection = document.createElement('div');
    progressContainer.appendChild(progressBottomSection);

    /* empty space (matches background) */
    let space1 = document.createElement('p');
    space1.setAttribute('class', 'space');
    let space2 = document.createElement('p');
    space2.setAttribute('class', 'space');
    let space3 = document.createElement('p');
    space3.setAttribute('class', 'space');

    let square1 = document.createElement('p');
    square1.setAttribute('class', 'square-off');
    square1.setAttribute('id', 'square1');
    let square2 = document.createElement('p');
    square2.setAttribute('class', 'square-off');
    square2.setAttribute('id', 'square2');
    let square3 = document.createElement('p');
    square3.setAttribute('class', 'square-off');
    square3.setAttribute('id', 'square3');
    let square4 = document.createElement('p');
    square4.setAttribute('class', 'square-off');
    square4.setAttribute('id', 'square4');

    /* break tracker via squares */  
    progressBottomSection.setAttribute('class', 'progress-bottom-section');
    progressBottomSection.appendChild(square1);
    progressBottomSection.appendChild(space1);
    progressBottomSection.appendChild(square2);
    progressBottomSection.appendChild(space2);
    progressBottomSection.appendChild(square3);
    progressBottomSection.appendChild(space3);
    progressBottomSection.appendChild(square4);

    // return container to main file can append to wrapper
    // return squares so setProgressHelper can reference them for style
    return [progressContainer, square1, square2, square3, square4];
}

/**
 * Updates the colors of the squares to match number of breaks
 * @param {Number} progress [0,4] that represents number of breaks taken
 * @param {Object} square1 a square shape (created by initProgress)
 * @param {Object} square2 a square shape (created by initProgress)
 * @param {Object} square3 a square shape (created by initProgress)
 * @param {Object} square4 a square shape (created by initProgress)
 */
function setProgressHelper(progress, square1, square2, square3, square4) {
    /* clear out all styling first (make all squares dark) */
    square1.setAttribute('class', 'square-off');
    square2.setAttribute('class', 'square-off');
    square3.setAttribute('class', 'square-off');
    square4.setAttribute('class', 'square-off');

    switch (progress) {
        case 1:
            square1.setAttribute('class', 'square-on');
            break;
        case 2:
            square1.setAttribute('class', 'square-on');
            square2.setAttribute('class', 'square-on');
            break;
        case 3:
            square1.setAttribute('class', 'square-on');
            square2.setAttribute('class', 'square-on');
            square3.setAttribute('class', 'square-on');
            break;
        case 4:
            square1.setAttribute('class', 'square-on');
            square2.setAttribute('class', 'square-on');
            square3.setAttribute('class', 'square-on');
            square4.setAttribute('class', 'square-on');
            break;
        default: break;
    }
}

export {display, setStartButton, setResetButton, set, initProgess, setProgressHelper};

/* End pomo-timer-helpers.js */