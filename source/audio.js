const enabled = false;
var slider = document.getElementById("volume-slider")
var audio = document.getElementById("alarm-sound")
var btn = document.getElementById("btn")

let time = 10;

window.onload = function(){
    btn.onclick = e => {
        audio.play().then(() => { 
            audio.pause();
            audio.currentTime = 0;
        });
        countdown();
        btn.disabled = true;
        };

    /**
     * Changes volume based on slider value
     */
    slider.oninput = function(){
        audio.volume = this.value * 0.01;
    }
}

/**
 * Counts seconds down, checks for correct time to call function to play sound
 */
function countdown() {
pre.textContent = --time;
if(time === 5){
    playSound();
} else if(time === 0){
    // For actual code, change to next pomodoro mode
    return;
}
setTimeout(countdown, 1000);
}

/**
 * The sound should be played if sound is currently enabled
 */
function playSound() {
    if(enableSound(enabled)){
        audio.play(); 
    }
}

/**
 * Determines if sound should be played
 * @param {boolean} enabled - If sound is enabled or not
 */
function enableSound(enabled){
    if(enabled == true){return true;}
    return false;
}

/**
 * Set location of the sound to be played
 * @param {string} sound - Relative path of sound
 */
function setSound(sound){
    audio.src = sound;
}