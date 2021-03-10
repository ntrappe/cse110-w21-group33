console.log("Storage loaded!");

const DEFAULT_WORK = 25;
const DEFAULT_SHORT_BREAK = 5;
const DEFAULT_LONG_BREAK = 15;
const EMPTY_VALUE = 0;

/* Functions for Local Storage updates */

/**
 * Function to get the pomodoro completed for the day and check if it should reset local storage
 * @return {Number} total amount of Pomodoro completed for the day
 */
function getDayCount() {
  // If local storage for pomodro completed is does not exist then we set current count to 0
  if(!(localStorage.getItem('pomodoroCount'))) {
    setDayCount(0);
  }
  // Clears local storage for the day if its a new day
  let date = new Date();
  if (date.getFullYear() > localStorage.getItem('prevYear') ||
  date.getMonth()+1 > localStorage.getItem('prevMonth') ||
  date.getDate() > localStorage.getItem('prevDay')) {
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',EMPTY_VALUE);
  }
  return parseInt(localStorage.getItem('pomodoroCount'));
}

/**
 * Function to set the pomodoro completed for the day into local storage
 * @param {Number} count pomodoro completed
 */
function setDayCount(count) {
  let date = new Date();
  // Creating new local storage for pomodoroCount if it is the first time
  if(!(localStorage.getItem('prevDay'))) {
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',EMPTY_VALUE);
  }
  // Clears local storage for the day if its a new day
  if (date.getFullYear() > localStorage.getItem('prevYear') ||
  date.getMonth()+1 > localStorage.getItem('prevMonth') ||
  date.getDate() > localStorage.getItem('prevDay')) {
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',EMPTY_VALUE);
  }
  localStorage.setItem('pomodoroCount',count + getDayCount());
}

/**
 * Function to get the current Calm value
 * @return {Boolean} boolean value of whether the user wanted calm more
 */
function getCalm() {
  // Checking if there is a calm mode value stored in local storage
  if(!(localStorage.getItem('isCalm'))) {
      setCalm(false); // Creating local storage for calm mode if it doesn't exist
  }
  return eval(localStorage.getItem('isCalm'));

}

/**
 * Function to be called whenever the onClick event is listened to for calm mode
 * @param {Boolean} calm setting of current calm mode
 */
function setCalm(calm) {
  localStorage.setItem('isCalm',calm);
}

/**
 * Function to get the current volume value
 * @return {Number} value of last saved volume
 */
function getVolume() {
  // Checking if there is a volume value stored in local storage
  if(!(localStorage.getItem('volume'))) {
    setVolume(100); // setting default volume to be 50
  }
  return eval(localStorage.getItem('volume'));
}
  
/**
* Function to be called whenever the current volume is changed
* @param {Number} vol volume saved
*/
function setVolume(vol) {
  localStorage.setItem('volume',vol);
}

/**
 * Function to get the current sound
 * @return {String} last saved sound for alarm
 */
function getSound() {
  if(!(localStorage.getItem('sound'))) { // Checking if sound local storage was created
    //default sound
    setSound('zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3');
  }
  return localStorage.getItem('sound');
}
  
/**
* Function to be called whenever the current sound is changed
* @param {String} sound alarm sound saved
*/
function setSound(sound) {
  localStorage.setItem('sound',sound);
}

/**
 * Function to get the current sound
 * @return {Boolean} boolean value of whether or not dark mode is enabled
 */
function getDark() {
  if(!(localStorage.getItem('isDark'))) { // Checking if dark mode local storage was created
    setDark(false); // Setting default mode into light mode
  }
  return eval(localStorage.getItem('isDark'));
}
  
/**
 * Function to be called whenever the onClick event is listened to for dark mode
 * @param {Boolean} dark Setting of current dark mode
 */
function setDark(dark) {
  localStorage.setItem('isDark',dark);
}

/**
 * Function to get the duration of the work timer in minutes
 * @return {Number} saved value of work mode duration
 */
function getWork() {
  if(!(localStorage.getItem('work'))) { // Checking if the duration of work mode has been changed
    setWork(DEFAULT_WORK); // Setting default work mode to be 25 minutes
  }
  return eval(localStorage.getItem('work'));
}
    
/**
* Function to be called whenever the duration of work mode is changed
* @param {Number} work duration of new work mode
*/
function setWork(work) {
  localStorage.setItem('work',work);
}

/**
 * Function to get the duration of the short break timer in minutes
 * @return {Number} saved value of short break duration
 */
function getShortBreak() {
  // Checking if the duration of short break has been changed
  if(!(localStorage.getItem('shortBreak'))) {
    setShortBreak(DEFAULT_SHORT_BREAK); // Setting default short break to be 5 minutes
  }
  return eval(localStorage.getItem('shortBreak'));
}
      
/**
* Function to be called whenever the duration of short break is changed
* @param {Number} work duration of new short break
*/
function setShortBreak(shortBreak) {
  localStorage.setItem('shortBreak',shortBreak);
}

/**
 * Function to get the duration of the long break timer in minutes
 * @return {Number} saved value of long break duration
 */
function getLongBreak() {
  // Checking if the duration of long break has been changed
  if(!(localStorage.getItem('longBreak'))) {
    setLongBreak(DEFAULT_LONG_BREAK); // Setting default long break to be 15 minutes
  }
  return eval(localStorage.getItem('longBreak'));
}

/**
* Function to be called whenever the duration of long break is changed
* @param {Number} work duration of new long break
*/
function setLongBreak(longBreak) {
  localStorage.setItem('longBreak',longBreak);
}

export {getDayCount,setDayCount,getCalm,setCalm,getVolume,setVolume,getSound,setSound,
  getDark,setDark,getWork,setWork,getShortBreak,setShortBreak,getLongBreak,setLongBreak}
/* End of functions for Local Storage */