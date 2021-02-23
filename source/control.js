import { PomoFinish } from './components/pomo-finish.js';
import { PomoInfo } from './components/pomo-info.js';
import { PomoSettings } from './components/pomo-settings.js';
import { PomoTimer } from './components/pomo-timer.js';
import { ToggleSwitch } from './components/pomo-toggle.js';

const pomoFinish = new PomoFinish();
const pomoInfo = new PomoInfo();
const pomoSettings = new PomoSettings();
const pomoTimer = new PomoTimer();
const pomoToggle = new ToggleSwitch();

const header = document.getElementById('header');
header.appendChild(pomoSettings);
header.appendChild(pomoInfo);
header.appendChild(pomoToggle);

const main = document.getElementById('main');
main.appendChild(pomoTimer);

const footer = document.getElementById('footer');
footer.appendChild(pomoFinish);
