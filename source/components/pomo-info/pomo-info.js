class PomoInfo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    // wrapper for element
    const wrapper = document.createElement('div');

    // style element for the component
    const infoStyle = document.createElement('link');
    infoStyle.setAttribute('id', 'info-styles');
    infoStyle.setAttribute('rel', 'stylesheet');
    infoStyle.setAttribute('href', './components/pomo-info/pomo-info.css');
    shadow.append(infoStyle);

    // the modal window
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'info-modal');
    modal.style.display = 'none';
    modal.onclick = (event) => {
      // close lightbox when click outside of the content area
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // info button
    const infoButton = document.createElement('button');
    infoButton.setAttribute('id', 'info-button');

    const infoIcon = document.createElement('img');
    infoIcon.setAttribute('id', 'info-button-icon');
    infoIcon.setAttribute('src', './assets/i_info.png');
    infoIcon.textContent = 'Info';

    infoButton.appendChild(infoIcon);

    infoButton.onclick = () => {
      modal.style.display = 'block';
    };

    // the lightbox
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    modalContent.setAttribute('id', 'info-modal-content');

    // the main info Content
    const infoContent = document.createElement('div');
    infoContent.setAttribute('id', 'info-content');
    const title = document.createElement('h1');
    title.innerHTML = 'Information';

    const content = document.createElement('div');
    content.innerHTML = `<h2>Pomodoro Technique</h2> The <b>Pomodoro Technique</b> was created by 
    <b>Francesco Cirillo</b> in order to better manage time and improve productivity. The 
    traditional <b>Pomodoro Technique</b> consisted of sets. Each set was divided into <b>4</b> 
    work sessions. Each of these work sessions were called a "pomodoro". After each of the first
    three pomodoros, the user was allowed a short break. After the final pomodoro, they were given
    a long break. Cirillo used <b>25</b> minute pomodoros, <b>5</b> minute short breaks, and 
    <b>15</b> minute long breaks. If a work session is interrupted, that Pomodoro is considered 
    “forfeited” and the user must restart it. <br/> 
    <h2>Our App</h2> 
    Our app is heavily inspired by the <b>Pomodoro Technique</b>. We use the concept of a set and 
    only allow users to start and reset work sessions and breaks. However, we wanted to allow our 
    users flexibility in modifying the lengths of these intervals to match their work styles. <br/>
    <h3>Getting Started</h3> 
    <ul>
      <li> To begin using our app, press the <b>Start</b> button or the <b>s</b> 
    key on your keyboard in order to start the timer. If you need to forfeit and restart the work 
    session for any reason click the <br>Reset</b> button or the <b>r</b> key on your keyboard.
    </ul>
    <h3>Settings</h3>
    For our settings option, you can customize your timer for:
    <ul>
      <li>Durations of Work, Short Break, & Long Break</li>
        <ul>
          <li>For Work duration, you can change the duration to be between 1 - 60m</li>
          <li>For Short Break duration, you can change the duration to be between 1 - 60m</li>
          <li>For Long Break duration, you can change the duration to be between 1 - 60m</li>
        </ul>
      <li>Calm Mode</li>
        <ul>
          <li>If seeing the seconds tick down every second is distracting, you can enable calm mode which will only display the minutes</li>
        </ul>
      <li>Dark Mode</li>
        <ul>
          <li>Working at night and your screen is too bright? You can enable dark mode</li>
        </ul>
      <li>Audio & Volume</li>
        <ul>
          <li>If you find yourself tired of hearing the same alarm you can select from various audio selections, as well as changing the volume</li>
        </ul>
      <li>Accessibility</li>
        <ul>
          <li>If you dislike keyboard shortcuts you can disable them here</li>
        </ul>
    </ul>
    <h3>Statistics</h3> 
    <ul>
      <li>For our statistics page, you can see the:</li> 
        <ul>
          <li>Amount of Work completed for the day</li>
          <li>Amount of Short Breaks taken</li>
          <li>Amount of Long Breaks taken</li>
          <li>Amount of Work Interruption</li>
        </ul>
    </ul>
    `;

    // button to close the modal window
    const closeButton = document.createElement('div');
    closeButton.setAttribute('class', 'close-button');
    closeButton.setAttribute('id', 'info-close-button');
    closeButton.setAttribute('class', 'button-off');
    closeButton.onclick = () => {
      modal.style.display = 'none';
    };
    closeButton.innerHTML = '&times;';

    /* mimic a button hover event */
    closeButton.addEventListener('mouseover', () => {
      closeButton.setAttribute('class', 'button-on');
    });

    closeButton.addEventListener('mouseout', () => {
      closeButton.setAttribute('class', 'button-off');
    });

    // add element to containers
    infoContent.appendChild(title);
    infoContent.appendChild(content);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(infoContent);
    modal.appendChild(modalContent);
    wrapper.appendChild(modal);
    wrapper.appendChild(infoButton);

    shadow.appendChild(wrapper);

    /**
     * Allows the control to open the info page
     */
    this.enableInfo = () => {
      infoButton.disabled = false;
    };

    /**
     * Prevent the control from open the info page
     */
    this.disableInfo = () => {
      infoButton.disabled = true;
    };

    /**
     * Modify elements' data-mode to dark-mode or light-mode
     * @param {Boolean} dark  indicate whether or not the setting is in dark mode
     */
    this.setDark = (dark) => {
      if (dark) {
        infoStyle.setAttribute('href', './components/pomo-info/pomo-info.css');
        infoIcon.setAttribute('src', './assets/i_info.png');
      } else {
        infoStyle.setAttribute('href', './components/pomo-info/pomo-info-light.css');
        infoIcon.setAttribute('src', './assets/i_info_light.png');
      }
    };
  }
}

customElements.define('pomo-info', PomoInfo);

export default PomoInfo;
