/* Functions for changing tab */

let calm = false;

const DEFAULT = 'Pomodoro Timer';
const WORK = 'Work';
const SHORTBREAK = 'Short Break';
const LONGBREAK = 'Long Break';

/**
 * Responds to calm mode and hides the second display
 * @param {Boolean} calm is calm mode enabled
 */
export function setCalm(calm_in) {
  calm = calm_in;
}

/**
 * Updates browser tab text to reflect time remaining
 * @param {Number} sec number of seconds remaining
 * @param {String} mode the shorthand of the current mode
 * @param {String} title element in the document
 */
export function setTab(sec, mode, tabText) {

  // Convert mode shorthand to full title
  let modeTitle;
  switch (mode) {
    case 'work':
      modeTitle = WORK;
      break;
    
    case 'short break':
      modeTitle = SHORTBREAK;
      break;

    case 'long break':
      modeTitle = LONGBREAK;
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

  tabText.textContent = minutes + ':' + seconds + ' - ' + modeTitle;
}

/**
 * Resets browser tab title to the default
 * @param {String} title element in the document
 */
export function defaultTab(tabText) {
  tabText.textContent = DEFAULT;
}
