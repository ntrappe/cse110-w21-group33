import PomoFinish from './components/pomo-finish';
import PomoInfo from './components/pomo-info';
import PomoSettings from './components/pomo-settings';
import PomoTimer from './components/pomo-timer';

const pomoFinish = new PomoFinish();
const pomoInfo = new PomoInfo();
const pomoSettings = new PomoSettings();
const pomoTimer = new PomoTimer();

const header = document.getElementById('header');
header.appendChild(pomoSettings);
header.appendChild(pomoInfo);

const main = document.getElementById('main');
main.appendChild(pomoTimer);

const footer = document.getElementById('footer');
footer.appendChild(pomoFinish);
