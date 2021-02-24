class PomoSettings extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = 
        `<style>
        #settings {
            height: 100%;
            width: 500px;
            position: fixed;
            z-index: 1;
            top: 0;
            left: -500px;
            background-color: #000;
            overflow-x: hidden;
            transition: 0.5s;
            padding-top: 60px;
        }
        #settings div{
            margin-top: 50px;
            margin-bottom: 50px;
            margin-right: 50px;
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

        #settings label{
            padding: 8px 8px 8px 32px;
            color: #818181;
        }
        #volume, #soundOptions{
            color: #818181;
            float: right;
        }
        </style>`

        this.open = document.createElement('button');
        this.open.setAttribute("id", "openSideBar");
        this.open.setAttribute("style", "font-size:30px");
        this.open.innerHTML = "&#9776;";
        shadow.appendChild(this.open);

        this.settings = document.createElement('div');
        this.settings.setAttribute("id", "settings");

        this.close = this.settings.appendChild(document.createElement("input"));
        this.close.setAttribute("id", "closeSettings");
        this.close.setAttribute("type", "button");
        this.close.setAttribute("value", "X");

        this.volume = this.settings.appendChild(document.createElement("div"));
        this.volume.innerHTML = `<label>Volume</label>`;
        this.volumeSlide = document.createElement("input");
        this.volumeSlide.setAttribute("type", "range");
        this.volumeSlide.setAttribute("id", "volume");
        this.volumeSlide.setAttribute("min", "0");
        this.volumeSlide.setAttribute("max", "100");
        this.volumeSlide.setAttribute("value", "100");
        this.volume.appendChild(this.volumeSlide);

        this.audio = this.settings.appendChild(document.createElement("audio"));
        this.audio.setAttribute("id", "horn-sound");
        this.audio.setAttribute("src", "../media/audio/party-horn.mp3");

        const sound = this.settings.appendChild(document.createElement("div"));
        sound.innerHTML = 
          `<label for="soundOptions">Sound</label>
          <select id="soundOptions">
              <option value="Honk">Honk</option>
              <option value="Moo">Moo</option>
              <option value="Meow">Meow</option>
          </select>`;

        const calm = this.settings.appendChild(document.createElement("div"));
        calm.innerHTML = `<label for="calm">Calm Mode</label>`;
        shadow.appendChild(this.settings);

        this.open.addEventListener('click', () => {
          this.openBar();
        });

        this.close.addEventListener('click', () => {
          this.closeBar();
        });

        document.addEventListener('click', (e) => {
          if(!this.settings.contains(e.target) && !(e.target==this)){
            this.closeBar();
          }
        });

        this.volumeSlide.addEventListener('change', () => {
          this.handleVolumeChange();
        })
      }

      openBar = () => {
        this.settings.style.left = "0";
      }
      
      closeBar = () => {
        this.settings.style.left = "-500px";
      }

      handleVolumeChange = () => {
        this.audio.volume = this.volumeSlide.value/100;
        this.audio.play();
      }
}

customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };

