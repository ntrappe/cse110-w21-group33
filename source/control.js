console.log("Control loaded!");

const timer = document.getElementById('timer');

timer.addEventListener('timerStart', () => {
    alert('got a start');
});

timer.addEventListener('timerReset', () => {
    alert('got a reset');
});