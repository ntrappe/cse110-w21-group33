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

    // the lightbox
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal-content');
    modalContent.setAttribute('id', 'info-modal-content');

    // the main info Content
    const infoContent = document.createElement('div');
    infoContent.setAttribute('id', 'info-content');
    const infoTitle = document.createElement('h3');
    infoTitle.textContent = 'Information';

    // info on pomodoro technique
    const pomoTechHolder = document.createElement('div');
    pomoTechHolder.setAttribute('class', 'info-table');
    const pomoTechLabel = document.createElement('p');
    pomoTechLabel.setAttribute('class', 'info-table-label');
    pomoTechLabel.textContent = 'Pomodoro Technique';
    const pomoTechContent = document.createElement('p');
    pomoTechContent.setAttribute('class', 'info-table-content');
    pomoTechContent.innerHTML = `The Pomodoro Technique was created by 
    <b>Francesco Cirillo</b> in order to better manage time and improve productivity. The 
    traditional <b>Pomodoro Technique</b> consisted of sets. Each set was divided into <b>4</b> 
    work sessions-called pomodoros-with the first 3 followed by a short break and the final 
    work session followed by a long break. Cirillo used <b>25</b> minute pomodoros, <b>5</b> 
    minute short breaks, and <b>15</b> minute long breaks. If a work session is interrupted, that 
    Pomodoro is considered “forfeited” and the user must restart it.`;
    pomoTechHolder.appendChild(pomoTechLabel);
    pomoTechHolder.appendChild(pomoTechContent);

    // info on our web app
    const appHolder = document.createElement('div');
    appHolder.setAttribute('class', 'info-table');
    const appLabel = document.createElement('div');
    appLabel.setAttribute('class', 'info-table-label');
    appLabel.textContent = 'Our Pomodoro App';
    const appContent = document.createElement('p');
    appContent.setAttribute('class', 'info-table-content');
    appContent.innerHTML = `Our app is heavily inspired by the <b>Pomodoro Technique</b>. We use 
    the concept of a set and only allow users to start and reset work sessions and breaks. However, 
    we wanted to allow our users flexibility in modifying the lengths of these intervals to match 
    their work styles.`;
    appHolder.appendChild(appLabel);
    appHolder.appendChild(appContent);

    // info on how to use this web app
    const howToHolder = document.createElement('div');
    howToHolder.setAttribute('class', 'info-table');
    const howToLabel = document.createElement('p');
    howToLabel.setAttribute('class', 'info-table-label');
    howToLabel.textContent = 'How to Use';
    const howToContent = document.createElement('p');
    howToContent.setAttribute('class', 'info-table-content');
    howToContent.innerHTML = `To start using our app, press the <b>Start</b> button or the 
    <kbd>s</kbd> key on your keyboard in order to start the timer. If you need to forfeit 
    and restart the work session for any reason click the <br>Reset</b> button or the 
    <kbd>r</kbd> key on your keyboard. You can even open up settings by clicking on 
    <b>'Settings'</b> or using the <kbd>q</kbd> on your keyboard.`;
    howToHolder.appendChild(howToLabel);
    howToHolder.appendChild(howToContent);

    // info on how to change settings
    const settingsHolder = document.createElement('div');
    settingsHolder.setAttribute('class', 'info-table');
    const settingsLabel = document.createElement('p');
    settingsLabel.setAttribute('class', 'info-table-label');
    settingsLabel.textContent = 'How to Use Settings';
    const settingsContent = document.createElement('p');
    settingsContent.setAttribute('class', 'info-table-content');
    settingsContent.innerHTML = `For our settings option, you can customize your timer for:
    <ul>
      <li><b>Work and Break Durations</b></li>
        <ul>
          <li>For Work duration, you can change the duration to be between 
          <b>1 - 60m</b></li>
          <li>For Short Break duration, you can change the duration to be between 
          <b>1 - 60m</b></li>
          <li>For Long Break duration, you can change the duration to be between 
          <b>1 - 60m</b></li>
        </ul>
      <li><b>Calm Mode</b></li>
        <ul>
          <li>If seeing the seconds tick down every second is distracting, you can enable calm 
          mode which will only display the minutes</li>
        </ul>
      <li><b>Dark Mode</b></li>
        <ul>
          <li>Working at night and your screen is too bright? You can enable dark mode</li>
        </ul>
      <li><b>Audio & Volume</b></li>
        <ul>
          <li>If you find yourself tired of hearing the same alarm you can select from various 
          audio selections, as well as changing the volume</li>
        </ul>
      <li><b>Accessibility</b></li>
        <ul>
          <li>If you dislike keyboard shortcuts you can disable them here</li>
        </ul>
    </ul>`;
    settingsHolder.appendChild(settingsLabel);
    settingsHolder.appendChild(settingsContent);

    // info on how to use stats
    const statsHolder = document.createElement('div');
    statsHolder.setAttribute('class', 'info-table');
    const statsLabel = document.createElement('p');
    statsLabel.setAttribute('class', 'info-table-label');
    statsLabel.textContent = 'How to Use Stats';
    const statsContent = document.createElement('p');
    statsContent.setAttribute('class', 'info-table-content');
    statsContent.innerHTML = `For our statistics page, you can see the:
    <ul>
      <li>Amount of Work completed for the day</li>
      <li>Amount of Short Breaks taken</li>
      <li>Amount of Long Breaks taken</li>
      <li>Amount of Work Interruption</li>
    </ul>
    `;
    statsHolder.appendChild(statsLabel);
    statsHolder.appendChild(statsContent);

    // add element to containers
    infoContent.appendChild(infoTitle);
    infoContent.appendChild(pomoTechHolder);
    infoContent.appendChild(appHolder);
    infoContent.appendChild(howToHolder);
    infoContent.appendChild(settingsHolder);
    infoContent.appendChild(statsHolder);

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
