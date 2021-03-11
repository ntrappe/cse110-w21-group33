import PomoFinish from './components/pomo-finish.js';
import PomoInfo from './components/pomo-info.js';
import PomoSettings from './components/pomo-settings.js';
import PomoTimer from './components/pomo-timer.js';
import * as PomoTab from './components/pomo-tab.js';

// Initialize web components
const pomoFinish = new PomoFinish();
pomoFinish.setAttribute('id', 'pomo-finish');

const pomoInfo = new PomoInfo();
pomoInfo.setAttribute('id', 'pomo-info');

const pomoSettings = new PomoSettings();
pomoSettings.setAttribute('id', 'pomo-settings');

const pomoTimer = new PomoTimer();
pomoTimer.setAttribute('id', 'pomo-timer');

// Attach elements to the window for Cypress testing
window.pomoFinish = pomoFinish;
window.pomoInfo = pomoInfo;
window.pomoSettings = pomoSettings;
window.pomoTimer = pomoTimer;
window.pomoTab = PomoTab;

// Add components to their proper locations on the page
const header = document.getElementById('header');
header.appendChild(pomoSettings);
header.appendChild(pomoInfo);

const main = document.getElementById('main');
main.appendChild(pomoTimer);

const footer = document.getElementById('footer');
footer.appendChild(pomoFinish);
//pomoFinish.showModal(2,1,0,60,0);
