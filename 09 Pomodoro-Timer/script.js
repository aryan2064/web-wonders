var DEFAULT_WORK = 25;
var DEFAULT_BREAK = 5;
var workMinutes = DEFAULT_WORK;
var breakMinutes = DEFAULT_BREAK;
var WORK_TIME = workMinutes * 60;
var BREAK_TIME = breakMinutes * 60;
var timeLeft = WORK_TIME;
var isRunning = false;
var isBreak = false;
var timerInterval = null;
var timerDisplay = document.getElementById('timer');
var modeDisplay = document.getElementById('mode');
var startBtn = document.getElementById('startBtn');
var pauseBtn = document.getElementById('pauseBtn');
var resetBtn = document.getElementById('resetBtn');
var card = document.getElementById('card');
var workInput = document.getElementById('workInput');
var breakInput = document.getElementById('breakInput');
function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  var minsStr = mins < 10 ? '0' + mins : '' + mins;
  var secsStr = secs < 10 ? '0' + secs : '' + secs;
  return minsStr + ':' + secsStr;
}
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  modeDisplay.textContent = isBreak ? 'Break Time' : 'Work Time';
  if (isBreak) {
    card.classList.add('break-mode');
  } else {
    card.classList.remove('break-mode');
  }
}
function playAlert() {
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 660;
  osc.type = 'sine';
  gain.gain.value = 0.3;
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}
function switchMode() {
  playAlert();
  if (isBreak) {
    isBreak = false;
    timeLeft = WORK_TIME;
  } else {
    isBreak = true;
    timeLeft = BREAK_TIME;
  }
  updateDisplay();
}
function tick() {
  if (timeLeft <= 0) {
    switchMode();
    return;
  }
  timeLeft--;
  updateDisplay();
}
function applySettings() {
  var newWork = parseInt(workInput.value) || DEFAULT_WORK;
  var newBreak = parseInt(breakInput.value) || DEFAULT_BREAK;
  if (newWork < 1) newWork = 1;
  if (newWork > 120) newWork = 120;
  if (newBreak < 1) newBreak = 1;
  if (newBreak > 60) newBreak = 60;
  workInput.value = newWork;
  breakInput.value = newBreak;
  workMinutes = newWork;
  breakMinutes = newBreak;
  WORK_TIME = workMinutes * 60;
  BREAK_TIME = breakMinutes * 60;
}
function startTimer() {
  if (isRunning) {
    return;
  }
  if (!isBreak && timeLeft === WORK_TIME) {
    applySettings();
    timeLeft = WORK_TIME;
  }
  workInput.disabled = true;
  breakInput.disabled = true;
  isRunning = true;
  startBtn.disabled = true;
  timerInterval = setInterval(tick, 1000);
  updateDisplay();
}
function pauseTimer() {
  if (!isRunning) {
    return;
  }
  isRunning = false;
  startBtn.disabled = false;
  clearInterval(timerInterval);
  timerInterval = null;
}
function resetTimer() {
  pauseTimer();
  applySettings();
  workInput.disabled = false;
  breakInput.disabled = false;
  isBreak = false;
  timeLeft = WORK_TIME;
  updateDisplay();
}
workInput.addEventListener('change', function () {
  if (isRunning) return;
  applySettings();
  if (!isBreak) {
    timeLeft = WORK_TIME;
    updateDisplay();
  }
});
breakInput.addEventListener('change', function () {
  if (isRunning) return;
  applySettings();
  if (isBreak) {
    timeLeft = BREAK_TIME;
    updateDisplay();
  }
});
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
updateDisplay();