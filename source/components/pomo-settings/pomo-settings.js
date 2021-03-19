/**
 * @module PomoSettings
 */

import ToggleSwitch from '../pomo-toggle/pomo-toggle.js';

const DEFAULT_WORK_TIME = 25;
const DEFAULT_SHORT_BREAK_TIME = 5;
const DEFAULT_LONG_BREAK_TIME = 10;
const DEFAULT_VOLUME = 50;
const DEFAULT_SOUND = './assets/audio/bike_chime.mp3';
const DEFAULT_CALM_SETTING = false;
const DEFAULT_DARK_SETTING = true;
const DEFAULT_ACC_SETTING = true;
const MIN_MINUTES = '1';
const MAX_MINUTES = '60';
const MIN_VOLUME = '0';
const MAX_VOLUME = '100';
const RESET_LENGTH = 200;

class PomoSettings extends HTMLElement {
  constructor() {
    super();

    this.openEvent = new CustomEvent('openEvent', {
      bubbles: true,
      composed: true,
    });

    this.closeEvent = new CustomEvent('closeEvent', {
      bubbles: true,
      composed: true,
    });

    /* Temp store left offset to prepare for openning */
    let leftOffsetTemp = null;

    // Event variables
    this.work = DEFAULT_WORK_TIME;
    this.shortBreak = DEFAULT_SHORT_BREAK_TIME;
    this.longBreak = DEFAULT_LONG_BREAK_TIME;
    this.volume = DEFAULT_VOLUME;
    this.sound = DEFAULT_SOUND;
    this.calm = DEFAULT_CALM_SETTING;
    this.dark = DEFAULT_DARK_SETTING;
    this.accessible = DEFAULT_ACC_SETTING;

    const shadow = this.attachShadow({ mode: 'open' });

    // Lightbox background
    const settingsModal = document.createElement('div');
    settingsModal.setAttribute('id', 'settings-modal');

    // Connect sidebar to CSS
    const styles = document.createElement('link');
    styles.setAttribute('id', 'settings-style');
    styles.setAttribute('rel', 'stylesheet');

    // Settings panel
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'settings');

    const settingsTitle = document.createElement('h1');
    settingsTitle.setAttribute('id', 'settings-title');
    settingsTitle.textContent = 'Settings';

    // Button to open settings sidebar
    const settingsButton = document.createElement('button');
    settingsButton.setAttribute('id', 'settings-button');

    const settingsIcon = document.createElement('img');
    settingsIcon.setAttribute('id', 'settings-button-icon');
    // settingsIcon.setAttribute('src', './assets/gear_settings_light.png');
    settingsIcon.textContent = 'Settings';

    settingsButton.appendChild(settingsIcon);

    // update css for button and sidebar if dark vs not mode
    if (this.dark) {
      styles.setAttribute('href', './components/pomo-settings/pomo-settings.css');
      settingsIcon.setAttribute('src', './assets/gear_settings.png');
    } else {
      styles.setAttribute('href', './components/pomo-settings/pomo-settings-light.css');
      settingsIcon.setAttribute('src', './assets/gear_settings_light.png');
    }

    // Button to close sidebar
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'settings-close-button');

    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('id', 'settings-close-button-icon');
    closeIcon.setAttribute('src', './assets/x.svg');

    const pomoLengthLabel = document.createElement('label');
    pomoLengthLabel.textContent = 'Time (minutes)';
    pomoLengthLabel.setAttribute('id', 'pomo-length-label');

    // Edit work, short break, and long break lengths
    const timerSection = document.createElement('div');
    timerSection.setAttribute('id', 'timer-section');

    // Input field for work customization
    const workSection = document.createElement('div');
    workSection.setAttribute('id', 'work-section');

    const workLabel = document.createElement('label');
    workLabel.setAttribute('id', 'work-sec-label');
    workLabel.textContent = 'Work';
    workLabel.htmlFor = 'work-number';

    const workNumber = document.createElement('input');
    workNumber.setAttribute('id', 'work-number');
    workNumber.setAttribute('type', 'number');
    workNumber.setAttribute('value', this.work);
    workNumber.setAttribute('min', MIN_MINUTES);
    workNumber.setAttribute('max', MAX_MINUTES);
    workNumber.setAttribute('step', '1');

    // Input field for short break customization
    const shortSection = document.createElement('div');
    shortSection.setAttribute('id', 'short-section');

    const shortBreakLabel = document.createElement('label');
    shortBreakLabel.setAttribute('id', 'short-sec-label');
    shortBreakLabel.textContent = 'Short Break';
    shortBreakLabel.htmlFor = 'short-break-number';

    const shortBreakNumber = document.createElement('input');
    shortBreakNumber.setAttribute('id', 'short-break-number');
    shortBreakNumber.setAttribute('type', 'number');
    shortBreakNumber.setAttribute('value', this.shortBreak);
    shortBreakNumber.setAttribute('min', MIN_MINUTES);
    shortBreakNumber.setAttribute('max', MAX_MINUTES);
    shortBreakNumber.setAttribute('step', '1');

    // Input field for long break customization
    const longSection = document.createElement('div');
    longSection.setAttribute('id', 'long-section');

    const longBreakLabel = document.createElement('label');
    longBreakLabel.setAttribute('id', 'long-sec-label');
    longBreakLabel.textContent = 'Long Break';
    longBreakLabel.htmlFor = 'long-break-number';

    const longBreakNumber = document.createElement('input');
    longBreakNumber.setAttribute('id', 'long-break-number');
    longBreakNumber.setAttribute('type', 'number');
    longBreakNumber.setAttribute('value', this.longBreak);
    longBreakNumber.setAttribute('min', MIN_MINUTES);
    longBreakNumber.setAttribute('max', MAX_MINUTES);
    longBreakNumber.setAttribute('step', '1');

    const displayLabel = document.createElement('label');
    displayLabel.setAttribute('id', 'display-label');
    displayLabel.textContent = 'Display';

    const displaySection = document.createElement('div');
    displaySection.setAttribute('id', 'display-section');

    // Toggle switch to enable calm mode
    const calmSection = document.createElement('div');
    calmSection.setAttribute('id', 'calm-section');

    const calmLabel = document.createElement('label');
    calmLabel.setAttribute('id', 'calm-label');
    calmLabel.textContent = 'Calm Mode';
    calmLabel.htmlFor = 'calm-switch';
    const calmSwitch = new ToggleSwitch('calm', 'busy');
    calmSwitch.setDark(this.dark);
    calmSwitch.setOff();
    calmSwitch.setAttribute('id', 'calm-switch');

    // Toggle switch to enable dark mode
    const darkSection = document.createElement('div');
    darkSection.setAttribute('id', 'dark-section');

    const darkLabel = document.createElement('label');
    darkLabel.setAttribute('id', 'dark-label');
    darkLabel.textContent = 'Dark Mode';
    darkLabel.htmlFor = 'dark-switch';
    const darkSwitch = new ToggleSwitch('dark', 'light');
    darkSwitch.setDark(this.dark);
    darkSwitch.setOff();
    darkSwitch.setAttribute('id', 'dark-switch');

    const audioLabel = document.createElement('label');
    audioLabel.setAttribute('id', 'audio-label');
    audioLabel.textContent = 'Audio';

    const audioSection = document.createElement('div');
    audioSection.setAttribute('id', 'audio-section');

    // Dropdown menu to change audio notification noise
    const soundSection = document.createElement('div');
    soundSection.setAttribute('id', 'sound-section');

    const soundLabel = document.createElement('label');
    soundLabel.setAttribute('id', 'sound-label');
    soundLabel.textContent = 'Sound';
    soundLabel.htmlFor = 'sound-select';

    const soundSelect = document.createElement('select');
    soundSelect.setAttribute('id', 'sound-select');

    // List of names of audio files (file name should be spaced with underscores)
    const soundList = [
      {
        name: 'Bike Chime',
        file: './assets/audio/bike_chime.mp3',
      },
      {
        name: 'Pleasant Ding',
        file: './assets/audio/pleasant_ding.mp3',
      },
      {
        name: 'Small Bell',
        file: './assets/audio/small_bell.mp3',
      },
    ];

    // Create option in dropdown menu for each audio file
    for (let i = 0; i < soundList.length; i += 1) {
      const sound = soundList[i];

      const option = soundSelect.appendChild(document.createElement('option'));
      option.value = sound.file;
      option.text = sound.name;
    }
    soundSelect.value = this.sound;

    // Input slider and number to change volume
    const volumeLabel = document.createElement('label');
    volumeLabel.setAttribute('id', 'volume-label');
    volumeLabel.textContent = 'Volume';
    volumeLabel.htmlFor = 'volume-number';

    const volumeSection = document.createElement('div');
    volumeSection.setAttribute('id', 'volume-section');

    const volumeSlide = document.createElement('input');
    volumeSlide.setAttribute('type', 'range');
    volumeSlide.setAttribute('id', 'volume-slide');
    volumeSlide.setAttribute('min', MIN_VOLUME);
    volumeSlide.setAttribute('max', MAX_VOLUME);
    volumeSlide.setAttribute('value', this.volume);

    const volumeNumber = document.createElement('input');
    volumeNumber.setAttribute('type', 'number');
    volumeNumber.setAttribute('id', 'volume-number');
    volumeNumber.setAttribute('min', MIN_VOLUME);
    volumeNumber.setAttribute('max', MAX_VOLUME);
    volumeNumber.setAttribute('value', this.volume);

    // Accessibility Section
    const accessibilityLabel = document.createElement('label');
    accessibilityLabel.setAttribute('id', 'accessibility-label');
    accessibilityLabel.textContent = 'Accessibility';

    const accessibilitySection = document.createElement('div');
    accessibilitySection.setAttribute('id', 'accessibility-section');

    const accessSection = document.createElement('div');
    accessSection.setAttribute('id', 'access-section');

    const accessLabel = document.createElement('label');
    accessLabel.setAttribute('id', 'access-label');
    accessLabel.textContent = 'Keyboard Shortcuts';
    accessLabel.htmlFor = 'access-switch';
    const accessSwitch = new ToggleSwitch('accessible', 'inaccessible');
    accessSwitch.setDark(this.dark);
    accessSwitch.setOn();
    accessSwitch.setAttribute('id', 'access-switch');

    // Attach elements to shadow DOM
    shadow.appendChild(settingsModal);
    shadow.appendChild(styles);
    shadow.appendChild(settingsButton);
    shadow.appendChild(sideBar);

    sideBar.appendChild(closeButton);
    sideBar.appendChild(settingsTitle);

    sideBar.appendChild(pomoLengthLabel);
    sideBar.appendChild(timerSection);

    sideBar.appendChild(displayLabel);
    sideBar.appendChild(displaySection);

    sideBar.appendChild(audioLabel);
    sideBar.appendChild(audioSection);

    sideBar.appendChild(accessibilityLabel);
    sideBar.appendChild(accessibilitySection);

    closeButton.appendChild(closeIcon);

    timerSection.appendChild(workSection);
    timerSection.appendChild(shortSection);
    timerSection.appendChild(longSection);

    workSection.appendChild(workLabel);
    workSection.appendChild(workNumber);
    shortSection.appendChild(shortBreakLabel);
    shortSection.appendChild(shortBreakNumber);
    longSection.appendChild(longBreakLabel);
    longSection.appendChild(longBreakNumber);

    displaySection.appendChild(calmSection);
    displaySection.appendChild(darkSection);

    calmSection.appendChild(calmLabel);
    calmSection.appendChild(calmSwitch);
    darkSection.appendChild(darkLabel);
    darkSection.appendChild(darkSwitch);

    audioSection.appendChild(soundSection);
    audioSection.appendChild(volumeSection);

    soundSection.appendChild(soundLabel);
    soundSection.appendChild(soundSelect);

    volumeSection.appendChild(volumeLabel);
    volumeSection.appendChild(volumeSlide);
    volumeSection.appendChild(volumeNumber);

    accessibilitySection.appendChild(accessSection);
    accessSection.appendChild(accessLabel);
    accessSection.appendChild(accessSwitch);

    /* Events */
    this.workSetEvent = new CustomEvent('workSet', {
      bubbles: true,
      composed: true,
      detail: { work: () => this.work },
    });

    this.shortBreakSetEvent = new CustomEvent('shortBreakSet', {
      bubbles: true,
      composed: true,
      detail: { shortBreak: () => this.shortBreak },
    });

    this.longBreakSetEvent = new CustomEvent('longBreakSet', {
      bubbles: true,
      composed: true,
      detail: { longBreak: () => this.longBreak },
    });

    this.volumeSetEvent = new CustomEvent('volumeSet', {
      bubbles: true,
      composed: true,
      detail: { volume: () => this.volume },
    });

    this.soundSetEvent = new CustomEvent('soundSet', {
      bubbles: true,
      composed: true,
      detail: { sound: () => this.sound },
    });

    this.calmSetEvent = new CustomEvent('calmSet', {
      bubbles: true,
      composed: true,
      detail: { calm: () => this.calm },
    });

    this.darkSetEvent = new CustomEvent('darkSet', {
      bubbles: true,
      composed: true,
      detail: { dark: () => this.dark },
    });

    this.accessSetEvent = new CustomEvent('accessSet', {
      bubbles: true,
      composed: true,
      detail: { accessible: () => this.accessible },
    });

    /**
     * Opens the sidebar when clicking open button
     */
    settingsButton.onclick = () => {
      sideBar.setAttribute('class', 'open');
      sideBar.style.left = leftOffsetTemp;
      settingsModal.style.display = 'block';
      shadow.dispatchEvent(this.openEvent);
    };

    /**
     * Closes the sidebar when clicking close button
     */
    closeButton.onclick = () => {
      sideBar.setAttribute('class', 'close');
      sideBar.style.left = null;
      settingsModal.style.display = 'none';
      shadow.dispatchEvent(this.closeEvent);
    };

    /**
     * Closes the sidebar when clicking outside of sidebar
     * @param {Object} e contains data of what is being clicked on website
     */
    settingsModal.onclick = () => {
      sideBar.setAttribute('class', 'close');
      sideBar.style.left = null;
      settingsModal.style.display = 'none';
      shadow.dispatchEvent(this.closeEvent);
    };

    /**
     * Passes customized work minutes to event listener
     */
    workNumber.onchange = () => {
      let workMin = Math.round(Number(workNumber.value));
      if (workMin < 1) {
        workMin = 1;
      }
      workNumber.value = workMin;
      this.work = workMin;
      shadow.dispatchEvent(this.workSetEvent);
    };

    /**
     * Ensures the user cannot put invalid inputs
     */
    workNumber.oninput = () => {
      if (!workNumber.validity.valid) {
        // Turn textbox border red temporarily
        workNumber.classList.add('invalid');

        // After waiting, turn textbox border back to normal and round invalid input
        setTimeout(() => {
          workNumber.classList.remove('invalid');
          workNumber.value = workNumber.value <= 1 ? workNumber.min : workNumber.max;
        }, RESET_LENGTH);
      }
    };

    /**
     * Passes customized short break minutes to event listener
     */
    shortBreakNumber.onchange = () => {
      let shortBreakMin = Math.round(Number(shortBreakNumber.value));
      if (shortBreakMin < 1) {
        shortBreakMin = 1;
      }
      shortBreakNumber.value = shortBreakMin;
      this.shortBreak = shortBreakMin;
      shadow.dispatchEvent(this.shortBreakSetEvent);
    };

    /**
     * Ensures the user cannot put invalid inputs
     */
    shortBreakNumber.oninput = () => {
      if (!shortBreakNumber.validity.valid) {
        // Turn textbox border red temporarily
        shortBreakNumber.classList.add('invalid');

        // After waiting, turn textbox border back to normal and round invalid input
        setTimeout(() => {
          shortBreakNumber.classList.remove('invalid');
          shortBreakNumber.value =
            shortBreakNumber.value <= 1 ? shortBreakNumber.min : shortBreakNumber.max;
        }, RESET_LENGTH);
      }
    };

    /**
     * Passes customized long break minutes to event listener
     */
    longBreakNumber.onchange = () => {
      let longBreakMin = Math.round(Number(longBreakNumber.value));
      if (longBreakMin < 1) {
        longBreakMin = 1;
      }
      longBreakNumber.value = longBreakMin;
      this.longBreak = longBreakMin;
      shadow.dispatchEvent(this.longBreakSetEvent);
    };

    /**
     * Ensures the user cannot put invalid inputs
     */
    longBreakNumber.oninput = () => {
      if (!longBreakNumber.validity.valid) {
        // Turn textbox border red temporarily
        longBreakNumber.classList.add('invalid');

        // After waiting, turn textbox border back to normal and round invalid input
        setTimeout(() => {
          longBreakNumber.classList.remove('invalid');
          longBreakNumber.value =
            longBreakNumber.value <= 1 ? longBreakNumber.min : longBreakNumber.max;
        }, RESET_LENGTH);
      }
    };

    /**
     * Passes customized volume from slider to event listener
     */
    volumeSlide.onchange = () => {
      this.volumeSet(Number(volumeSlide.value));
    };

    /**
     * Passes customized volume from input to event listener
     */
    volumeNumber.onchange = () => {
      this.volumeSet(Number(volumeNumber.value));
    };

    /**
     * Ensures the user cannot put invalid inputs
     */
    volumeNumber.oninput = () => {
      if (!volumeNumber.validity.valid) {
        // Turn textbox border red temporarily
        volumeNumber.classList.add('invalid');

        // After waiting, turn textbox border back to normal and round invalid input
        setTimeout(() => {
          volumeNumber.classList.remove('invalid');
          volumeNumber.value = volumeNumber.value <= 0 ? volumeNumber.min : volumeNumber.max;
        }, RESET_LENGTH);
      }
    };

    /**
     * Have volumeNumber input show the same value as volumeSlide
     */
    volumeSlide.oninput = () => {
      volumeNumber.value = volumeSlide.value;
    };

    /**
     * Coordinate slider and input with each other, sets volume variable,
     * and plays audio so the user can test volume
     * @param {Number} volume volume of audio
     */
    this.volumeSet = (volume) => {
      const vol = Math.round(volume);
      volumeSlide.value = vol;
      volumeNumber.value = vol;
      this.volume = vol;
      shadow.dispatchEvent(this.volumeSetEvent);
    };

    /**
     * Sets and passes sound variable to control event listener, and plays
     * audio so that the user can test audio sound
     */
    soundSelect.onchange = () => {
      this.sound = soundSelect.value;
      shadow.dispatchEvent(this.soundSetEvent);
    };

    /**
     * Listens for toggleSwitchEvent to set calm and dispatch calmSetEvent
     */
    calmSwitch.addEventListener('toggleSwitch', (e) => {
      this.calm = e.detail.toggle();
      shadow.dispatchEvent(this.calmSetEvent);
    });

    /**
     * Listens for toggleSwitchEvent to set dark and dispatch darkSetEvent
     */
    darkSwitch.addEventListener('toggleSwitch', (e) => {
      this.dark = e.detail.toggle();
      shadow.dispatchEvent(this.darkSetEvent);
    });

    /**
     * Listens for toggleSwitchEvent to set accessible and dispatch accessSetEvent
     */
    accessSwitch.addEventListener('toggleSwitch', (e) => {
      this.accessible = e.detail.toggle();
      shadow.dispatchEvent(this.accessSetEvent);
    });

    /**
     * @method
     * Toggles light/dark color scheme for sidebar
     * @param {Boolean} dark turn dark color scheme if dark mode is on
     */
    this.setDark = (dark) => {
      if (dark) {
        styles.setAttribute('href', './components/pomo-settings/pomo-settings.css');
        settingsIcon.setAttribute('src', './assets/gear_settings.png');
      } else {
        styles.setAttribute('href', './components/pomo-settings/pomo-settings-light.css');
        settingsIcon.setAttribute('src', './assets/gear_settings_light.png');
      }
      calmSwitch.setDark(dark);
      darkSwitch.setDark(dark);
      accessSwitch.setDark(dark);
    };

    // Enabled determines if this component can be opened
    this.enabled = true;

    /**
     * @method
     * Enable settings
     */
    this.enableSettings = () => {
      this.enabled = true;
      workSection.classList.remove('disabled');
      shortSection.classList.remove('disabled');
      longSection.classList.remove('disabled');
      soundSection.classList.remove('disabled');
      calmSection.classList.remove('disabled');
      darkSection.classList.remove('disabled');
      accessSection.classList.remove('disabled');
      workNumber.disabled = false;
      shortBreakNumber.disabled = false;
      longBreakNumber.disabled = false;
      soundSelect.disabled = false;
      calmSwitch.enable();
      darkSwitch.enable();
      accessSwitch.enable();
    };

    /**
     * @method
     * Disable settings besides volume
     */
    this.disableSettings = () => {
      this.enabled = false;
      workSection.classList.add('disabled');
      shortSection.classList.add('disabled');
      longSection.classList.add('disabled');
      soundSection.classList.add('disabled');
      calmSection.classList.add('disabled');
      darkSection.classList.add('disabled');
      accessSection.classList.add('disabled');
      workNumber.disabled = true;
      shortBreakNumber.disabled = true;
      longBreakNumber.disabled = true;
      soundSelect.disabled = true;
      calmSwitch.disable();
      darkSwitch.disable();
      accessSwitch.disable();
    };

    /**
     * @method
     * Called by control, updates the default settings with values previously had from local storage
     * @param {Boolean} calm whether or not calm mode is turned on
     * @param {Number} volume value of audio volume
     * @param {String} sound type of audio notification noise
     * @param {Boolean} dark whether or not dark mode is turned on
     * @param {Number} work length of each work session in minutes
     * @param {Number} shortBreak length of each short break session in minutes
     * @param {Number} longBreak length of each long break session in minutes
     */
    this.loadSettings = (calm, volume, sound, dark, work, shortBreak, longBreak, access) => {
      this.work = work;
      workNumber.value = work;
      this.shortBreak = shortBreak;
      shortBreakNumber.value = shortBreak;
      this.longBreak = longBreak;
      longBreakNumber.value = longBreak;
      this.volume = volume;
      this.volumeSet(volume);
      this.sound = sound;
      soundSelect.value = sound;
      this.calm = calm;
      if (calm) {
        calmSwitch.setOn();
      } else {
        calmSwitch.setOff();
      }
      this.dark = dark;
      if (dark) {
        darkSwitch.setOn();
      } else {
        darkSwitch.setOff();
      }
      this.setDark(dark);
      this.accessible = access;
      if (access) {
        accessSwitch.setOn();
      } else {
        accessSwitch.setOff();
      }
    };

    /**
     * @method
     * For transforming the whole object
     * @param {String} buttonText the text to put in transform css
     * @param {Number} leftOffset left offset of settingPanel
     */
    this.changeTransform = (buttonText, panelText, leftOffset) => {
      settingsButton.style.transform = buttonText;
      sideBar.style.transform = panelText;

      /* Change style of left offset if panel is open,
       * Or store it if it is closed.
       */
      if (sideBar.getAttribute('class') === 'open') {
        sideBar.style.left = (0 - leftOffset).toString().concat('px');
      } else {
        leftOffsetTemp = (0 - leftOffset).toString().concat('px');
      }
    };

    /**
     * @method
     * For CONTROL to determine whether we can open info, setting, stats
     * @param {Boolean} enabled true for being able to open, false otherwise
     */
    this.setAccessibility = (enabled) => {
      this.accessible = enabled;
    };

    /**
     * Functions that opens and closes the setting page with the q key
     */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'q' && this.accessible === true) {
        if (sideBar.getAttribute('class') === 'open') {
          closeButton.onclick();
        } else if (this.enabled === true) {
          settingsButton.onclick();
        }
      }
    });
  }
}

customElements.define('pomo-settings', PomoSettings);

export default PomoSettings;
