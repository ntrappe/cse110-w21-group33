/**
 * @module Init
 */

import PomoAudio from '../components/pomo-audio.js';
import PomoFinish from '../components/pomo-finish/pomo-finish.js';
import PomoInfo from '../components/pomo-info/pomo-info.js';
import PomoSettings from '../components/pomo-settings/pomo-settings.js';
import * as PomoStorage from '../components/pomo-storage.js';
import * as PomoTab from '../components/pomo-tab.js';
import PomoTimer from '../components/pomo-timer/pomo-timer.js';

/**
 * Initialize page styling
 */
const stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = './index.css';
stylesheet.setAttribute('href', './index.css');
document.head.appendChild(stylesheet);

/**
 * Initialize web components
 * Attach to window for method access and Cypress testing
 */
const pomoAudio = new PomoAudio();
pomoAudio.setAttribute('id', 'pomo-audio');
window.pomoAudio = pomoAudio;

const pomoFinish = new PomoFinish();
pomoFinish.setAttribute('id', 'pomo-finish');
window.pomoFinish = pomoFinish;

const pomoInfo = new PomoInfo();
pomoInfo.setAttribute('id', 'pomo-info');
window.pomoInfo = pomoInfo;

const pomoSettings = new PomoSettings();
pomoSettings.setAttribute('id', 'pomo-settings');
window.pomoSettings = pomoSettings;

window.pomoStorage = PomoStorage;

window.pomoTab = PomoTab;

const pomoTimer = new PomoTimer();
pomoTimer.setAttribute('id', 'pomo-timer');
window.pomoTimer = pomoTimer;

/**
 * Add components to their proper locations on the page
 */
const body = document.getElementById('body');
body.appendChild(pomoAudio);

const header = document.getElementById('header');
header.appendChild(pomoSettings);
header.appendChild(pomoInfo);

const main = document.getElementById('main');
main.appendChild(pomoTimer);

const footer = document.getElementById('footer');
footer.appendChild(pomoFinish);
