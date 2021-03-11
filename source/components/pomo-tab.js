// Mode and default titles
const DEFAULT = 'Pomodoro Timer';
const WORK = 'Work';
const SHORTBREAK = 'Short Break';
const LONGBREAK = 'Long Break';

const SEC_IN_MIN = 60;
const PADDING = 2;

const pageTitle = document.getElementsByTagName('title')[0]; // We know there is only one title element.

let calm = false;

/**
 * Responds to calm mode and hides the second display
 * @param {Boolean} calmIn indicating if calm mode is enabled
 */
export function setCalm(calmIn) {
  calm = calmIn;
}

/**
 * Updates browser tab text to reflect time remaining
 * @param {Number} sec number of seconds remaining
 * @param {String} mode the shorthand of the current mode
 */
export function setTab(sec, mode) {

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
  const minutes = (calm ? Math.ceil(sec / SEC_IN_MIN): Math.floor(sec / SEC_IN_MIN)).toString().padStart(PADDING, '0');

  // For calm mode, always display '00'. For regular mode, display the seconds.
  const seconds = (calm ? 0 : sec % 60).toString().padStart(PADDING, '0');

  pageTitle.textContent = minutes + ':' + seconds + ' - ' + modeTitle;
}

/**
 * Resets browser tab title to the default
 */
export function defaultTab() {
  pageTitle.textContent = DEFAULT;
}