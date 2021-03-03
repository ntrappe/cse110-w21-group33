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

        // Connect sidebar to CSS
        const styles = document.createElement('link');
        styles.setAttribute('id', 'settings-styles');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', './components/pomo-settings.css');

        // Temporary button to disable settings 
        const disableButton = document.createElement('button');
        disableButton.setAttribute('id', 'disableButton');
        disableButton.innerHTML = 'Disable';

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
        pomoLengthLabel.textContent = 'Customize Pomodoro Length';

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
        const soundList = ["party-horn", "angry-monkey", "default", "rooster"];

        for (const sound of soundList) {
          const option = soundSelect.appendChild(document.createElement("option"));
          option.value = sound;
          let name = sound.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
          option.text = name;
        }
        soundSelect.value = this.sound;


        // Toggle switch to enable calm mode
        const calmSection = document.createElement('div');
        const calmLabel = document.createElement('label');
        calmLabel.innerHTML = 'Calm Mode';
        calmLabel.htmlFor = 'calmSwitch';
        const calmSwitch = new ToggleSwitch();


        // Toggle switch to enable dark mode
        const darkSection = document.createElement('div');
        const darkLabel = document.createElement('label');
        darkLabel.innerHTML = 'Dark Mode';
        darkLabel.htmlFor = 'darkSwitch';
        const darkSwitch = new ToggleSwitch();;


        // Attach elements to shadow DOM
        shadow.appendChild(styles);
        shadow.appendChild(openButton);
        shadow.appendChild(sideBar);
        sideBar.appendChild(closeButton);
        sideBar.appendChild(pomoLengthLabel);
        sideBar.appendChild(settingsTitle);

        sideBar.appendChild(timerSection)
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

        shadow.appendChild(disableButton);

        
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


        // Event listeners
        openButton.onclick = () => {
            sideBar.setAttribute('class', 'open');
        }

        closeButton.onclick = () => {
            sideBar.setAttribute('class', 'close');
        }

        document.onclick = (e) => {
            if (!sideBar.contains(e.target) && !(e.target == this)){
                sideBar.setAttribute('class', 'close');
            }
        }

        workMinutesNumber.oninput = () => {
            console.log("We've changed the workMinutes");
            this.work = Number(workMinutesNumber.value);
            shadow.dispatchEvent(this.workSetEvent);
        }

        shortBreakMinutesNumber.oninput = () => {
            console.log("We've changed the shortBreakMinutes");
            this.shortBreak = Number(shortBreakMinutesNumber.value);
            shadow.dispatchEvent(this.shortBreakSetEvent);
        }

        longBreakMinutesNumber.oninput = () => {
            console.log("We've changed the longBreakMinutes");
            this.longBreak = Number(longBreakMinutesNumber.value);
            shadow.dispatchEvent(this.longBreakSetEvent);
        }

        volumeSlide.oninput = () => {
            console.log("We've changed the volume through the slider.");
            this.volumeSet(volumeSlide.value);
            shadow.dispatchEvent(this.volumeSetEvent);
        }

        volumeNumber.oninput = () => {
            console.log("We've changed the volume through the number");
            this.volumeSet(volumeNumber.value);
            shadow.dispatchEvent(this.volumeEvent);
        }

        this.volumeSet = (volume) => {
            volumeSlide.value = volume;
            volumeNumber.value = volume;
            this.volume = volume;
        }

        soundSelect.onchange = () => {
            console.log("We've selected a new sound. Should update these preferences.");
            this.sound = soundSelect.value;
            shadow.dispatchEvent(this.soundSetEvent);
        }

        // Enable settings button
        this.enableSettings = () => {
            openButton.disabled = false;
        }

        // Disable settings button
        this.disableSettings = () => {
            openButton.disabled = true;
        }

        // Load settings 
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