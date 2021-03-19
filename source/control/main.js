/**
 * @module Main
 */

import './resize.js';

/**
 * After init.js has been run by the page, retrieve components from window
 */
const { pomoAudio, pomoFinish, pomoInfo, pomoSettings, pomoTimer } = window;
const PomoStorage = window.pomoStorage;
const PomoTab = window.pomoTab;

/**
 * Use Mode as an enum to prevent reuse of strings
 */
let currentMode = '';
const Mode = {
  work: 'work',
  short: 'short break',
  long: 'long break',
};

/**
 * Track the length of each mode
 * Variables are initialized in the onLoad method
 */
let workLength = 1;
let shortLength = 1;
let longLength = 1;

/**
 * Track the counts of each mode, including interrupted work
 * Variables are initialized in the onLoad method
 */
let workCount = 0;
let shortCount = 0;
let longCount = 0;
let interruptCount = 0;

/**
 * Track if accessibility is currently enabled
 * Used to re-activate components after a modal has been closed
 */
let accessibility = true;

/**
 * @function
 * Enable all components to be accessed
 * Used when timer finishes running
 */
function enableAll() {
  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoSettings.enableSettings();
}

/**
 * @function
 * Disable all components to be accessed
 * Used when timer starts running
 */
function disableAll() {
  pomoFinish.disableFinish();
  pomoInfo.disableInfo();
  pomoSettings.disableSettings();
}

/* ---------------------------------------------------------------------------------------------- */
/* PomoTimer Event Functions */

/**
 * When a work session is started, disable other components
 */
pomoTimer.addEventListener('timerStart', () => {
  if (currentMode === Mode.work) {
    disableAll();
  }
});

/**
 * When the timer value changes, update the tab as well
 */
pomoTimer.addEventListener('tick', (event) => {
  PomoTab.setTab(event.detail.timeRemaining(), currentMode);
});

/**
 * If a work session is reset, add to the interrupt count and store it
 * Enable other components and reset the tab for all modes being reset
 */
pomoTimer.addEventListener('timerReset', () => {
  if (currentMode === Mode.work) {
    interruptCount += 1;
    PomoStorage.setDayCounts(workCount, shortCount, longCount, interruptCount);
  }

  enableAll();
  PomoTab.defaultTab();
});

/**
 * When the timer finishes, update counts based on the current mode completed
 * Determine the next mode based on workCount and previously completed mode
 */
pomoTimer.addEventListener('timerFinish', () => {
  switch (currentMode) {
    case Mode.work:
      workCount += 1;
      // Start a long break every 4 work sessions completed, but not when 0 sessions are complete
      if (workCount !== 0 && workCount % 4 === 0) {
        pomoTimer.setProgress(4);
        currentMode = Mode.long;
        pomoTimer.setTimer(longLength, Mode.long);
        PomoStorage.setMode(Mode.long);
      } else {
        pomoTimer.setProgress(workCount % 4);
        currentMode = Mode.short;
        pomoTimer.setTimer(shortLength, Mode.short);
        PomoStorage.setMode(Mode.short);
      }
      break;

    case Mode.short:
      shortCount += 1;
      currentMode = Mode.work;
      pomoTimer.setTimer(workLength, Mode.work);
      PomoStorage.setMode(Mode.work);
      break;

    case Mode.long:
      pomoTimer.setProgress(0);
      longCount += 1;
      currentMode = Mode.work;
      pomoTimer.setTimer(workLength, Mode.work);
      PomoStorage.setMode(Mode.work);
      break;

    default:
      break;
  }

  PomoStorage.setDayCounts(workCount, shortCount, longCount, interruptCount);

  pomoAudio.playSound();

  enableAll();
});

/* ---------------------------------------------------------------------------------------------- */
/* PomoFinish Event Functions */

/**
 * When the finish modal is requested, provide the current counts and display the modal
 */
pomoFinish.addEventListener('modalRequest', () => {
  pomoFinish.showModal(workCount, shortCount, longCount, interruptCount);
});

/* ---------------------------------------------------------------------------------------------- */
/* PomoFinish Settings Functions */

/**
 * @function
 * When the work length is changed, update the control variable
 * Update timer if it is currently starting a work session
 */
function workSet(work) {
  workLength = work;

  if (currentMode === Mode.work) {
    pomoTimer.setTimer(work, currentMode);
  }
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('workSet', (event) => {
  const work = event.detail.work();
  PomoStorage.setWork(work);

  workSet(work);
});

/**
 * @function
 * When the short break length is changed, update the control variable
 * Update timer if it is currently starting a short break
 */
function shortBreakSet(shortBreak) {
  shortLength = shortBreak;

  if (currentMode === Mode.short) {
    pomoTimer.setTimer(shortBreak, currentMode);
  }
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('shortBreakSet', (event) => {
  const shortBreak = event.detail.shortBreak();
  PomoStorage.setShortBreak(shortBreak);

  shortBreakSet(shortBreak);
});

/**
 * @function
 * When the long break length is changed, update the control variable
 * Update timer if it is currently starting a long break
 */
function longBreakSet(longBreak) {
  longLength = longBreak;

  if (currentMode === Mode.long) {
    pomoTimer.setTimer(longBreak, currentMode);
  }
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('longBreakSet', (event) => {
  const longBreak = event.detail.longBreak();
  PomoStorage.setLongBreak(longBreak);

  longBreakSet(longBreak);
});

/**
 * @function
 * Update the audio component when the volume is changed
 */
function volumeSet(volume) {
  pomoAudio.setVolume(volume);
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('volumeSet', (event) => {
  const volume = event.detail.volume();
  PomoStorage.setVolume(volume);

  volumeSet(volume);
});

/**
 * @function
 * Update the audio component when the sound source is changed
 */
function soundSet(sound) {
  pomoAudio.setSound(sound);
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('soundSet', (event) => {
  const sound = event.detail.sound();
  PomoStorage.setSound(sound);

  soundSet(sound);
});

/**
 * @function
 * Update the necessary components when the calm mode changes
 */
function calmSet(calm) {
  pomoTimer.setCalm(calm);
  PomoTab.setCalm(calm);
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('calmSet', (event) => {
  const calm = event.detail.calm();
  PomoStorage.setCalm(calm);

  calmSet(calm);
});

/**
 * @function
 * Update the necessary components when the dark mode changes
 */
function darkSet(dark) {
  pomoFinish.setDark(dark);
  pomoInfo.setDark(dark);
  pomoSettings.setDark(dark);
  pomoTimer.setDark(dark);

  if (dark) {
    stylesheet.setAttribute('href', './index.css');
  } else {
    stylesheet.setAttribute('href', './index-light.css');
  }
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('darkSet', (event) => {
  const dark = event.detail.dark();
  PomoStorage.setDark(dark);
  darkSet(dark);
});

/**
 * @function
 * Update the necessary components when the accessibility mode changes
 */
function accessibleSet(accessible) {
  pomoFinish.setAccessibility(accessible);
  pomoInfo.setAccessibility(accessible);
  pomoSettings.setAccessibility(accessible);
  pomoTimer.setAccessibility(accessible);

  accessibility = accessible;
}

/**
 * Wire up previous method to the settings value being changed
 */
pomoSettings.addEventListener('accessSet', (event) => {
  const accessible = event.detail.accessible();
  PomoStorage.setAccessibility(accessible);
  accessibleSet(accessible);
});

/* ---------------------------------------------------------------------------------------------- */
/* Accessibility Functions */

/**
 * Disable info, settings, and timer accessibility when finish is opened
 */
pomoFinish.addEventListener('openEvent', () => {
  pomoInfo.disableInfo();
  pomoSettings.setAccessibility(false);
  pomoTimer.disableTimer();
});

/**
 * Enable info, settings, and timer accessibility when finish is closed
 */
pomoFinish.addEventListener('closeEvent', () => {
  pomoInfo.enableInfo();
  pomoSettings.setAccessibility(accessibility);
  pomoTimer.enableTimer();
});

/**
 * Disable finish, settings, and timer accessibility when info is opened
 */
pomoInfo.addEventListener('openEvent', () => {
  pomoFinish.disableFinish();
  pomoSettings.setAccessibility(false);
  pomoTimer.disableTimer();
});

/**
 * Enable finish, settings, and timer accessibility when info is closed
 */
pomoInfo.addEventListener('closeEvent', () => {
  pomoFinish.enableFinish();
  pomoSettings.setAccessibility(accessibility);
  pomoTimer.enableTimer();
});

/**
 * Disable finish, info, and timer accessibility when settings is opened
 */
pomoSettings.addEventListener('openEvent', () => {
  if (pomoSettings.enabled) {
    pomoFinish.disableFinish();
    pomoInfo.disableInfo();
    pomoTimer.disableTimer();
  }
});

/**
 * Enable finish, info, and timer accessibility when settings is closed
 */
pomoSettings.addEventListener('closeEvent', () => {
  if (pomoSettings.enabled) {
    pomoFinish.enableFinish();
    pomoInfo.enableInfo();
    pomoTimer.enableTimer();
  }
});

/**
 * @function
 * Load preferences from storage and update the control and settings to reflect those values
 */
function onload() {
  const calmIn = PomoStorage.getCalm();
  const volumeIn = PomoStorage.getVolume();
  const soundIn = PomoStorage.getSound();
  const darkIn = PomoStorage.getDark();
  const workIn = PomoStorage.getWork();
  const shortIn = PomoStorage.getShortBreak();
  const longIn = PomoStorage.getLongBreak();
  const accessIn = PomoStorage.getAccessibility();
  const modeIn = PomoStorage.getMode();

  const {
    work: workCountIn,
    shortBreak: shortBreakCountIn,
    longBreak: longBreakCountIn,
    interrupts: interruptCountIn,
  } = PomoStorage.getDayCounts();

  // Update settings
  pomoSettings.loadSettings(calmIn, volumeIn, soundIn, darkIn, workIn, shortIn, longIn, accessIn);

  // Update control
  currentMode = modeIn;
  workLength = workIn;
  shortLength = shortIn;
  longLength = longIn;
  workCount = workCountIn;
  shortCount = shortBreakCountIn;
  longCount = longBreakCountIn;
  interruptCount = interruptCountIn;
  accessibility = accessIn;

  // Configure initial ctimer state
  switch (currentMode) {
    case Mode.work:
      pomoTimer.setTimer(workLength, currentMode);
      break;
    case Mode.short:
      pomoTimer.setTimer(shortLength, currentMode);
      break;
    case Mode.long:
      pomoTimer.setTimer(longLength, currentMode);
      break;
    default:
      // Default to work if invalid saved mode
      pomoTimer.setTimer(workLength, currentMode);
      break;
  }

  // Update timer progress as well
  pomoTimer.setProgress(workCount % 4);

  // Run updater methods for the other variables
  volumeSet(volumeIn);
  soundSet(soundIn);
  calmSet(calmIn);
  darkSet(darkIn);
}

/**
 * Run onload method once when page loads
 */
onload();
