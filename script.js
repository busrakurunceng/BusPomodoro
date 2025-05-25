let timer;
let isRunning = false;
let isBreak = false;
let minutes = 45;
let seconds = 0;
let cycle = 1;

const timerDisplay = document.getElementById('timer');
const sessionType = document.getElementById('session-type');
const cycleDisplay = document.getElementById('cycle');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function updateDisplay() {
  let min = minutes.toString().padStart(2, '0');
  let sec = seconds.toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  cycleDisplay.textContent = `Tur: ${cycle}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        // Ses efekti buraya eklenebilir 🎸
        if (isBreak) {
          cycle++;
          startFocus();
        } else {
          if (cycle % 3 === 0) {
            startBreak(30); // Büyük mola
          } else {
            startBreak(10);
          }
        }
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function startFocus() {
  isBreak = false;
  minutes = 45;
  seconds = 0;
  sessionType.textContent = "Odaklanma Zamanı";
  updateDisplay();
  startTimer();
}

function startBreak(duration) {
  isBreak = true;
  minutes = duration;
  seconds = 0;
  sessionType.textContent = "Mola Zamanı";
  updateDisplay();
  startTimer();
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isBreak = false;
  minutes = 45;
  seconds = 0;
  cycle = 1;
  sessionType.textContent = "Odaklanma Zamanı";
  updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
