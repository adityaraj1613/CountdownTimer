let countdown;
let isRunning = false;
let timeLeft = 0;
const timerDisplay = document.getElementById('timer');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('save');
const historyList = document.getElementById('history');
const presets = document.querySelectorAll('.presets button');
const needle = document.getElementById('needle');

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (isRunning) return;
    if (timeLeft === 0) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid number of hours, minutes, and/or seconds.');
            return;
        }
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;
        updateDisplay();
    }
    isRunning = true;
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
            updateNeedle();
        } else {
            clearInterval(countdown);
            isRunning = false;
            alert('Time is up!');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = 0;
    updateDisplay();
    needle.style.transition = 'none'; // Remove transition during reset
    needle.style.transform = 'rotate(0deg)'; // Reset needle to initial position
}

function saveTimer() {
    const timerName = prompt('Enter a name for this timer:');
    if (timerName) {
        const time = formatTime(timeLeft);
        const li = document.createElement('li');
        li.textContent = `${timerName}: ${time}`;
        historyList.appendChild(li);
    }
}

function setPresetTime(e) {
    const presetTime = e.target.getAttribute('data-time');
    timeLeft = parseInt(presetTime);
    updateDisplay();
    updateNeedle();
}

function updateNeedle() {
    const totalSeconds = (parseInt(hoursInput.value) || 0) * 3600 + (parseInt(minutesInput.value) || 0) * 60 + (parseInt(secondsInput.value) || 0);
    const angle = (timeLeft / totalSeconds) * 360;
    needle.style.transition = 'transform 1s ease'; // Smooth transition for needle animation
    needle.style.transform = `rotate(${360 - angle}deg)`;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
saveButton.addEventListener('click', saveTimer);
presets.forEach(button => button.addEventListener('click', setPresetTime));

updateDisplay();
needle.style.transform = 'rotate(0deg)'; // Ensure needle starts at initial position
