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
    openButton.innerHTML = '&#9881;';

    // Button to close sidebar
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'closeButton');
    closeButton.setAttribute('class', 'button-off');

    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('id', 'closeButtonIcon');
    closeIcon.setAttribute('src', './assets/x.svg');


    // Edit work, short break, and long break lengths
    const timerSection = document.createElement('div');

    const pomoLengthLabel = document.createElement('label');
    pomoLengthLabel.textContent = 'Time (minutes)';

    // Input field for work customization
    const workSection = document.createElement('div');

    const workLabel = document.createElement('label');
    workLabel.innerHTML = 'Work';

    const workNumber = document.createElement('input');
    workNumber.setAttribute('id', 'workNumber');
    workNumber.setAttribute('type', 'number');
    workNumber.setAttribute('value', this.work);
    workNumber.setAttribute('min', '1');
    workNumber.setAttribute('max', '60');
    workNumber.setAttribute('step', '1');

    // Input field for short break customization
    const shortSection = document.createElement('div');

    const shortBreakLabel = document.createElement('label');
    shortBreakLabel.innerHTML = 'Short Break';

    const shortBreakNumber = document.createElement('input');
    shortBreakNumber.setAttribute('id', 'shortBreakNumber');
    shortBreakNumber.setAttribute('type', 'number');
    shortBreakNumber.setAttribute('value', this.shortBreak);
    shortBreakNumber.setAttribute('min', '1');
    shortBreakNumber.setAttribute('max', '60');
    shortBreakNumber.setAttribute('step', '1');

    // Input field for long break customization
    const longSection = document.createElement('div');

    const longBreakLabel = document.createElement('label');
    longBreakLabel.innerHTML = 'Long Break';

    const longBreakNumber = document.createElement('input');
    longBreakNumber.setAttribute('id', 'longBreakNumber');
    longBreakNumber.setAttribute('type', 'number');
    longBreakNumber.setAttribute('value', this.longBreak);
    longBreakNumber.setAttribute('min', '1');
    longBreakNumber.setAttribute('max', '60');
    longBreakNumber.setAttribute('step', '1');


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
    volumeNumber.setAttribute('value', this.volume);


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
    calmLabel.setAttribute('id', 'calmSwitch');
    const calmSwitch = new ToggleSwitch("calm", "busy");
    
    // Toggle switch to enable dark mode
    const darkSection = document.createElement('div');
    const darkLabel = document.createElement('label');
    darkLabel.innerHTML = 'Dark Mode';
    darkLabel.htmlFor = 'darkSwitch';
    darkLabel.setAttribute('id', 'darkSwitch');
    const darkSwitch = new ToggleSwitch("dark", "light");

    //attach for Cypress testing
    window.calmMode = calmSwitch;
    window.darkMode = darkSwitch;

    // Attach elements to shadow DOM
    shadow.appendChild(modal);
    shadow.appendChild(styles);
    shadow.appendChild(openButton);
    shadow.appendChild(sideBar);

    sideBar.appendChild(closeButton);
    closeButton.appendChild(closeIcon);
    sideBar.appendChild(pomoLengthLabel);
    sideBar.appendChild(settingsTitle);
    sideBar.appendChild(timerSection);

    timerSection.appendChild(pomoLengthLabel);
    timerSection.appendChild(workSection);
    timerSection.appendChild(shortSection);
    timerSection.appendChild(longSection);

    workSection.appendChild(workLabel);
    workSection.appendChild(workNumber);
    shortSection.appendChild(shortBreakLabel);
    shortSection.appendChild(shortBreakNumber);
    longSection.appendChild(longBreakLabel);
    longSection.appendChild(longBreakNumber)

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
    workNumber.onchange = () => {
      let workMin = Math.round(Number(workNumber.value));
      if(workMin < 1){
        window.alert('Work must be an integer between 1 and 60.');
        workMin = 1;
      }
      else if(workMin > 60){
        window.alert('Work must be an integer between 1 and 60.');
        workMin = 60;
      }
      workNumber.value = workMin;
      this.work = workMin;
      shadow.dispatchEvent(this.workSetEvent);
    }

    /**
     * Passes customized short break minutes to event listener
     */
    shortBreakNumber.onchange = () => {
      let shortBreakMin = Math.round(Number(shortBreakNumber.value));
      if(shortBreakMin < 1){
        window.alert('Short Break must be an integer between 1 and 60.');
        shortBreakMin = 1;
      }
      else if(shortBreakMin > 60){
        window.alert('Short Break must be an integer between 1 and 60.');
        shortBreakMin = 60;
      }
      shortBreakNumber.value = shortBreakMin;
      this.shortBreak = shortBreakMin;
      shadow.dispatchEvent(this.shortBreakSetEvent);
    }

    /**
     * Passes customized long break minutes to event listener
     */
    longBreakNumber.onchange = () => {
      let longBreakMin = Math.round(Number(longBreakNumber.value));
      if(longBreakMin < 1){
        window.alert('Long Break must be an integer between 1 and 60.');
        longBreakMin = 1;
      }
      else if(longBreakMin > 60){
        window.alert('Long Break must be an integer between 1 and 60.');
        longBreakMin = 60;
      }
      longBreakNumber.value = longBreakMin;
      this.longBreak = longBreakMin;
      shadow.dispatchEvent(this.longBreakSetEvent);
    }

    /**
     * Passes customized volume from slider to event listener
     */
    volumeSlide.onchange = () => {
      this.volumeSet(Number(volumeSlide.value));
    }

    /**
     * Passes customized volume from input to event listener
     */
    volumeNumber.onchange = () => {
      this.volumeSet(Number(volumeNumber.value));
    }
    
    /**
     * Coordinate slider and input with each other, sets volume variable, 
     * and plays audio so the user can test volume
     * @param {Number} volume volume of audio
     */
    this.volumeSet = (volume) => {
      let vol = Math.round(volume);
      if(vol > 100){
        window.alert('Volume must be an integer between 0 and 100.');
        vol = 100;
      }
      else if(vol < 0){
        window.alert('Volume must be an integer between 0 and 100.');
        vol = 0;
      }
      volumeSlide.value = vol;
      volumeNumber.value = vol;
      this.volume = vol;
      shadow.dispatchEvent(this.volumeSetEvent);
    }

    /**
     * Sets and passes sound variable to control event listener, and plays
     * audio so that the user can test audio sound
     */
    soundSelect.onchange = () => {
      this.sound = soundSelect.value;
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
    });

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
      if(calm){
        calmSwitch.setOn();
      }
      else{
        calmSwitch.setOff();
      }
      this.dark = dark;
      if(dark){
        darkSwitch.setOn();
      }
      else{
        darkSwitch.setOff();
      }
    }
  }
}

customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };