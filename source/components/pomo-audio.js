class PomoAudio extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const slider = document.createElement('input');
        slider.setAttribute('id', 'volume-slider');
        slider.setAttribute('name', 'volume-slider');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '0');
        slider.setAttribute('max', '100');

        const audio = document.createElement('audio');
        audio.setAttribute('id', 'alarm-sound');
        audio.setAttribute('src', '/media/audio/zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3')

        const btn = document.createElement('btn');
        btn.setAttribute('id', 'btn');
        btn.textContent = 'start countdown';
        
        shadow.appendChild(slider);
        shadow.appendChild(audio);
        shadow.appendChild(btn);

        const enabled = false;

        btn.onclick = e => {
            audio.play();
        };

        /**
         * Changes volume based on slider value
         */
        slider.oninput = function(){
            audio.volume = this.value * 0.01;
        }

        /**
         * Counts seconds down, checks for correct time to call function to play sound
         */
        this.countdown = () => {
            pre.textContent = --time;
            if(time === 5){
                playSound();
            } else if(time === 0){
                // For actual code, change to next pomodoro mode
                return;
            }
            setTimeout(countdown, 1000);
        }

        /**
         * The sound should be played if sound is currently enabled
         */
        this.playSound = () => {
            if(enableSound(enabled)){
                audio.play(); 
            }
        }

        /**
         * Determines if sound should be played
         * @param {boolean} enabled - If sound is enabled or not
         */
        this.enableSound = (enabled) => {
            if(enabled == true){return true;}
            return false;
        }

        /**
         * Set location of the sound to be played
         * @param {string} sound - Relative path of sound
         */
        this.setSound = (sound) => {
            audio.src = sound;
        }
      }
}

customElements.define('pomo-audio', PomoAudio);

export { PomoAudio };