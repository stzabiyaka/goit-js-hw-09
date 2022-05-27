
import getRandomHexColor from "./js-modules/random-hex-color";
import Timer from "./js-classes/timer-class";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    target: document.body,
}

const timer = new Timer({onTick: changeTargetColor});

let isTimerActive = false;

setBtnsState();
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);


function onStartBtnClick () {
    isTimerActive = true;

    setBtnsState(isTimerActive);
    timer.startTimer();
}

function onStopBtnClick () {
    isTimerActive = false;

    setBtnsState(isTimerActive);
    timer.stopTimer();
}

function setBtnsState (isActive = false) {
    refs.startBtn.disabled = isActive; 
    refs.stopBtn.disabled = !isActive;
}

function changeTargetColor () {
    refs.target.style.backgroundColor = getRandomHexColor();
}