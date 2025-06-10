let timerInterval = null;
let totalSeconds = 0;

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('display');
const message = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(totalSecs) {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    
    const hStr = h < 10 ? '0' + h : h;
    const mStr = m < 10 ? '0' + m : m;
    const sStr = s < 10 ? '0' + s : s;
    
    return hStr + ':' + mStr + ':' + sStr;
}

function updateDisplay() {
    totalSeconds = totalSeconds - 1;
    display.textContent = formatTime(totalSeconds);
    
    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        display.textContent = '00:00:00';
        message.textContent = "Time's up!";
        startBtn.disabled = false;
    }
}

function startTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
        message.textContent = 'Please enter a valid time';
        return;
    }
    
    if (timerInterval !== null) {
        return;
    }
    
    message.textContent = '';
    totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    display.textContent = formatTime(totalSeconds);
    startBtn.disabled = true;
    
    timerInterval = setInterval(updateDisplay, 1000);
}

function resetTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    totalSeconds = 0;
    display.textContent = '00:00:00';
    message.textContent = '';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    startBtn.disabled = false;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);