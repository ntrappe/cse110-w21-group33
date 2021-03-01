class PomoSettings extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = 
        `<style>
            #settings {
                height: 100%;
                width: 400px;
                position: fixed;
                z-index: 1;
                top: 0;
                left: -500px;
                background-color: #13151b;
                overflow-x: hidden;
                transition: 0.5s;
                border-right: 1.5px solid;
                border-color: #31363c;
            }
            
            #settings[class="open"] {
                left: 0;
            }
            
            #settings[class="close"] {
                left: -500px;
            }
            
            #closeSettings {
                border: none;
                position: absolute;
                top: 15px;
                right: 25px;
                font-size: 36px;
                margin-left: 50px;
                background-color: #000;
                color: #818181;
            }
            
            #closeButton {
                margin-top: 25px;
                margin-right: 16px;
                background-color: #0f1115;
                float: right;
                border: 1.5px solid;
                border-color: #31363c;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
            }
            
            #closeButton:hover {
                background-color: #22262c;
                border-color: #8d949d;
                transition-duration: 0.1s;
            }
            
            #closeButtonIcon {
                height: 20px;
                width: 20px;
            }
            
            /* margins match finish button */
            #openButton {
                margin-left: 15px;
                background-color: #0f1115;
                color: #31363c;
                font-size: 65px;
                border: none;
                cursor: pointer;
            }
            
            #controls {
                background-color: royalblue;
                top: 50px;
            }

            #controls * {
                float: right;
                margin: 50px 0px 50px 0px;
                color: royalblue;
            }

            #controls label {
                float: left;
                margin-left: 50px;
            }
        </style>`;

/*         const styles = document.createElement('link');
        styles.setAttribute('id', 'settings-styles');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', './components/pomo-settings.css');
 */
        //Main Page open settings button
        const openButton = document.createElement('button');
        openButton.setAttribute('id', 'openButton');
        openButton.innerHTML = "&#9881;";

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
        longBreakSecondsNumber.setAttribute('value', '0');

        //shadow.appendChild(link);
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


                /* Events */
        //calmSetEvent
/*         this.calmSetEvent = new CustomEvent('calmSet', {
            bubbles: true,
            composed: true
          }); */
  
        //volumeSetEvent 
        this.volumeSetEvent = new CustomEvent('volumeSet', {
        bubbles: true,
        composed: true
        });

        //soundSetEvent
        this.soundSetEvent = new CustomEvent('soundSet', {
        bubbles: true,
        composed: true
        });
        //darkSetEvent
/*         this.darkSetEvent = new CustomEvent('darkSet', {
        bubbles: true,
        composed: true
        }); */
        //workSetEvent
        this.workSetEvent = new CustomEvent('workSet', {
        bubbles: true,
        composed: true
        });
        //shortBreakSetEvent
        this.shortBreakSetEvent = new CustomEvent('shortBreakSet', {
        bubbles: true,
        composed: true
        });
        //longBreakSetEvent
        this.longBreakSetEvent = new CustomEvent('longBreakSet', {
        bubbles: true,
        composed: true
        });



        /* Event Listeners */

        // listen for click on 'open' button to slide out panel
        openButton.onclick = () => {
            settingsPanel.setAttribute('class', 'open');
        }

        // listen for click on 'close' button to slide back
        closeButton.onclick = () => {
            settingsPanel.setAttribute('class', 'close');
        }

        //listen for click outside of settings panel to slide back
        document.onclick = (e) => {
            if (!settingsPanel.contains(e.target) && !(e.target == this)){
                settingsPanel.setAttribute('class', 'close');
            }
        }

        volumeSlide.oninput = () => {
            console.log("We've changed the volume through the slider.");
            this.volumeSet(volumeSlide.value);
        }

        volumeNumber.oninput = () => {
            console.log("We've changed the volume through the number");
            this.volumeSet(volumeNumber.value);
        }

        this.volumeSet = (volume) => {
            volumeSlide.value = volume;
            volumeNumber.value = volume;
            shadow.dispatchEvent(this.volumeSetEvent);
        }

        soundSelect.onchange = () => {
            console.log("We've selected a new sound. Should update these preferences.");
            shadow.dispatchEvent(this.soundSetEvent);
        }

        //calm on input
        //dark on input
        workMinutesNumber.oninput = () => {
            console.log("We've changed the workMinutes");
            this.workSet();
        }
        workSecondsNumber.oninput = () => {
            console.log("We've changed the workSeconds");
            this.workSet();
        }

        this.workSet = () => {
            let minutes = workMinutesNumber.value;
            let seconds = workSecondsNumber.value;
            let sum = minutes + seconds/60;
            //need to set local storage, change timer value, how to do?
            shadow.dispatchEvent(this.workSetEvent);
        }

        shortBreakMinutesNumber.oninput = () => {
            console.log("We've changed the shortBreakMinutes");
            this.shortBreakSet();
        }
        shortBreakSecondsNumber.oninput = () => {
            console.log("We've changed the shortBreakSeconds");
            this.shortBreakSet();
        }

        this.shortBreakSet = () => {
            let minutes = shortBreakMinutesNumber.value;
            let seconds = shortBreakSecondsNumber.value;
            let sum = minutes + seconds/60;
            //need to set local storage, change timer value, how to do?
            shadow.dispatchEvent(this.shortBreakSetEvent);
        }

        longBreakMinutesNumber.oninput = () => {
            console.log("We've changed the longBreakMinutes");
            this.longBreakSet();
        }
        longBreakSecondsNumber.oninput = () => {
            console.log("We've changed the longBreakSeconds");
            this.longBreakSet();
        }

        this.longBreakSet = () => {
            let minutes = longBreakMinutesNumber.value;
            let seconds = longBreakSecondsNumber.value;
            let sum = minutes + seconds/60;
            //need to set local storage, change timer value, how to do?
            shadow.dispatchEvent(this.longBreakSetEvent);
        }
    }
}

customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };