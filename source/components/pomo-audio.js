class PomoAudio extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const audio = document.createElement('audio');
    audio.setAttribute('id', 'alarm-sound');
    audio.setAttribute('src', '/media/audio/bike_chime.mp3');

    shadow.appendChild(audio);

    this.enabled = true;

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
      if (volume < 0 || volume > 100) {
        return;
      }

      audio.volume = volume * 0.01; // Scale range to 0 to 1.0
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
