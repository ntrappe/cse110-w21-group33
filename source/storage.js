/* Variables for Local Storage */
const DEFAULT_WORK = 25;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 15;
const EMPTY_VALUE = 0;
const MAX_VOL = 100;

/* Functions for Local Storage updates */

/**
 * Function to get the pomodoro completed for the day and check if it should reset local storage
 * @return {Number} total amount of Pomodoro completed for the day
 */
function getDayCount() {
  // If local storage for pomodro completed is does not exist then we set current count to 0
  if (!localStorage.getItem('pomodoroCount')) {
    localStorage.setItem('pomodoroCount', EMPTY_VALUE);
  }
  // Clears local storage for the day if its a new day
  const date = new Date();
  if (
    date.getFullYear() > localStorage.getItem('prevYear') ||
    date.getMonth() + 1 > localStorage.getItem('prevMonth') ||
    date.getDate() > localStorage.getItem('prevDay')
  ) {
    localStorage.setItem('prevYear', date.getFullYear());
    localStorage.setItem('prevMonth', date.getMonth() + 1);
    localStorage.setItem('prevDay', date.getDate());
    localStorage.setItem('pomodoroCount', EMPTY_VALUE);
  }
  return parseInt(localStorage.getItem('pomodoroCount'), 10);
}

export { getDayCount };

/**
 * Function to set the pomodoro completed for the day into local storage
 * @param {Number} count pomodoro completed
 */
function setDayCount(count) {
  const date = new Date();
  // Creating new local storage for pomodoroCount if it is the first time
  if (!localStorage.getItem('prevDay')) {
    localStorage.setItem('prevYear', date.getFullYear());
    localStorage.setItem('prevMonth', date.getMonth() + 1);
    localStorage.setItem('prevDay', date.getDate());
    localStorage.setItem('pomodoroCount', EMPTY_VALUE);
  }
  // Clears local storage for the day if its a new day
  if (
    date.getFullYear() > localStorage.getItem('prevYear') ||
    date.getMonth() + 1 > localStorage.getItem('prevMonth') ||
    date.getDate() > localStorage.getItem('prevDay')
  ) {
    localStorage.setItem('prevYear', date.getFullYear());
    localStorage.setItem('prevMonth', date.getMonth() + 1);
    localStorage.setItem('prevDay', date.getDate());
    localStorage.setItem('pomodoroCount', EMPTY_VALUE);
  }
  localStorage.setItem('pomodoroCount', count + getDayCount());
}

export { setDayCount };

/**
 * Function to get the current Calm value
 * @return {Boolean} boolean value of whether the user wanted calm more
 */
function getCalm() {
  // Checking if there is a calm mode value stored in local storage
  if (!localStorage.getItem('isCalm')) {
    localStorage.setItem('isCalm', false); // Creating local storage for calm mode
  }
  if (localStorage.getItem('isCalm') === 'true') {
    return true;
  }
  return false;
}

export { getCalm };

/**
 * Function to be called whenever the onClick event is listened to for calm mode
 * @param {Boolean} calm setting of current calm mode
 */
function setCalm(calm) {
  localStorage.setItem('isCalm', calm);
}

export { setCalm };

/**
 * Function to get the current volume value
 * @return {Number} value of last saved volume
 */
function getVolume() {
  // Checking if there is a volume value stored in local storage
  if (!localStorage.getItem('volume')) {
    localStorage.setItem('volume', MAX_VOL); // setting default volume to be 100
  }
  return parseInt(localStorage.getItem('volume'), 10);
}

export { getVolume };

/**
 * Function to be called whenever the current volume is changed
 * @param {Number} vol volume saved
 */
function setVolume(vol) {
  localStorage.setItem('volume', vol);
}

export { setVolume };

/**
 * Function to get the current sound
 * @return {String} last saved sound for alarm
 */
function getSound() {
  // Checking if sound local storage was created
  if (!localStorage.getItem('sound')) {
    localStorage.setItem(
      'sound',
      'zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3'
    );
  }
  return localStorage.getItem('sound');
}

export { getSound };

/**
 * Function to be called whenever the current sound is changed
 * @param {String} sound alarm sound saved
 */
function setSound(sound) {
  localStorage.setItem('sound', sound);
}

export { setSound };

/**
 * Function to get the current sound
 * @return {Boolean} boolean value of whether or not dark mode is enabled
 */
function getDark() {
  // Checking if dark mode local storage was created
  if (!localStorage.getItem('isDark')) {
    localStorage.setItem('isDark', false); // Setting default mode into light mode
  }
  if (localStorage.getItem('isDark') === 'true') {
    return true;
  }
  return false;
}

export { getDark };

/**
 * Function to be called whenever the onClick event is listened to for dark mode
 * @param {Boolean} dark Setting of current dark mode
 */
function setDark(dark) {
  localStorage.setItem('isDark', dark);
}

export { setDark };

/**
 * Function to get the duration of the work timer in minutes
 * @return {Number} saved value of work mode duration
 */
function getWork() {
  // Checking if the duration of work mode has been changed
  if (!localStorage.getItem('work')) {
    localStorage.setItem('work', DEFAULT_WORK); // Setting default work mode to be 25 minutes
  }
  return parseInt(localStorage.getItem('work'), 10);
}

export { getWork };

/**
 * Function to be called whenever the duration of work mode is changed
 * @param {Number} work duration of new work mode
 */
function setWork(work) {
  localStorage.setItem('work', work);
}

export { setWork };

/**
 * Function to get the duration of the short break timer in minutes
 * @return {Number} saved value of short break duration
 */
function getShortBreak() {
  // Checking if the duration of short break has been changed
  if (!localStorage.getItem('shortBreak')) {
    // Setting default short break to be 5 minutes
    localStorage.setItem('shortBreak', DEFAULT_SHORT_BREAK);
  }
  return parseInt(localStorage.getItem('shortBreak'), 10);
}

export { getShortBreak };

/**
 * Function to be called whenever the duration of short break is changed
 * @param {Number} work duration of new short break
 */
function setShortBreak(shortBreak) {
  localStorage.setItem('shortBreak', shortBreak);
}

export { setShortBreak };

/**
 * Function to get the duration of the long break timer in minutes
 * @return {Number} saved value of long break duration
 */
function getLongBreak() {
  // Checking if the duration of long break has been changed
  if (!localStorage.getItem('longBreak')) {
    // Setting default long break to be 15 minutes
    localStorage.setItem('longBreak', DEFAULT_LONG_BREAK);
  }
  return parseInt(localStorage.getItem('longBreak'), 10);
}

export { getLongBreak };

/**
 * Function to be called whenever the duration of long break is changed
 * @param {Number} work duration of new long break
 */
function setLongBreak(longBreak) {
  localStorage.setItem('longBreak', longBreak);
}

export { setLongBreak };

/**
 * Function to get the current accessibility setting
 * @return {Boolean} boolean value of whether the user wants app to be accessible by keystroke
 */
function getAccessibility() {
  // Checking if there is a accessible value stored in local storage
  if (!localStorage.getItem('isAccessible')) {
    localStorage.setItem('isAccessible', true); // Default is on
  }
  if (localStorage.getItem('isAccessible') === 'true') {
    return true;
  }
  return false;
}

export { getAccessibility };

/**
 * Function to be called whenever the onClick event is listened to for accessibility
 * @param {Boolean} accessibility setting of accessibility
 */
function setAccessibility(accessibility) {
  localStorage.setItem('isAccessible', accessibility);
}

export { setAccessibility };

/* End of functions for Local Storage */
