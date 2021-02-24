class ToggleSwitch extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');
    let toggle_switch = document.createElement('label');  
    toggle_switch.setAttribute('class', 'switch');


    let toggle_checkbox = document.createElement('input');  
    toggle_checkbox.setAttribute('type', 'checkbox');

    let toggle_slider = document.createElement('div');  
    toggle_slider.setAttribute('class', 'slider');

    let light_mode = document.createElement('span');  
    light_mode.setAttribute('class', 'light_mode');
    light_mode.textContent = "Light"

    let dark_mode = document.createElement('span');  
    dark_mode.setAttribute('class', 'dark_mode');
    dark_mode.textContent = "Dark"

    shadow.append(style);
    shadow.appendChild(toggle_switch);
    toggle_switch.appendChild(toggle_checkbox);
    toggle_switch.appendChild(toggle_slider);
    toggle_slider.appendChild(light_mode);
    toggle_slider.appendChild(dark_mode);

    /* Links Used
    https://stackoverflow.com/questions/44061473/move-text-on-toggle-switch-on-off
    https://www.w3schools.com/howto/howto_css_switch.asp
    */
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
      
      /* Toggle Background */
      .slider {
        border-radius: 30px; /* makes the slider box round*/
        position: absolute;
        cursor: pointer;
        top: 0;  /* Position of toggle background */ 
        left: 0; 
        right: 0;
        bottom: 0;
        background-color:cyan;
        /* Don't think this does anything
        -webkit-transition: .4s;*/
        transition: .4s;
      }
      
      /*Creates the toggle button*/
      .slider:before {
        border-radius: 30px; /* Makes the button that you click on round*/
        position: absolute;
        content: "";
        height: 40px; /* Changes circle size */
        width: 40px; /* Changes circle size */
        left: 3px; /* Changes circle starting position (Left/Right)*/
        bottom: 5px; /* Changes circle starting position (Top/Bottom)*/
        background-color:green; /* Circle Color*/
        transition: .4s;
      }
      
      /* Changes the color of the slider when toggled */
      input:checked + .slider {
        background-color: blue
      }
    
    
      input:checked + .slider:before {
        /* These don't seem to do anything
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);*/
        transform: translateX(52px); /* How far the toggle circle moves */
      }
    
    
      .dark_mode,.light_mode {
        color: white; /* color of text (light/dark) */
        position: absolute;
        /*transform: translate(-50%, -50%);*/
        top: 25%; /*Position of text*/
        left: 10%;
        font-size: 20px; /*Size of text */
      }
    
      /* Hides dark mode text initially*/
      .dark_mode {
        display:none;
      }
      /*Moves the light_mode text to the right*/
      .light_mode {
        display:block;
        left:50px;
      }  
    `;
    toggle_slider.onclick = () => {
      if(dark_mode.style.display == 'block') {
        /* Changes to Light Mode */
        dark_mode.style.display = 'none';
        light_mode.style.display = 'block';
        let body = document.getElementById('test');
        body.style.fontFamily = 'Open Sans';
        body.style.backgroundColor = 'white';
      }
      else {
        localStorage.setItem('test_item_to_clear',100);
        var date = new Date();
        if(localStorage.getItem('prev_Year')=='undefined') {
          localStorage.setItem("prev_Year",date.getFullYear());
          localStorage.setItem("prev_Month",date.getMonth()+1);
          localStorage.setItem("prev_Date",date.getDate());
        }
        //if (date.getFullYear() > localStorage.getItem('prev_Year') || date.getMonth() + 1 > localStorage.getItem('prev_Month') || date.getDate() > localStorage.getItem('prev_date')) {
          //if(date.getHours() > '3') {
            if(date.getSeconds() >  '1'){
            localStorage.setItem("prev_Year",date.getFullYear());
            localStorage.setItem("prev_Month",date.getMonth()+1);
            localStorage.setItem("prev_Date",date.getDate());
            localStorage.setItem('test_item_to_clear',0)
          }
        //}
        
        localStorage.setItem("previous Date",dateNum)
        /*Changes to Dark Mode*/
        dark_mode.style.display = 'block';
        light_mode.style.display = 'none';
        let body = document.getElementById('test');
        body.style.fontFamily = 'Open Sans';
        body.style.backgroundColor = '#0e1116';
      }
    }

  }

}
customElements.define('toggle-switch', ToggleSwitch);

export {ToggleSwitch};