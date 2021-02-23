console.log("Control loaded!");

const timer = document.getElementById('timer');

timer.addEventListener('timerStart', () => {
    console.log('got a start');
});

timer.addEventListener('timerReset', () => {
    console.log('got a reset');
});

timer.addEventListener('timerFinish', () => {
    console.log('got a finish');
});

timer.addEventListener('tick', (event) => {
    console.log(event.detail.timeRemaining());
});