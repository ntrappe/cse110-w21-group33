let calm = false;

/**
 * Responds to calm mode and hides the second display
 * @param {Boolean} calm is calm mode enabled
 */
export function setCalm(calm_in) {
    calm = calm_in;
}

/**
 * Updates browser tab text and icon to reflect time remaining
 * @param {Number} sec number of seconds remaining
 * @param {String} mode the shorthand of the current mode
 */
export function setTab(sec, mode) {
    let title = document.querySelector('title');

    // Convert mode shorthand to full title
    let modeTitle;
    switch (mode) {
        case 'work':
            modeTitle = 'Work'
            break;
    
        case 'short break':
            modeTitle = 'Short Break';
            break;

        case 'long break':
            modeTitle = 'Long Break';
            break;
            
        default:
            modeTitle = '';
            break;
    }

    // Calculate minutes remaining, and then pad with '0' if necessary.
    // For calm mode, round the minute up. For regular mode, round the minute down.
    const minutes = (calm ? Math.ceil(sec / 60): Math.floor(sec / 60)).toString().padStart(2, '0');

    // For calm mode, always display '00'. For regular mode, display the seconds.
    const seconds = (calm ? 0 : sec % 60).toString().padStart(2, '0');

    title.textContent = minutes + ':' + seconds + ' - ' + modeTitle;
}

/**
 * Resets browser tab title to the default
 */
export function defaultTab() {
    let title = document.querySelector('title');

    title.textContent = 'Pomodoro Timer';
}