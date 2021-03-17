import PomoAudio from './components/pomo-audio.js';
import PomoFinish from './components/pomo-finish.js';
import PomoInfo from './components/pomo-info.js';
import PomoSettings from './components/pomo-settings.js';
import PomoTimer from './components/pomo-timer.js';
import * as PomoTab from './components/pomo-tab.js';
import * as PomoStorage from './storage.js';

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
