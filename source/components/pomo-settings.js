import { ToggleSwitch } from './pomo-toggle.js';

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

    // Audio so users can test volume + audio type
    const audio = document.createElement("audio");
    audio.setAttribute('id', 'audioSound');
    audio.src = '/media/audio/default.mp3';

    // Lightbox background
    const modal = document.createElement('div');  
    modal.setAttribute('id', 'modal');

    // Connect sidebar to CSS
    const styles = document.createElement('link');
    styles.setAttribute('id', 'settings-styles');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', './components/pomo-settings.css');

    // Settings panel
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'settings');

    const settingsTitle = document.createElement('h1');
    settingsTitle.textContent = 'Settings';

    // Button to open sidebar
    const openButton = document.createElement('button');
    openButton.setAttribute('id', 'openButton');
    openButton.innerHTML = "&#9881;";

    // Button to close sidebar
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.setAttribute('class', 'button-off');

    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('id', 'closeButtonIcon');
    closeIcon.setAttribute('src', './assets/x.svg');
    closeButton.appendChild(closeIcon);


    // Edit work, short break, and long break lengths
    const timerSection = document.createElement('div');

    const pomoLengthLabel = document.createElement('label');
    pomoLengthLabel.textContent = 'Time (minutes)';

    // Input field for work customization
    const workSection = document.createElement('div');

    const workLabel = document.createElement('label');
    workLabel.innerHTML = 'Work';

    const workMinutesNumber = document.createElement('input');
    workMinutesNumber.setAttribute('id', 'workMinutesNumber');
    workMinutesNumber.setAttribute('type', 'number');
    workMinutesNumber.setAttribute('value', this.work);
    workMinutesNumber.setAttribute('min', '1');
    workMinutesNumber.setAttribute('step', '1');

    // Input field for short break customization
    const shortSection = document.createElement('div');

    const shortBreakLabel = document.createElement('label');
    shortBreakLabel.innerHTML = 'Short Break';

    const shortBreakMinutesNumber = document.createElement('input');
    shortBreakMinutesNumber.setAttribute('id', 'shortBreakMinutesNumber');
    shortBreakMinutesNumber.setAttribute('type', 'number');
    shortBreakMinutesNumber.setAttribute('value', this.shortBreak);
    shortBreakMinutesNumber.setAttribute('min', '1');
    shortBreakMinutesNumber.setAttribute('step', '1');

    // Input field for long break customization
    const longSection = document.createElement('div');

    const longBreakLabel = document.createElement('label');
    longBreakLabel.innerHTML = 'Long Break';

    const longBreakMinutesNumber = document.createElement('input');
    longBreakMinutesNumber.setAttribute('id', 'longBreakMinutesNumber');
    longBreakMinutesNumber.setAttribute('type', 'number');
    longBreakMinutesNumber.setAttribute('value', this.longBreak);
    longBreakMinutesNumber.setAttribute('min', '1');
    longBreakMinutesNumber.setAttribute('step', '1');


    // Input field and slider to change volume
    const volumeSection = document.createElement('div');

    const volumeLabel = document.createElement('label');
    volumeLabel.innerHTML = 'Volume';
    volumeLabel.htmlFor = 'volumeSlide';

    const volumeSlide = document.createElement('input');
    volumeSlide.setAttribute('type', 'range');
    volumeSlide.setAttribute('id', 'volumeSlide');
    volumeSlide.setAttribute('min', '0');
    volumeSlide.setAttribute('max', '100');
    volumeSlide.setAttribute('value', this.volume);

    const volumeNumber = document.createElement('input');
    volumeNumber.setAttribute('type', 'number');
    volumeNumber.setAttribute('id', 'volumeNumber');
    volumeNumber.setAttribute('min', '0');
    volumeNumber.setAttribute('max', '100');
    volumeNumber.setAttribute('value', '50');


    // Dropdown menu to change audio notification noise
    const soundSection = document.createElement('div');
    const soundLabel = document.createElement('label');
    soundLabel.innerHTML = 'Sound';
    soundLabel.htmlFor = 'soundSelect';

    const soundSelect = document.createElement('select');
    soundSelect.setAttribute('id', 'soundSelect');


    // List of names of audio files
    const soundList = ["party-horn", "angry-monkey", "default", "rooster"];

    // Create option in dropdown menu for each audio file
    for (const sound of soundList) {
      const option = soundSelect.appendChild(document.createElement("option"));
      option.value = sound;

      // Converts name of audio file to capitalized word with spaces
      let name = sound.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      option.text = name;
    }
    soundSelect.value = this.sound;


    // Toggle switch to enable calm mode
    const calmSection = document.createElement('div');
    const calmLabel = document.createElement('label');
    calmLabel.innerHTML = 'Calm Mode';
    calmLabel.htmlFor = 'calmSwitch';
    const calmSwitch = new ToggleSwitch("calm", "busy");


    // Toggle switch to enable dark mode
    const darkSection = document.createElement('div');
    const darkLabel = document.createElement('label');
    darkLabel.innerHTML = 'Dark Mode';
    darkLabel.htmlFor = 'darkSwitch';
    const darkSwitch = new ToggleSwitch("light", "dark");


    // Attach elements to shadow DOM
    shadow.appendChild(modal);
    shadow.appendChild(styles);
    shadow.appendChild(openButton);
    shadow.appendChild(sideBar);
    shadow.appendChild(audio);

    sideBar.appendChild(closeButton);
    sideBar.appendChild(pomoLengthLabel);
    sideBar.appendChild(settingsTitle);
    sideBar.appendChild(timerSection);

    timerSection.appendChild(pomoLengthLabel);
    timerSection.appendChild(workSection);
    timerSection.appendChild(shortSection);
    timerSection.appendChild(longSection);

    workSection.appendChild(workLabel);
    workSection.appendChild(workMinutesNumber);
    shortSection.appendChild(shortBreakLabel);
    shortSection.appendChild(shortBreakMinutesNumber);
    longSection.appendChild(longBreakLabel);
    longSection.appendChild(longBreakMinutesNumber)

    sideBar.appendChild(volumeSection);
    volumeSection.appendChild(volumeLabel);
    volumeSection.appendChild(volumeSlide);
    volumeSection.appendChild(volumeNumber);

    sideBar.appendChild(soundSection);
    soundSection.appendChild(soundLabel);
    soundSection.appendChild(soundSelect);

    sideBar.appendChild(calmSection);
    calmSection.appendChild(calmLabel);
    calmSection.appendChild(calmSwitch);

    sideBar.appendChild(darkSection);
    darkSection.appendChild(darkLabel);
    darkSection.appendChild(darkSwitch);

    
    /* Events */
    this.workSetEvent = new CustomEvent('workSet', {
      bubbles: true,
      composed: true,
      detail: {work: () => this.work}
    });

    this.shortBreakSetEvent = new CustomEvent('shortBreakSet', {
      bubbles: true,
      composed: true,
      detail: {shortBreak: () => this.shortBreak}
    });

    this.longBreakSetEvent = new CustomEvent('longBreakSet', {
      bubbles: true,
      composed: true,
      detail: {longBreak: () => this.longBreak}
    });

    this.volumeSetEvent = new CustomEvent('volumeSet', {
      bubbles: true,
      composed: true,
      detail: {volume: () => this.volume}
    });

    this.soundSetEvent = new CustomEvent('soundSet', {
      bubbles: true,
      composed: true,
      detail: {sound: () => this.sound}
    });

    this.calmSetEvent = new CustomEvent('calmSet', {
      bubbles: true,
      composed: true,
      detail: {calm: () => this.calm}
    }); 

    this.darkSetEvent = new CustomEvent('darkSet', {
      bubbles: true,
      composed: true,
      detail: {dark: () => this.dark}
    });


    /**
     * Opens the sidebar when clicking open button
     */
    openButton.onclick = () => {
      sideBar.setAttribute('class', 'open');
      modal.style.display = "block";
    }

    /**
     * Closes the sidebar when clicking close button
     */
    closeButton.onclick = () => {
      sideBar.setAttribute('class', 'close');
      modal.style.display = "none";
    }

    /**
     * Closes the sidebar when clicking outside of sidebar
     * @param {Object} e contains data of what is being clicked on website
     */
    modal.onclick = (e) => {
      sideBar.setAttribute('class', 'close');
      modal.style.display = "none";
    }

    /**
     * Passes customized work minutes to event listener
     */
    workMinutesNumber.onchange = () => {
      console.log("We've changed the workMinutes");
      this.work = Number(workMinutesNumber.value);
      shadow.dispatchEvent(this.workSetEvent);
    }

    /**
     * Passes customized short break minutes to event listener
     */
    shortBreakMinutesNumber.onchange = () => {
      console.log("We've changed the shortBreakMinutes");
      this.shortBreak = Number(shortBreakMinutesNumber.value);
      shadow.dispatchEvent(this.shortBreakSetEvent);
    }

    /**
     * Passes customized long break minutes to event listener
     */
    longBreakMinutesNumber.onchange = () => {
      console.log("We've changed the longBreakMinutes");
      this.longBreak = Number(longBreakMinutesNumber.value);
      shadow.dispatchEvent(this.longBreakSetEvent);
    }

    /**
     * Passes customized volume from slider to event listener
     */
    volumeSlide.onchange = () => {
      console.log("We've changed the volume through the slider.");
      this.volumeSet(volumeSlide.value);
      shadow.dispatchEvent(this.volumeSetEvent);
    }

    /**
     * Passes customized volume from input to event listener
     */
    volumeNumber.onchange = () => {
      console.log("We've changed the volume through the number");
      this.volumeSet(volumeNumber.value);
      shadow.dispatchEvent(this.volumeSetEvent);
    }

    /**
     * Stops audio if user decides to change volume 
     */
    volumeSlide.oninput = () => {
      audio.currentTime = 0;
      audio.pause();
    }

    /**
     * Stops audio if user decides to change volume 
     */
    volumeNumber.oninput = () => {
      audio.currentTime = 0;
      audio.pause();
    }

    /**
     * Coordinate slider and input with each other, sets volume variable, 
     * and plays audio so the user can test volume
     * @param {Number} volume volume of audio
     */
    this.volumeSet = (volume) => {
      volumeSlide.value = volume;
      volumeNumber.value = volume;
      this.volume = volume;
      audio.volume = volume / 100;
      audio.play();
    }

    /**
     * Sets and passes sound variable to control event listener, and plays
     * audio so that the user can test audio sound
     */
    soundSelect.onchange = () => {
      console.log("We've selected a new sound. Should update these preferences.");
      this.sound = soundSelect.value;
      audio.src = `/media/audio/${this.sound}.mp3`;
      audio.play();
      shadow.dispatchEvent(this.soundSetEvent);
    }

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
    })

    /**
     * Enable settings by re-enabling settings button
     */
    this.enableSettings = () => {
      openButton.disabled = false;
    }

    /**
     * Disable settings by disabling settings button
     */
    this.disableSettings = () => {
      openButton.disabled = true;
    }

    /**
     * Called from control, updates the default settings with values previously had from local storage
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
      workMinutesNumber.value = work;
      this.shortBreak = shortBreak;
      shortBreakMinutesNumber.value = shortBreak;
      this.longBreak = longBreak;
      longBreakMinutesNumber.value = longBreak;
      this.volumeSet(volume);
      this.sound = sound;
      soundSelect.value = sound;
      this.calm = calm;
      this.dark = dark;
    }
  }
}

customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };