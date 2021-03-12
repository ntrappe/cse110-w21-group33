import ToggleSwitch from './pomo-toggle.js';

const MIN_MINUTES = '1';
const MAX_MINUTES = '60';
const MIN_VOLUME = '0';
const MAX_VOLUME = '100';
const ERROR_FLASH_LENGTH = 100;

class PomoSettings extends HTMLElement {
  constructor() {
    super();

    // Event variables
    this.work = 25;
    this.shortBreak = 5;
    this.longBreak = 10;
    this.volume = 50;
    this.sound = 'default';
    this.calm = false;
    this.dark = false;

    const shadow = this.attachShadow({ mode: 'open' });

    // Lightbox background
    const modal = document.createElement('div');
    modal.setAttribute('id', 'modal');

    // Connect sidebar to CSS
    const styles = document.createElement('link');
    styles.setAttribute('id', 'settingsStyles');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', './components/settings-dark.css');
    // styles.setAttribute('href', './components/pomo-settings.css');

    // Settings panel
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'settings');

    const settingsTitle = document.createElement('h1');
    settingsTitle.setAttribute('id', 'settings-title');
    settingsTitle.textContent = 'Settings';

    // Button to open sidebar
    const openButton = document.createElement('button');
    openButton.setAttribute('id', 'openButton');
    openButton.innerHTML = '&#9881;';

    // Button to close sidebar
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'closeButton');

    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('id', 'closeButtonIcon');
    closeIcon.setAttribute('src', './assets/x.svg');

    const pomoLengthLabel = document.createElement('label');
    pomoLengthLabel.textContent = 'Time (minutes)';
    pomoLengthLabel.setAttribute('id', 'pomo-length-label');

    // Edit work, short break, and long break lengths
    const timerSection = document.createElement('div');
    timerSection.setAttribute('id', 'timer-settings');

    // Input field for work customization
    const workSection = document.createElement('div');
    workSection.setAttribute('id', 'settings-work-section');

    const workLabel = document.createElement('label');
    workLabel.setAttribute('id', 'settings-work-sec-label');
    workLabel.textContent = 'Work';
    workLabel.htmlFor = 'workNumber';

    const workNumber = document.createElement('input');
    workNumber.setAttribute('id', 'workNumber');
    workNumber.setAttribute('type', 'number');
    workNumber.setAttribute('value', this.work);
    workNumber.setAttribute('min', MIN_MINUTES);
    workNumber.setAttribute('max', MAX_MINUTES);
    workNumber.setAttribute('step', '1');

    // Input field for short break customization
    const shortSection = document.createElement('div');
    shortSection.setAttribute('id', 'settings-short-section');

    const shortBreakLabel = document.createElement('label');
    shortBreakLabel.setAttribute('id', 'settings-short-sec-label');
    shortBreakLabel.textContent = 'Short Break';
    shortBreakLabel.htmlFor = 'shortBreakNumber';

    const shortBreakNumber = document.createElement('input');
    shortBreakNumber.setAttribute('id', 'shortBreakNumber');
    shortBreakNumber.setAttribute('type', 'number');
    shortBreakNumber.setAttribute('value', this.shortBreak);
    shortBreakNumber.setAttribute('min', MIN_MINUTES);
    shortBreakNumber.setAttribute('max', MAX_MINUTES);
    shortBreakNumber.setAttribute('step', '1');

    // Input field for long break customization
    const longSection = document.createElement('div');
    longSection.setAttribute('id', 'settings-long-section');

    const longBreakLabel = document.createElement('label');
    longBreakLabel.setAttribute('id', 'settings-long-sec-label');
    longBreakLabel.textContent = 'Long Break';
    longBreakLabel.htmlFor = 'longBreakNumber';

    const longBreakNumber = document.createElement('input');
    longBreakNumber.setAttribute('id', 'longBreakNumber');
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
    calmLabel.htmlFor = 'calmSwitch';
    const calmSwitch = new ToggleSwitch('calm', 'busy');
    calmSwitch.setAttribute('id', 'calmSwitch');

    // Toggle switch to enable dark mode
    const darkSection = document.createElement('div');
    darkSection.setAttribute('id', 'dark-section');

    const darkLabel = document.createElement('label');
    darkLabel.setAttribute('id', 'dark-label');
    darkLabel.textContent = 'Dark Mode';
    darkLabel.htmlFor = 'darkSwitch';
    const darkSwitch = new ToggleSwitch('dark', 'light');
    darkSwitch.setAttribute('id', 'darkSwitch');

    const audioLabel = document.createElement('label');
    audioLabel.setAttribute('id', 'audio-label');
    audioLabel.textContent = 'Audio';

    const audioSection = document.createElement('div');
    audioSection.setAttribute('id', 'audio-settings');

    // Dropdown menu to change audio notification noise
    const soundSection = document.createElement('div');
    soundSection.setAttribute('id', 'sound-section');

    const soundLabel = document.createElement('label');
    soundLabel.setAttribute('id', 'sound-label');
    soundLabel.textContent = 'Sound';
    soundLabel.htmlFor = 'soundSelect';

    const soundSelect = document.createElement('select');
    soundSelect.setAttribute('id', 'soundSelect');

    // List of names of audio files
    const soundList = ['party-horn', 'angry-monkey', 'default', 'rooster'];

    // Create option in dropdown menu for each audio file
    for (let i = 0; i < soundList.length; i += 1) {
      const sound = soundList[i];

      const option = soundSelect.appendChild(document.createElement('option'));
      option.value = sound;

      // Converts name of audio file to capitalized word with spaces
      const name = sound
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      option.text = name;
    }
    soundSelect.value = this.sound;

    // Input slider and number to change volume
    const volumeLabel = document.createElement('label');
    volumeLabel.setAttribute('id', 'volume-label');
    volumeLabel.textContent = 'Volume';
    volumeLabel.htmlFor = 'volumeNumber';

    const volumeSection = document.createElement('div');
    volumeSection.setAttribute('id', 'volume-section');

    const volumeInputs = document.createElement('div');

    const volumeSlide = document.createElement('input');
    volumeSlide.setAttribute('type', 'range');
    volumeSlide.setAttribute('id', 'volumeSlide');
    volumeSlide.setAttribute('min', MIN_VOLUME);
    volumeSlide.setAttribute('max', MAX_VOLUME);
    volumeSlide.setAttribute('value', this.volume);

    const volumeNumber = document.createElement('input');
    volumeNumber.setAttribute('type', 'number');
    volumeNumber.setAttribute('id', 'volumeNumber');
    volumeNumber.setAttribute('min', MIN_VOLUME);
    volumeNumber.setAttribute('max', MAX_VOLUME);
    volumeNumber.setAttribute('value', this.volume);

    // Attach elements to shadow DOM
    shadow.appendChild(modal);
    shadow.appendChild(styles);
    shadow.appendChild(openButton);
    shadow.appendChild(sideBar);

    sideBar.appendChild(closeButton);
    sideBar.appendChild(settingsTitle);

    sideBar.appendChild(pomoLengthLabel);
    sideBar.appendChild(timerSection);

    sideBar.appendChild(displayLabel);
    sideBar.appendChild(displaySection);

    sideBar.appendChild(audioLabel);
    sideBar.appendChild(audioSection);

    closeButton.appendChild(closeIcon);

    // timerSection.appendChild(pomoLengthLabel);
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

    volumeSection.appendChild(volumeInputs);
    volumeInputs.appendChild(volumeLabel);
    volumeInputs.appendChild(volumeSlide);
    volumeInputs.appendChild(volumeNumber);

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

    /**
     * Opens the sidebar when clicking open button
     */
    openButton.onclick = () => {
      sideBar.setAttribute('class', 'open');
      modal.style.display = 'block';
    };

    /**
     * Closes the sidebar when clicking close button
     */
    closeButton.onclick = () => {
      sideBar.setAttribute('class', 'close');
      modal.style.display = 'none';
    };

    /**
     * Closes the sidebar when clicking outside of sidebar
     * @param {Object} e contains data of what is being clicked on website
     */
    modal.onclick = (e) => {
      sideBar.setAttribute('class', 'close');
      modal.style.display = 'none';
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

        // Round invalid input to either min or max value
        workNumber.value = workNumber.value <= 0 ? workNumber.min : workNumber.max;

        // After waiting, turn textbox border back to normal
        setTimeout(() => {
          workNumber.classList.remove('invalid');
        }, ERROR_FLASH_LENGTH);
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

        // Round invalid input to either min or max value
        shortBreakNumber.value =
          shortBreakNumber.value <= 0 ? shortBreakNumber.min : shortBreakNumber.max;

        // After waiting, turn textbox border back to normal
        setTimeout(() => {
          shortBreakNumber.classList.remove('invalid');
        }, ERROR_FLASH_LENGTH);
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

        // Round invalid input to either min or max value
        longBreakNumber.value =
          longBreakNumber.value <= 0 ? longBreakNumber.min : longBreakNumber.max;

        // After waiting, turn textbox border back to normal
        setTimeout(() => {
          longBreakNumber.classList.remove('invalid');
        }, ERROR_FLASH_LENGTH);
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

        // Round invalid input to either min or max value
        volumeNumber.value = volumeNumber.value <= 0 ? volumeNumber.min : volumeNumber.max;

        // After waiting, turn textbox border back to normal
        setTimeout(() => {
          volumeNumber.classList.remove('invalid');
        }, ERROR_FLASH_LENGTH);
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
     * Enable settings
     */
    this.enableSettings = () => {
      workNumber.disabled = false;
      shortBreakNumber.disabled = false;
      longBreakNumber.disabled = false;
      soundSelect.disabled = false;
      calmSwitch.enable();
      darkSwitch.enable();
    };

    /**
     * Disable settings besides volume
     */
    this.disableSettings = () => {
      workNumber.disabled = true;
      shortBreakNumber.disabled = true;
      longBreakNumber.disabled = true;
      soundSelect.disabled = true;
      soundSelect.style.opacity = '1';
      calmSwitch.disable();
      darkSwitch.disable();
    };

    /**
     * Called by control, updates the default settings with values previously had from local storage
     * @param {Boolean} calm whether or not calm mode is turned on
     * @param {Number} volume value of audio volume
     * @param {String} sound type of audio notification noise
     * @param {Boolean} dark whether or not dark mode is turned on
     * @param {Number} work length of each work session in minutes
     * @param {Number} shortBreak length of each short break session in minutes
     * @param {Number} longBreak length of each long break session in minutes
     */
    this.loadSettings = (calm, volume, sound, dark, work, shortBreak, longBreak) => {
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
    };
  }
}

customElements.define('pomo-settings', PomoSettings);

export default PomoSettings;
