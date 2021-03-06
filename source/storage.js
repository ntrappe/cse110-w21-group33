console.log("Storage loaded!");

/* Functions for Local Storage updates */

/**
 * Function to get the pomodoro completed for the day and check if it should reset local storage
 */
function getDayCount() {
  if(!(localStorage.getItem('pomodoroCount'))) { // If local storage for pomodro completed is does not exist then we set current count to 0
    setDayCount(0);
  }
  // Clears local storage for the day if its a new day
  var date = new Date();
  if (date.getFullYear() > localStorage.getItem('prevYear') || date.getMonth()+1 > localStorage.getItem('prevMonth') || date.getDate() > localStorage.getItem('prevDay')) {
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',0);
  }
  return parseInt(localStorage.getItem('pomodoroCount'));
}

/**
 * Function to set the pomodoro completed for the day into local storage
 * @param {Number} count Pomodoro completed
 */
function setDayCount(count) {
  var date = new Date();
  if(!(localStorage.getItem('prevDay'))) { // Creating new local storage for pomodoroCount if it is the first time
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',0);
  }
  // Clears local storage for the day if its a new day
  if (date.getFullYear() > localStorage.getItem('prevYear') || date.getMonth()+1 > localStorage.getItem('prevMonth') || date.getDate() > localStorage.getItem('prevDay')) {
    localStorage.setItem('prevYear',date.getFullYear());
    localStorage.setItem('prevMonth',date.getMonth()+1);
    localStorage.setItem('prevDay',date.getDate());
    localStorage.setItem('pomodoroCount',0);
  }
  localStorage.setItem('pomodoroCount',count + getDayCount());
}

/**
 * Function to get the current Calm value
 */
function getCalm() {
  if(!(localStorage.getItem('isCalm'))) { // Checking if there is a calm mode value stored in local storage
      setCalm(false); // Creating local storage for calm mode if it doesn't exist
  }
  return eval(localStorage.getItem('isCalm'));

}

/**
 * Function to be called whenever the onClick event is listened to for calm mode
 * @param {Boolean} calm Setting of current calm mode
 */
function setCalm(calm) {
  localStorage.setItem('isCalm',calm);
}

/**
 * Function to get the current volume value
 */
function getVolume() {
  if(!(localStorage.getItem('volume'))) { // Checking if there is a volume value stored in local storage
    setVolume(100); // Setting default volume to be 50
  }
  return eval(localStorage.getItem('volume'));
}
  
/**
* Function to be called whenever the current volume is changed
* @param {Integer} vol volume saved
*/
function setVolume(vol) {
  localStorage.setItem('volume',vol);
}

/**
 * Function to get the current sound
 */
function getSound() {
  if(!(localStorage.getItem('sound'))) { // Checking if there is a sound value stored in local storage
    setSound('zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3'); // Setting default sound to be bell
  }
  return localStorage.getItem('sound');
}
  
/**
* Function to be called whenever the current sound is changed
* @param {String} sound Alarm sound saved
*/
function setSound(sound) {
  localStorage.setItem('sound',sound);
}

/**
 * Function to get the current sound
 */
function getDark() {
  if(!(localStorage.getItem('isDark'))) { // Checking if there is a dark mode value stored in local storage
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
 */
function getWork() {
  if(!(localStorage.getItem('work'))) { // Checking if the duration of work mode has been changed
    setWork(25); // Setting default work mode to be 25 minutes
  }
  return eval(localStorage.getItem('work'));
}
    
/**
* Function to be called whenever the duration of work mode is changed
* @param {Integer} work duration of new work mode
*/
function setWork(work) {
  localStorage.setItem('work',work);
}

/**
 * Function to get the duration of the short break timer in minutes
 */
function getShortBreak() {
  if(!(localStorage.getItem('shortBreak'))) { // Checking if the duration of short break has been changed
    setShortBreak(5); // Setting default short break to be 5 minutes
  }
  return eval(localStorage.getItem('shortBreak'));
}
      
/**
* Function to be called whenever the duration of short break is changed
* @param {Integer} work duration of new short break
*/
function setShortBreak(shortBreak) {
  localStorage.setItem('shortBreak',shortBreak);
}

/**
 * Function to get the duration of the long break timer in minutes
 */
function getLongBreak() {
  if(!(localStorage.getItem('longBreak'))) { // Checking if the duration of long break has been changed
    setLongBreak(15); // Setting default long break to be 15 minutes
  }
  return eval(localStorage.getItem('longBreak'));
}

/**
* Function to be called whenever the duration of long break is changed
* @param {Integer} work duration of new long break
*/
function setLongBreak(longBreak) {
  localStorage.setItem('longBreak',longBreak);
}

export {getDayCount,setDayCount,getCalm,setCalm,getVolume,setVolume,getSound,setSound,getDark,setDark,getWork,setWork,getShortBreak,setShortBreak,getLongBreak,setLongBreak}
/* End of functions for Local Storage */