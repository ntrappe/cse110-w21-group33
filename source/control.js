/**
 * @module Control
 */

import PomoAudio from './components/pomo-audio.js';
import PomoFinish from './components/pomo-finish/pomo-finish.js';
import PomoInfo from './components/pomo-info/pomo-info.js';
import PomoSettings from './components/pomo-settings/pomo-settings.js';
import PomoTimer from './components/pomo-timer/pomo-timer.js';
import * as PomoTab from './components/pomo-tab.js';
import * as PomoStorage from './storage.js';

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

// Attach elements to the window for Cypress testing
window.pomoAudio = pomoAudio;
window.pomoFinish = pomoFinish;
window.pomoInfo = pomoInfo;
window.pomoSettings = pomoSettings;
window.pomoTimer = pomoTimer;
window.pomoTab = PomoTab;
window.pomoStorage = PomoStorage;

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

let currentMode = '';

let workLength = 1;
let shortLength = 1;
let longLength = 1;

let workCount = 0;
let shortBreakCount = 0;
let longBreakCount = 0;
let interruptCount = 0;

function onload() {
  // Load user preferences from storage
  const calmIn = PomoStorage.getCalm();
  const volumeIn = PomoStorage.getVolume();
  const soundIn = PomoStorage.getSound();
  const darkIn = PomoStorage.getDark();
  const workIn = PomoStorage.getWork();
  const shortBreakIn = PomoStorage.getShortBreak();
  const longBreakIn = PomoStorage.getLongBreak();
  const accessIn = PomoStorage.getAccessibility();

  // Update settings to reflect current values
  pomoSettings.loadSettings(
    calmIn,
    volumeIn,
    soundIn,
    darkIn,
    workIn,
    shortBreakIn,
    longBreakIn,
    accessIn
  );

  const {
    work: workCountIn,
    shortBreak: shortBreakCountIn,
    longBreak: longBreakCountIn,
    interrupts: interruptCountIn,
  } = PomoStorage.getDayCounts();

  // Update control variables
  workLength = workIn;
  shortLength = shortBreakIn;
  longLength = longBreakIn;

  workCount = workCountIn;
  shortBreakCount = shortBreakCountIn;
  longBreakCount = longBreakCountIn;
  interruptCount = interruptCountIn;

  currentMode = 'work';

  pomoAudio.setSound(soundIn);
  pomoAudio.setVolume(volumeIn);

  // Configure initial component state
  pomoTimer.setTimer(workLength, currentMode);

  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoSettings.enableSettings();
  PomoTab.defaultTab();
}

function onStart() {
  pomoFinish.enableFinish();
  pomoInfo.disableInfo();
  pomoSettings.disableSettings();
}
pomoTimer.addEventListener('timerStart', onStart);

function onTick(e) {
  PomoTab.setTab(e.detail.timeRemaining(), currentMode);
}
pomoTimer.addEventListener('tick', onTick);

function onReset() {
  interruptCount += 1;
  PomoStorage.setDayCounts(workCount, shortBreakCount, longBreakCount, interruptCount);

  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoSettings.enableSettings();
  PomoTab.defaultTab();
}
pomoTimer.addEventListener('timerReset', onReset);

function onFinish() {
  switch (currentMode) {
    case 'work':
      workCount += 1;
      if (workCount !== 0 && workCount % 4 === 0) {
        pomoTimer.setProgress(4);
        currentMode = 'long break';
        pomoTimer.setTimer(longLength, 'long break');
      } else {
        pomoTimer.setProgress(workCount % 4);
        currentMode = 'short break';
        pomoTimer.setTimer(shortLength, 'short break');
      }
      break;

    case 'short break':
      shortBreakCount += 1;
      currentMode = 'work';
      pomoTimer.setTimer(workLength, 'work');
      break;

    case 'long break':
      pomoTimer.setProgress(0);
      longBreakCount += 1;
      currentMode = 'work';
      pomoTimer.setTimer(workLength, 'work');
      break;

    default:
      break;
  }

  PomoStorage.setDayCounts(workCount, shortBreakCount, longBreakCount, interruptCount);

  pomoAudio.playSound();

  pomoFinish.enableFinish();
  pomoInfo.enableInfo();
  pomoSettings.enableSettings();
}
pomoTimer.addEventListener('timerFinish', onFinish);

function onModalRequest() {
  pomoFinish.showModal(workCount, shortBreakCount, longBreakCount, interruptCount);
}
pomoFinish.addEventListener('modalRequest', onModalRequest);

function workSet(event) {
  const work = event.detail.work();
  PomoStorage.setWork(work);

  if (currentMode === 'work') {
    pomoTimer.setTimer(work, currentMode);
  }
}
pomoSettings.addEventListener('workSet', workSet);

function shortBreakSet(event) {
  const shortBreak = event.detail.shortBreak();
  PomoStorage.setShortBreak(shortBreak);

  if (currentMode === 'short break') {
    pomoTimer.setTimer(shortBreak, currentMode);
  }
}
pomoSettings.addEventListener('shortBreakSet', shortBreakSet);

function longBreakSet(event) {
  const longBreak = event.detail.longBreak();
  PomoStorage.setLongBreak(longBreak);

  if (currentMode === 'long break') {
    pomoTimer.setTimer(longBreak, currentMode);
  }
}
pomoSettings.addEventListener('longBreakSet', longBreakSet);

function volumeSet(event) {
  const volume = event.detail.volume();
  PomoStorage.setVolume(volume);

  pomoAudio.setVolume(volume);
}
pomoSettings.addEventListener('volumeSet', volumeSet);

function soundSet(event) {
  const sound = event.detail.sound();
  PomoStorage.setSound(sound);

  pomoAudio.setSound(sound);
}
pomoSettings.addEventListener('soundSet', soundSet);

function calmSet(event) {
  const calm = event.detail.calm();
  PomoStorage.setCalm(calm);

  pomoTimer.setCalm(calm);
  PomoTab.setCalm(calm);
}
pomoSettings.addEventListener('calmSet', calmSet);

function darkSet(event) {
  const dark = event.detail.dark();
  PomoStorage.setDark(dark);

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
pomoSettings.addEventListener('darkSet', darkSet);

function accessSet(event) {
  const accessible = event.detail.accessible();
  PomoStorage.setAccessibility(accessible);
}
pomoSettings.addEventListener('accessSet', accessSet);

onload();

pomoFinish.showModal(5, 10, 15, 20);
