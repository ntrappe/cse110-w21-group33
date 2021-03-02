class PomoSettings extends HTMLElement {
    constructor() {
        super();

        //Event Variables
        this.volume;
        this.sound;
        this.calm;
        this.dark;
        this.work;
        this.shortBreak;
        this.longBreak;

        const shadow = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('link');
        styles.setAttribute('id', 'settings-styles');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', './components/pomo-settings.css');
 
        //Main Page open settings button
        const openButton = document.createElement('button');
        openButton.setAttribute('id', 'openButton');
        openButton.innerHTML = "&#9881;";

        //Main Page temporary disable settings button
        const disableButton = document.createElement('button');
        disableButton.setAttribute('id', 'disableButton');
        disableButton.innerHTML = 'Disable';

        //Settings Panel div
        const settingsPanel = document.createElement('div');
        settingsPanel.setAttribute('id', 'settings');

        //Inside Settings Panel

            //Close button
        const closeButton = document.createElement('button');
        closeButton.setAttribute('id', 'closeButton');
        closeButton.setAttribute('class', 'button-off');
        
        const closeIcon = document.createElement('img');
        closeIcon.setAttribute('id', 'closeButtonIcon');
        closeIcon.setAttribute('src', './assets/x.svg');
        closeButton.appendChild(closeIcon);

            //Settings
        const controls = document.createElement('div');
        controls.setAttribute('id', 'controls');

                //Volume
        const volumeLabel = document.createElement('label');
        volumeLabel.innerHTML = 'Volume';
        volumeLabel.htmlFor = 'volumeSlide';

        const volumeSlide = document.createElement('input');
        volumeSlide.setAttribute('type', 'range');
        volumeSlide.setAttribute('id', 'volumeSlide');
        volumeSlide.setAttribute('min', '0');
        volumeSlide.setAttribute('max', '100');
        volumeSlide.setAttribute('value', '100');

        const volumeNumber = document.createElement('input');
        volumeNumber.setAttribute('type', 'number');
        volumeNumber.setAttribute('id', 'volumeNumber');
        volumeNumber.setAttribute('min', '0');
        volumeNumber.setAttribute('max', '100');
        volumeNumber.setAttribute('value', '100');

                //Sound Options
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

                //Calm Mode
        const calmLabel = document.createElement('label');
        calmLabel.innerHTML = 'Calm Mode';
        calmLabel.htmlFor = 'calmSwitch';

        //const calmSwitch;

                //Dark Mode
        const darkLabel = document.createElement('label');
        darkLabel.innerHTML = 'Dark Mode';
        darkLabel.htmlFor = 'darkSwitch';

        //const darkSwitch;

                //Edit Pomodoro Length
        const pomoLengthLabel = document.createElement('p');
        pomoLengthLabel.innerHTML = 'Customize Pomodoro Length';

        const workLabel = document.createElement('p');
        workLabel.innerHTML = 'Work';

        const workMinutesLabel = document.createElement('label');
        workMinutesLabel.innerHTMl = 'Minutes';
        workMinutesLabel.htmlFor = 'workMinutesNumber';
        const workMinutesNumber = document.createElement('input');
        workMinutesNumber.setAttribute('id', 'workMinutesNumber');
        workMinutesNumber.setAttribute('type', 'number');
        workMinutesNumber.setAttribute('value', '25');

        const workSecondsLabel = document.createElement('label');
        workSecondsLabel.innerHTMl = 'Seconds';
        workSecondsLabel.htmlFor = 'workSecondsNumber';
        const workSecondsNumber = document.createElement('input');
        workSecondsNumber.setAttribute('id', 'workSecondsNumber');
        workSecondsNumber.setAttribute('type', 'number');
        workSecondsNumber.setAttribute('min', '0');
        workSecondsNumber.setAttribute('max', '59');
        workSecondsNumber.setAttribute('value', '0');

        const shortBreakLabel = document.createElement('p');
        shortBreakLabel.innerHTML = 'Short Break';

        const shortBreakMinutesLabel = document.createElement('label');
        shortBreakMinutesLabel.innerHTMl = 'Minutes';
        shortBreakMinutesLabel.htmlFor = 'shortBreakMinutesNumber';
        const shortBreakMinutesNumber = document.createElement('input');
        shortBreakMinutesNumber.setAttribute('id', 'shortBreakMinutesNumber');
        shortBreakMinutesNumber.setAttribute('type', 'number');
        shortBreakMinutesNumber.setAttribute('value', '5');

        const shortBreakSecondsLabel = document.createElement('label');
        shortBreakSecondsLabel.innerHTMl = 'Seconds';
        shortBreakSecondsLabel.htmlFor = 'shortBreakSecondsNumber';
        const shortBreakSecondsNumber = document.createElement('input');
        shortBreakSecondsNumber.setAttribute('id', 'shortBreakSecondsNumber');
        shortBreakSecondsNumber.setAttribute('type', 'number');
        shortBreakSecondsNumber.setAttribute('min', '0');
        shortBreakSecondsNumber.setAttribute('max', '59');
        shortBreakSecondsNumber.setAttribute('value', '0');

        const longBreakLabel = document.createElement('p');
        longBreakLabel.innerHTML = 'Long Break';

        const longBreakMinutesLabel = document.createElement('label');
        longBreakMinutesLabel.innerHTMl = 'Minutes';
        longBreakMinutesLabel.htmlFor = 'longBreakMinutesNumber';
        const longBreakMinutesNumber = document.createElement('input');
        longBreakMinutesNumber.setAttribute('id', 'longBreakMinutesNumber');
        longBreakMinutesNumber.setAttribute('type', 'number');
        longBreakMinutesNumber.setAttribute('value', '15');

        const longBreakSecondsLabel = document.createElement('label');
        longBreakSecondsLabel.innerHTMl = 'Seconds';
        longBreakSecondsLabel.htmlFor = 'longBreakSecondsNumber';
        const longBreakSecondsNumber = document.createElement('input');
        longBreakSecondsNumber.setAttribute('id', 'longBreakSecondsNumber');
        longBreakSecondsNumber.setAttribute('type', 'number');
        longBreakSecondsNumber.setAttribute('min', '0');
        longBreakSecondsNumber.setAttribute('max', '59');
        longBreakSecondsNumber.setAttribute('value', '0');

        //shadow.appendChild(link);
        shadow.appendChild(styles);
        shadow.appendChild(openButton);
        shadow.appendChild(settingsPanel);
        settingsPanel.appendChild(closeButton);
        settingsPanel.appendChild(controls);
        controls.appendChild(volumeLabel);
        volumeLabel.appendChild(volumeSlide);
        volumeLabel.appendChild(volumeNumber);
        controls.appendChild(soundLabel);
        soundLabel.appendChild(soundSelect);
        controls.appendChild(pomoLengthLabel);
        pomoLengthLabel.appendChild(workLabel);
        pomoLengthLabel.appendChild(workMinutesLabel);
        pomoLengthLabel.appendChild(workMinutesNumber);
        pomoLengthLabel.appendChild(workSecondsLabel);
        pomoLengthLabel.appendChild(workSecondsNumber);
        pomoLengthLabel.appendChild(shortBreakLabel);
        pomoLengthLabel.appendChild(shortBreakMinutesLabel);
        pomoLengthLabel.appendChild(shortBreakMinutesNumber);
        pomoLengthLabel.appendChild(shortBreakSecondsLabel);
        pomoLengthLabel.appendChild(shortBreakSecondsNumber);
        pomoLengthLabel.appendChild(longBreakLabel);
        pomoLengthLabel.appendChild(longBreakMinutesLabel);
        pomoLengthLabel.appendChild(longBreakMinutesNumber);
        pomoLengthLabel.appendChild(longBreakSecondsLabel);
        pomoLengthLabel.appendChild(longBreakSecondsNumber);
        shadow.appendChild(disableButton);

                /* Events */
        //calmSetEvent
/*         this.calmSetEvent = new CustomEvent('calmSet', {
            bubbles: true,
            composed: true
          }); */
  
        //volumeSetEvent 
        this.volumeSetEvent = new CustomEvent('volumeSet', {
        bubbles: true,
        composed: true,
        detail: {volume: () => this.volume}
        });

        //soundSetEvent
        this.soundSetEvent = new CustomEvent('soundSet', {
        bubbles: true,
        composed: true,
        detail: {sound: () => this.sound}
        });
        //darkSetEvent
/*         this.darkSetEvent = new CustomEvent('darkSet', {
        bubbles: true,
        composed: true
        }); */
        //workSetEvent
        this.workSetEvent = new CustomEvent('workSet', {
        bubbles: true,
        composed: true,
        detail: {work: () => this.work}
        });
        //shortBreakSetEvent
        this.shortBreakSetEvent = new CustomEvent('shortBreakSet', {
        bubbles: true,
        composed: true,
        detail: {shortBreak: () => this.shortBreak}
        });
        //longBreakSetEvent
        this.longBreakSetEvent = new CustomEvent('longBreakSet', {
        bubbles: true,
        composed: true,
        detail: {longBreak: () => this.longBreak}
        });



        /* Event Listeners */
        openButton.onclick = () => {
            settingsPanel.setAttribute('class', 'open');
        }

        closeButton.onclick = () => {
            settingsPanel.setAttribute('class', 'close');
        }

        document.onclick = (e) => {
            if (!settingsPanel.contains(e.target) && !(e.target == this)){
                settingsPanel.setAttribute('class', 'close');
            }
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

        //calm on input
        //dark on input
        workMinutesNumber.oninput = () => {
            console.log("We've changed the workMinutes");
            this.workSet();
            shadow.dispatchEvent(this.workSetEvent);
        }
        workSecondsNumber.oninput = () => {
            console.log("We've changed the workSeconds");
            this.workSet();
            shadow.dispatchEvent(this.workSetEvent);
        }

        this.workSet = () => {
            let minutes = Number(workMinutesNumber.value);
            let seconds = Number(workSecondsNumber.value);
            let sum = minutes + seconds/60;
            this.work = sum;
        }

        shortBreakMinutesNumber.oninput = () => {
            console.log("We've changed the shortBreakMinutes");
            this.shortBreakSet();
            shadow.dispatchEvent(this.shortBreakSetEvent);
        }
        shortBreakSecondsNumber.oninput = () => {
            console.log("We've changed the shortBreakSeconds");
            this.shortBreakSet();
            shadow.dispatchEvent(this.shortBreakSetEvent);
        }

        this.shortBreakSet = () => {
            let minutes = Number(shortBreakMinutesNumber.value);
            let seconds = Number(shortBreakSecondsNumber.value);
            let sum = minutes + seconds/60;
            this.shortBreak = sum;
        }

        longBreakMinutesNumber.oninput = () => {
            console.log("We've changed the longBreakMinutes");
            this.longBreakSet();
            shadow.dispatchEvent(this.longBreakSetEvent);
        }
        longBreakSecondsNumber.oninput = () => {
            console.log("We've changed the longBreakSeconds");
            this.longBreakSet();
            shadow.dispatchEvent(this.longBreakSetEvent);
        }

        this.longBreakSet = () => {
            let minutes = Number(longBreakMinutesNumber.value);
            let seconds = Number(longBreakSecondsNumber.value);
            let sum = minutes + seconds / 60;
            this.longBreak = sum;
        }

        //enable settings button
        this.enableSettings = () => {
            openButton.disabled = false;
        }

        //disable settings button
        this.disableSettings = () => {
            openButton.disabled = true;
        }

        //load settings 
        this.loadSettings = (calm, volume, sound, dark, work, shortBreak, longBreak) => {
            this.volumeSet(volume);
            this.sound = sound;
            soundSelect.value = sound;
            this.work = work;
            workMinutesNumber.value = Math.trunc(work);
            workSecondsNumber.value = (work % 1) * 60;
            this.shortBreak = shortBreak;
            shortBreakMinutesNumber.value = Math.trunc(shortBreak);
            shortBreakSecondsNumber.value = (shortBreak % 1) * 60;
            this.longBreak = longBreak;
            longBreakMinutesNumber.value = Math.trunc(longBreak);
            longBreakSecondsNumber.value = (longBreak % 1) * 60;

        }
    }
}

customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };