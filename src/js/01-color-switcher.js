
import getRandomHexColor from "./js-modules/random-hex-color";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.body
}

let timerId = null;

onStopBtnClick();

function changeBodyColor () {
    refs.body.style.backgroundColor = getRandomHexColor();
}

function onStartBtnClick () {
    timerId = setInterval(changeBodyColor, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    refs.stopBtn.addEventListener('click', onStopBtnClick);
    refs.stopBtn.removeEventListener('click', onStartBtnClick);
}
    
function onStopBtnClick () {
    clearInterval(timerId);
    refs.stopBtn.disabled = true;
    refs. startBtn.disabled = false;
    refs.startBtn.addEventListener('click', onStartBtnClick);
    refs.startBtn.removeEventListener('click', onStopBtnClick);
}