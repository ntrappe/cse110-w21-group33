const DEFAULT_SOURCE = './assets/audio/bike_chime.mp3';
const VOLUME_SCALER = 0.01;
const MIN_VOLUME = 0;
const MAX_VOLUME = 100;

class PomoAudio extends HTMLElement {
  constructor() {
    super();

    this.enabled = true;

    const shadow = this.attachShadow({ mode: 'open' });

    const audio = document.createElement('audio');
    audio.setAttribute('id', 'alarm-sound');
    audio.setAttribute('src', DEFAULT_SOURCE);

    shadow.appendChild(audio);

    /**
     * Allows the sound to be played
     */
    this.enableSound = () => {
      this.enabled = true;
    };

    /**
     * Prevents the sound from being played
     */
    this.disableSound = () => {
      this.enabled = false;
    };

    /**
     * Play the current sound at the current volume
     */
    this.playSound = () => {
      if (this.enabled) {
        audio.play();
      }
    };

    /**
     * Set the volume of the audio component
     * @param {Number} volume - Volume level from 0 to 100
     */
    this.setVolume = (volume) => {
      // Invalid input received
      if (volume < MIN_VOLUME || volume > MAX_VOLUME) {
        return;
      }

      audio.volume = volume * VOLUME_SCALER; // Scale range to 0 to 1.0
    };

    /**
     * Set location of the sound to be played
     * @param {String} sound - Absolute path of sound
     */
    this.setSound = (sound) => {
      audio.src = sound;
    };
  }
}

customElements.define('pomo-audio', PomoAudio);

export default PomoAudio;
