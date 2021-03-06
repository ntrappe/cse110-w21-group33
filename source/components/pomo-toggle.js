class ToggleSwitch extends HTMLElement {
  constructor(mode1, mode2) {
    super();

    this.toggle = true;

    const shadow = this.attachShadow({mode: 'open'});
    const toggleSwitch = document.createElement('label');  
    toggleSwitch.setAttribute('class', 'switch');


    const toggleCheckbox = document.createElement('input');  
    toggleCheckbox.setAttribute('type', 'checkbox');
    toggleCheckbox.setAttribute('disabled', 'disabled');

    const toggleSlider = document.createElement('div');  
    toggleSlider.setAttribute('class', 'slider');
    toggleSlider.setAttribute('id', `${mode1}Slider`);

    const onMode = document.createElement('span');  
    onMode.setAttribute('class', `${mode1}_mode`);
    onMode.setAttribute('id', `${mode1}_mode`);
    onMode.textContent = "On";

    const offMode = document.createElement('span');  
    offMode.setAttribute('class', `${mode2}_mode`);
    offMode.setAttribute('id', `${mode2}_mode`);
    offMode.textContent = "Off";

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
    
      /* Hides offMode text initially*/
      .${mode2}_mode {
        display:none;
      }
      /*Moves the onMode text to the right*/
      .${mode1}_mode {
        display:block;
        left:50px;
      }`;

    shadow.append(style);
    shadow.appendChild(toggleSwitch);
    toggleSwitch.appendChild(toggleCheckbox);
    toggleSwitch.appendChild(toggleSlider);
    toggleSlider.appendChild(onMode);
    toggleSlider.appendChild(offMode);

    this.toggleSwitchEvent = new CustomEvent('toggleSwitch', {
      bubbles: true,
      composed: true,
      detail: {toggle: () => this.toggle}
    });

    toggleSlider.onclick = () => {
      toggleCheckbox.checked = !toggleCheckbox.checked;
      if(this.toggle){
        this.setOff();
      }
      else{
        this.setOn();
      }
      toggleSlider.style.pointerEvents = "none";
      setTimeout(() => {toggleSlider.style.pointerEvents = "auto";}, 200);
    } 

    this.setOn = () => {
      offMode.style.display = 'none';
      onMode.style.display = 'block';
      this.toggle = true;
      shadow.dispatchEvent(this.toggleSwitchEvent);
    }

    this.setOff = () => {
      offMode.style.display = 'block';
      onMode.style.display = 'none';
      this.toggle = false;
      shadow.dispatchEvent(this.toggleSwitchEvent);
    }
  }
}
customElements.define('toggle-switch', ToggleSwitch);

export {ToggleSwitch};