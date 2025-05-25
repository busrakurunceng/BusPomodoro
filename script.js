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

const tickSound = new Audio("sounds/tick.mp3");
const guitarSound = new Audio("sounds/guitar.mp3");
tickSound.loop = true;
let isMuted = false;


function updateDisplay() {
  let min = minutes.toString().padStart(2, '0');
  let sec = seconds.toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  cycleDisplay.textContent = `Tur: ${cycle}`;

  const totalSeconds = (isBreak ? (minutes > 10 ? 1800 : 600) : 2700); // 45 dakika odak: 2700 saniye
  const currentSeconds = minutes * 60 + seconds;
  const progress = (currentSeconds / totalSeconds) * 282.6;
  document.getElementById('progress-ring').style.strokeDashoffset = 282.6 - progress;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  if (!isMuted) {
  tickSound.play();
  guitarSound.currentTime = 0;
  guitarSound.play();

  // 2 saniye sonra durdur
  setTimeout(() => {
    guitarSound.pause();
    guitarSound.currentTime = 0;
  }, 2000);
}


  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        tickSound.pause();
        tickSound.currentTime = 0;

        if (isBreak) {
          cycle++;
          startFocus();
        } else {
          if (cycle % 3 === 0) {
            startBreak(30); // Büyük mola
          } else {
            startBreak(10); // Normal mola
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
  const { focus } = getDurations();
  isBreak = false;
  minutes = focus;
  seconds = 0;
  sessionType.textContent = "Odaklanma Zamanı";
  updateDisplay();
  startTimer();
}

function startBreak(length) {
  const { shortBreak, longBreak } = getDurations();
  isBreak = true;
  minutes = (length === 30) ? longBreak : shortBreak;
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

  tickSound.pause();
  tickSound.currentTime = 0;
  guitarSound.pause();
  guitarSound.currentTime = 0;
}

document.getElementById("mute-btn").addEventListener("click", () => {
  isMuted = !isMuted;
  if (isMuted) {
    tickSound.pause();
    document.getElementById("mute-btn").textContent = "🔇 TikTak Sesi: Kapalı";
  } else {
    if (isRunning) tickSound.play();
    document.getElementById("mute-btn").textContent = "🔈 TikTak Sesi: Açık";
  }
});
document.getElementById('theme-switch').addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
});

function getDurations() {
  const focus = parseInt(document.getElementById('focus-time').value);
  const shortBreak = parseInt(document.getElementById('short-break').value);
  const longBreak = parseInt(document.getElementById('long-break').value);
  return { focus, shortBreak, longBreak };
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
