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
 * @param {Number} sec_in number of seconds remaining
 */
export function setTab(sec_in) {
    let title = document.querySelector('title');

    if (calm) {
        const minutes = Math.floor(sec_in / 60).toString();

        title.textContent = minutes + 'm Remaining';
    } else {
        const minutes = Math.floor(sec_in / 60).toString().padStart(2, '0');
        const seconds = (sec_in % 60).toString().padStart(2, '0');

        title.textContent = minutes + ':' + seconds + ' Remaining';
    }
}

/**
 * Resets browser tab title to the default
 */
export function defaultTab() {
    let title = document.querySelector('title');

    title.textContent = 'Pomodoro Timer';
}