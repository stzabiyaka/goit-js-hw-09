
import getRandomHexColor from "./js-modules/random-hex-color";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    target: document.body,
    notification: Notify,
}

class Timer {
    constructor ({onTick}, references) {
        this.onTick = onTick;
        this.timerId = null;
        this.isTimerActive = false;
        this.startBtn = references.startBtn;
        this.stopBtn = references.stopBtn;
        this.notification = references.notification;
        
        this.setBtnsState();
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
        this.stopBtn.addEventListener('click', this.stopTimer.bind(this));
    }

    startTimer () {
        this.isTimerActive = true;
        this.setBtnsState();
        this.timerId = setInterval(this.onTick, 1000);
        this.notification.info('Color switching started');
    }

    stopTimer () {
        this.isTimerActive = false;
        this.setBtnsState();
        clearInterval(this.timerId);
        this.notification.success('Color switching stopped');
    }

    setBtnsState () {
        this.startBtn.disabled = this.isTimerActive; 
        this.stopBtn.disabled = !this.isTimerActive;
    }
}

const timer = new Timer({onTick: changeBodyColor}, refs);

function changeBodyColor () {
    refs.target.style.backgroundColor = getRandomHexColor();
}