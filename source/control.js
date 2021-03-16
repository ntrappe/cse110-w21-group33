import PomoAudio from './components/pomo-audio.js';
import PomoFinish from './components/pomo-finish.js';
import PomoInfo from './components/pomo-info.js';
import PomoSettings from './components/pomo-settings.js';
import PomoTimer from './components/pomo-timer.js';
import * as PomoTab from './components/pomo-tab.js';

// Initialize page styling
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = './index.css';
document.head.appendChild(stylesheet);

// const stylesheetLight = document.createElement('link');
// stylesheetLight.rel = 'stylesheet';
// stylesheetLight.href = './index-light.css';
// document.head.appendChild(stylesheetLight);

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

const pomoLength = 1;
const shortLength = 1;
const longLength = 1;

let pomoCount = 0;
let shortCount = 0;
let longCount = 0;

function onload() {
  currentMode = 'work';

  pomoTimer.setTimer(pomoLength, 'work');
  pomoSettings.enableSettings();
  pomoInfo.enableInfo();
  PomoTab.defaultTab();
}

function onStart() {
  pomoSettings.disableSettings();
  pomoInfo.disableInfo();
}
pomoTimer.addEventListener('timerStart', onStart);

function onTick(e) {
  PomoTab.setTab(e.detail.timeRemaining(), currentMode);
}
pomoTimer.addEventListener('tick', onTick);

function onReset() {
  pomoSettings.enableSettings();
  pomoInfo.enableInfo();
  PomoTab.defaultTab();
}
pomoTimer.addEventListener('timerReset', onReset);

function onFinish() {
  switch (currentMode) {
    case 'work':
      pomoCount += 1;

      if (pomoCount !== 0 && pomoCount % 4 === 0) {
        pomoTimer.setProgress(4);
        currentMode = 'long break';
        pomoTimer.setTimer(longLength, 'long break');
      } else {
        pomoTimer.setProgress(pomoCount % 4);
        currentMode = 'short break';
        pomoTimer.setTimer(shortLength, 'short break');
      }
      break;

    case 'short break':
      shortCount += 1;
      currentMode = 'work';
      pomoTimer.setTimer(pomoLength, 'work');
      break;

    case 'long break':
      pomoTimer.setProgress(0);
      longCount += 1;
      currentMode = 'work';
      pomoTimer.setTimer(pomoLength, 'work');
      break;

    default:
      break;
  }

  pomoSettings.enableSettings();
  pomoInfo.enableInfo();
}
pomoTimer.addEventListener('timerFinish', onFinish);

function onModalRequest() {
  pomoFinish.showModal();
}
pomoFinish.addEventListener('modalRequest', onModalRequest);

onload();
