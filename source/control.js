import PomoAudio from './components/pomo-audio.js';
import PomoFinish from './components/pomo-finish/pomo-finish.js';
import PomoInfo from './components/pomo-info/pomo-info.js';
import PomoSettings from './components/pomo-settings/pomo-settings.js';
import * as PomoStorage from './storage.js';
import * as PomoTab from './components/pomo-tab.js';
import PomoTimer from './components/pomo-timer/pomo-timer.js';

// Initialize page styling
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = './index.css';
stylesheet.setAttribute('href', './index.css');
document.head.appendChild(stylesheet);

// Initialize web components
const pomoAudio = new PomoAudio();
pomoAudio.setAttribute('id', 'pomo-audio');

const pomoFinish = new PomoFinish();
pomoFinish.setAttribute('id', 'pomo-finish');

const pomoInfo = new PomoInfo();
pomoInfo.setAttribute('id', 'pomo-info');

const pomoSettings = new PomoSettings();
pomoSettings.setAttribute('id', 'pomo-settings');

const pomoTimer = new PomoTimer();
pomoTimer.setAttribute('id', 'pomo-timer');

// Attach components to the window for access and Cypress testing
window.pomoAudio = pomoAudio;
window.pomoFinish = pomoFinish;
window.pomoInfo = pomoInfo;
window.pomoSettings = pomoSettings;
window.pomoStorage = PomoStorage;
window.pomoTab = PomoTab;
window.pomoTimer = pomoTimer;

// Add components to their proper locations on the page
const body = document.getElementById('body');
body.appendChild(pomoAudio);

const header = document.getElementById('header');
header.appendChild(pomoSettings);
header.appendChild(pomoInfo);

const main = document.getElementById('main');
main.appendChild(pomoTimer);

const footer = document.getElementById('footer');
footer.appendChild(pomoFinish);

const Mode = {
  work: 'work',
  short: 'short break',
  long: 'long break',
};

let currentMode = '';

let workLength = 1;
let shortLength = 1;
let longLength = 1;

let workCount = 0;
let shortCount = 0;
let longCount = 0;
let interruptCount = 0;

function enableAll() {
  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoSettings.enableSettings();
}

function disableAll() {
  pomoFinish.disableFinish();
  pomoInfo.disableInfo();
  pomoSettings.disableSettings();
}

// PomoTimer Events
pomoTimer.addEventListener('timerStart', () => {
  disableAll();
});

pomoTimer.addEventListener('tick', (event) => {
  PomoTab.setTab(event.detail.timeRemaining(), currentMode);
});

pomoTimer.addEventListener('timerReset', () => {
  if (currentMode === Mode.work) {
    interruptCount += 1;
    PomoStorage.setDayCounts(workCount, shortCount, longCount, interruptCount);
  }

  enableAll();
  PomoTab.defaultTab();
});

pomoTimer.addEventListener('timerFinish', () => {
  switch (currentMode) {
    case Mode.work:
      workCount += 1;
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

// PomoFinish Events
pomoFinish.addEventListener('modalRequest', () => {
  pomoFinish.showModal(workCount, shortCount, longCount, interruptCount);
});

// PomoSettings Events
function workSet(work) {
  if (currentMode === Mode.work) {
    pomoTimer.setTimer(work, currentMode);
  }
}

pomoSettings.addEventListener('workSet', (event) => {
  const work = event.detail.work();
  PomoStorage.setWork(work);

  workSet(work);
});

function shortBreakSet(shortBreak) {
  if (currentMode === Mode.short) {
    pomoTimer.setTimer(shortBreak, currentMode);
  }
}

pomoSettings.addEventListener('shortBreakSet', (event) => {
  const shortBreak = event.detail.shortBreak();
  PomoStorage.setShortBreak(shortBreak);

  shortBreakSet(shortBreak);
});

function longBreakSet(longBreak) {
  if (currentMode === Mode.long) {
    pomoTimer.setTimer(longBreak, currentMode);
  }
}

pomoSettings.addEventListener('longBreakSet', (event) => {
  const longBreak = event.detail.longBreak();
  PomoStorage.setLongBreak(longBreak);

  longBreakSet(longBreak);
});

function volumeSet(volume) {
  pomoAudio.setVolume(volume);
}

pomoSettings.addEventListener('volumeSet', (event) => {
  const volume = event.detail.volume();
  PomoStorage.setVolume(volume);

  volumeSet(volume);
});

function soundSet(sound) {
  pomoAudio.setSound(sound);
}

pomoSettings.addEventListener('soundSet', (event) => {
  const sound = event.detail.sound();
  PomoStorage.setSound(sound);

  soundSet(sound);
});

function calmSet(calm) {
  pomoTimer.setCalm(calm);
  PomoTab.setCalm(calm);
}

pomoSettings.addEventListener('calmSet', (event) => {
  const calm = event.detail.calm();
  PomoStorage.setCalm(calm);

  calmSet(calm);
});

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

pomoSettings.addEventListener('darkSet', (event) => {
  const dark = event.detail.dark();
  PomoStorage.setDark(dark);
  darkSet(dark);
});

function accessibleSet(accessible) {
  pomoFinish.setAccessibility(accessible);
  pomoInfo.setAccessibility(accessible);
  pomoSettings.setAccessibility(accessible);
  pomoTimer.setAccessibility(accessible);
}

pomoSettings.addEventListener('accessSet', (event) => {
  const accessible = event.detail.accessible();
  PomoStorage.setAccessibility(accessible);
  accessibleSet(accessible);
});

// Accessibility events
pomoInfo.addEventListener('openEvent', () => {
  pomoFinish.disableFinish();
  pomoSettings.disableSettings();
  pomoTimer.disableTimer();
});

pomoInfo.addEventListener('closeEvent', () => {
  pomoFinish.enableFinish();
  pomoSettings.enableSettings();
  pomoTimer.enableTimer();
});

pomoSettings.addEventListener('openEvent', () => {
  pomoFinish.disableFinish();
  pomoInfo.disableInfo();
  pomoTimer.disableTimer();
});

pomoSettings.addEventListener('closeEvent', () => {
  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoTimer.enableTimer();
});

function onload() {
  // Load user preferences from storage
  const calmIn = PomoStorage.getCalm();
  const volumeIn = PomoStorage.getVolume();
  const soundIn = PomoStorage.getSound();
  const darkIn = PomoStorage.getDark();
  const workIn = PomoStorage.getWork();
  const shortIn = PomoStorage.getShortBreak();
  const longIn = PomoStorage.getLongBreak();
  const accessIn = PomoStorage.getAccessibility();
  const modeIn = PomoStorage.getMode();

  // Update settings to reflect current values
  pomoSettings.loadSettings(calmIn, volumeIn, soundIn, darkIn, workIn, shortIn, longIn, accessIn);

  const {
    work: workCountIn,
    shortBreak: shortBreakCountIn,
    longBreak: longBreakCountIn,
    interrupts: interruptCountIn,
  } = PomoStorage.getDayCounts();

  // Update control variables
  currentMode = modeIn;

  workLength = workIn;
  shortLength = shortIn;
  longLength = longIn;

  workCount = workCountIn;
  shortCount = shortBreakCountIn;
  longCount = longBreakCountIn;
  interruptCount = interruptCountIn;

  // Configure initial component states
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
      pomoTimer.setTimer(workLength, currentMode);
      break;
  }

  pomoTimer.setProgress(workCount % 4);

  volumeSet(volumeIn);
  soundSet(soundIn);
  calmSet(calmIn);
  darkSet(darkIn);
}

onload();
