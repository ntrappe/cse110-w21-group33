import PomoAudio from './components/pomo-audio.js';
import PomoFinish from './components/pomo-finish.js';
import PomoInfo from './components/pomo-info.js';
import PomoSettings from './components/pomo-settings.js';
import PomoTimer from './components/pomo-timer.js';
import * as PomoTab from './components/pomo-tab.js';

const MIN_WIDTH = 450;
const MIN_HEIGHT = 700;
const MIN_HEIGHT_STOP_CHANGE = 500;

const X_OFFSET_FACTOR = 6;

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

/**
 * For resizing elements depends on the window size
 */
const resizeElements = () => {
  /* Resize timer */
  let inputText = '';

  if (window.innerHeight < MIN_HEIGHT) {
    inputText = inputText
      .concat('translateY(')
      .concat(
        (window.innerHeight < MIN_HEIGHT_STOP_CHANGE
          ? -100
          : (window.innerHeight - MIN_HEIGHT) / 2
        ).toString()
      )
      .concat('px)');
  }

  if (window.innerWidth < MIN_WIDTH) {
    inputText = inputText
      .concat(' scale(')
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') ');
  }

  pomoTimer.changeTransform(inputText);

  /* Resize reset of the elements */
  if (window.innerWidth < MIN_WIDTH) {
    pomoFinish.changeTransform(
      'scale('
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') translateX(')
      .concat(
        (
          (MIN_WIDTH - window.innerWidth) /
          window.innerWidth * MIN_WIDTH / 
          X_OFFSET_FACTOR
        ).toString()
      )
      .concat('px)')
    );
    pomoInfo.changeTransform(
      'scale('
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') translateX(')
      .concat(
        (
          (MIN_WIDTH - window.innerWidth) / 
          window.innerWidth * MIN_WIDTH / 
          X_OFFSET_FACTOR
        ).toString()
      )
      .concat('px)')
    );
    pomoSettings.changeTransform('scale('
      .concat((window.innerWidth / MIN_WIDTH).toString())
      .concat(') translateX(')
      .concat(  
        (
          (window.innerWidth - MIN_WIDTH ) / 
          window.innerWidth * MIN_WIDTH / 
          X_OFFSET_FACTOR
        ).toString()
      )
      .concat('px)'), 
      'scale('.concat( (window.innerWidth / MIN_WIDTH).toString())
      .concat(') translateX(')
      .concat(
        (
          (window.innerWidth - MIN_WIDTH ) / 
          window.innerWidth * MIN_WIDTH / 
          X_OFFSET_FACTOR
        ).toString()
      )
      .concat('px)'),
      (MIN_WIDTH - window.innerWidth) / 5
    );
  } else {
    pomoFinish.changeTransform(null);
    pomoInfo.changeTransform(null);
    pomoSettings.changeTransform(null, null, null);
  }
};

window.addEventListener('resize', resizeElements);
window.addEventListener('load', resizeElements);
