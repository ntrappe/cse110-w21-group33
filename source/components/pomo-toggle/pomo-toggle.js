/**
 * @module PomoToggle
 */

/* Links Used
https://stackoverflow.com/questions/44061473/move-text-on-toggle-switch-on-off
https://www.w3schools.com/howto/howto_css_switch.asp
*/
const TOGGLE_DELAY = 200;
const ENABLE_OPACITY = '1';
const DISABLE_OPACITY = '0.6';

class ToggleSwitch extends HTMLElement {
  constructor(mode1, mode2) {
    super();

    this.toggle = true;

    const shadow = this.attachShadow({ mode: 'open' });

    // Connect toggleSwitch to CSS
    const style = document.createElement('link');
    style.setAttribute('id', 'toggle-styles');
    style.setAttribute('rel', 'stylesheet');

    const toggleSwitch = document.createElement('label');
    toggleSwitch.setAttribute('class', 'switch');

    const toggleCheckbox = document.createElement('input');
    toggleCheckbox.setAttribute('type', 'checkbox');
    toggleCheckbox.setAttribute('disabled', 'disabled');

    const toggleSlider = document.createElement('div');
    toggleSlider.setAttribute('class', 'slider');
    toggleSlider.setAttribute('id', `${mode1}-slider`);

    const onMode = document.createElement('span');
    onMode.setAttribute('class', 'on-mode');
    onMode.setAttribute('id', `${mode1}-mode`);
    onMode.textContent = 'On';

    const offMode = document.createElement('span');
    offMode.setAttribute('class', 'off-mode');
    offMode.setAttribute('id', `${mode2}-mode`);
    offMode.textContent = 'Off';

    shadow.append(style);
    shadow.appendChild(toggleSwitch);
    toggleSwitch.appendChild(toggleCheckbox);
    toggleSwitch.appendChild(toggleSlider);
    toggleSlider.appendChild(onMode);
    toggleSlider.appendChild(offMode);

    this.toggleSwitchEvent = new CustomEvent('toggleSwitch', {
      bubbles: true,
      composed: true,
      detail: { toggle: () => this.toggle },
    });

    /**
     * Toggle slider from one mode to another on click with delay
     */
    toggleSlider.onclick = () => {
      if (this.toggle) {
        this.setOff();
        shadow.dispatchEvent(this.toggleSwitchEvent);
      } else {
        this.setOn();
        shadow.dispatchEvent(this.toggleSwitchEvent);
      }
      toggleSlider.style.pointerEvents = 'none';
      setTimeout(() => {
        toggleSlider.style.pointerEvents = 'auto';
      }, TOGGLE_DELAY);
    };

    /**
     * Helper function to toggle slider on
     */
    this.setOn = () => {
      toggleCheckbox.checked = false;
      offMode.style.display = 'none';
      onMode.style.display = 'block';
      this.toggle = true;
    };

    /**
     * Helper function to toggle slider off
     */
    this.setOff = () => {
      toggleCheckbox.checked = true;
      offMode.style.display = 'block';
      onMode.style.display = 'none';
      this.toggle = false;
    };

    /**
     * Helper function to enable toggle switch
     */
    this.enable = () => {
      toggleSlider.style.pointerEvents = 'auto';
      toggleSlider.style.opacity = ENABLE_OPACITY;
    };

    /**
     * Helper function to disable toggle switch
     */
    this.disable = () => {
      toggleSlider.style.pointerEvents = 'none';
      toggleSlider.style.opacity = DISABLE_OPACITY;
    };

    /**
     * Toggles light/dark color scheme for toggle switch
     * @param {Boolean} dark turn dark color scheme if dark mode is on
     */
    this.setDark = (dark) => {
      if (dark) {
        style.setAttribute('href', './components/pomo-toggle/pomo-toggle.css');
      } else {
        style.setAttribute('href', './components/pomo-toggle/pomo-toggle-light.css');
      }
    };
  }
}
customElements.define('toggle-switch', ToggleSwitch);

export default ToggleSwitch;
