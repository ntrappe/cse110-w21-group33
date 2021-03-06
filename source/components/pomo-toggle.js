class ToggleSwitch extends HTMLElement {
  constructor(mode1, mode2) {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const toggle_switch = document.createElement('label');  
    toggle_switch.setAttribute('class', 'switch');


    const toggle_checkbox = document.createElement('input');  
    toggle_checkbox.setAttribute('type', 'checkbox');

    const toggle_slider = document.createElement('div');  
    toggle_slider.setAttribute('class', 'slider');
    toggle_slider.setAttribute('id', `${mode1}Slider`);

    const light_mode = document.createElement('span');  
    light_mode.setAttribute('class', `${mode1}_mode`);
    light_mode.setAttribute('id', `${mode1}_mode`);
    light_mode.textContent = "On";

    const dark_mode = document.createElement('span');  
    dark_mode.setAttribute('class', `${mode2}_mode`);
    dark_mode.setAttribute('id', `${mode2}_mode`);
    dark_mode.textContent = "Off";

    /* Links Used
    https://stackoverflow.com/questions/44061473/move-text-on-toggle-switch-on-off
    https://www.w3schools.com/howto/howto_css_switch.asp
    */

    const style = document.createElement('style');
    style.textContent = `
      /* Hides the Checkbox */
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
        
      /* Size of toggle background*/
      .switch { 
        position: relative;
        display: inline-block;
        width: 100px;
        height: 50px;
      }

      /* Toggle Background*/
      .slider {
        border-radius: 30px; /* makes the slider box round*/
        position: absolute;
        cursor: pointer;
        top: 0;  /* Position of toggle background*/ 
        left: 0; 
        right: 0;
        bottom: 0;
        background-color:cyan;
        transition: .4s;
      }

      /*Creates the toggle button*/
      .slider:before {
        border-radius: 30px; /* Makes the button that you click on round*/
        position: absolute;
        content: "";
        height: 40px; /* Changes circle size*/
        width: 40px; /* Changes circle size*/
        left: 3px; /* Changes circle starting position (Left/Right)*/
        bottom: 5px; /* Changes circle starting position (Top/Bottom)*/
        background-color:green; /* Circle Color*/
        transition: .4s;
      }

      /* Changes the color of the slider when toggled*/
      input:checked + .slider {
        background-color: blue;
      }


      input:checked + .slider:before {
        transform: translateX(52px); /* How far the toggle circle moves*/
      }

      .${mode2}_mode,.${mode1}_mode {
        color: white; /*color of text (light/dark)*/
        position: absolute;
        /*transform: translate(-50%, -50%);*/
        top: 25%; /*Position of text*/
        left: 10%;
        font-size: 20px; /*Size of text*/
      }
    
      /* Hides dark mode text initially*/
      .${mode2}_mode {
        display:none;
      }
      /*Moves the light_mode text to the right*/
      .${mode1}_mode {
        display:block;
        left:50px;
      }`;

    shadow.append(style);
    shadow.appendChild(toggle_switch);
    toggle_switch.appendChild(toggle_checkbox);
    toggle_switch.appendChild(toggle_slider);
    toggle_slider.appendChild(light_mode);
    toggle_slider.appendChild(dark_mode);

    this.toggleSwitchEvent = new CustomEvent('toggleSwitch', {
      bubbles: true,
      composed: true,
      detail: {toggle: () => light_mode.style.display == 'block'}
    });

    toggle_slider.onclick = () => {
      if(dark_mode.style.display == 'block') {
        // Changes to Light Mode 
        dark_mode.style.display = 'none';
        light_mode.style.display = 'block';
      }
      else {
        //Changes to Dark Mode
        dark_mode.style.display = 'block';
        light_mode.style.display = 'none';
      }
      shadow.dispatchEvent(this.toggleSwitchEvent);
    } 

    this.setOn = () => {
      dark_mode.style.display = 'none';
      light_mode.style.display = 'block';
      shadow.dispatchEvent(this.toggleSwitchEvent);
    }

    this.setOff = () => {
      dark_mode.style.display = 'block';
      light_mode.style.display = 'none';
      shadow.dispatchEvent(this.toggleSwitchEvent);
    }
  }
}
customElements.define('toggle-switch', ToggleSwitch);

export {ToggleSwitch};