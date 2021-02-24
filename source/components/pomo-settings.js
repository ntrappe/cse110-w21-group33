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
            left: 0px;
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
        const open = document.createElement('button');
        open.setAttribute("id", "openSideBar");
        open.setAttribute("style", "font-size:30px");
        open.setAttribute("onclick", "openBar");
        open.innerHTML = "&#9776;";
        shadow.appendChild(open);

        const settings = document.createElement('div');
        settings.setAttribute("id", "settings");

        const close = settings.appendChild(document.createElement("input"));
        close.setAttribute("id", "closeSettings");
        close.setAttribute("type", "button");
        close.setAttribute("value", "X");
        close.setAttribute("onclick", "closeBar");

        const volume = settings.appendChild(document.createElement("div"));
        volume.innerHTML = 
          `<label>Volume</label>
          <input type="range" id="volume" min="0" max="100" value="100">`;

        const sound = settings.appendChild(document.createElement("div"));
        sound.innerHTML = 
          `<label for="soundOptions">Sound</label>
          <select id="soundOptions">
              <option value="Honk">Honk</option>
              <option value="Moo">Moo</option>
              <option value="Meow">Meow</option>
          </select>`;

        const calm = settings.appendChild(document.createElement("div"));
        calm.innerHTML = `<label for="calm">Calm Mode</label>`;
        shadow.appendChild(settings);
      }
}

const openBar = () => {
  document.getElementById("sideBar").style.left = "0";
}

const closeBar = () => {
  document.getElementById("settings").style.left = "-500px";
}

document.addEventListener('click', (e) => {
  let settings = document.getElementById('settings');
  let openBtn = document.getElementById('openSideBar');
  if (!settings.contains(e.target) && !(e.target == openBtn)) {
      closeBar;
  }
})


customElements.define('pomo-settings', PomoSettings);

export { PomoSettings };

