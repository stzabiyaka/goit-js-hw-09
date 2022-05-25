
import getRandomHexColor from "./js-modules/random-hex-color";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    target: document.body
}

class ColorSwitcher {
    constructor ({onTick}, refs) {
        this.onTick = onTick;
        this.timerId = null;
        this.startBtn = refs.startBtn;
        this.stopBtn = refs.stopBtn;
        this.target = refs.target;

        this.initTimer();
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
        this.stopBtn.addEventListener('click', this.stopTimer.bind(this));
    }

    initTimer () {
        this.stopBtn.disabled = true;
        this.startBtn.disabled = false;   
    }

    startTimer () {
        this.timerId = setInterval(this.onTick, 1000);
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
    }

    stopTimer () {
        clearInterval(this.timerId);
        this.initTimer();
    }
}

const colorSwitcher = new ColorSwitcher({onTick: changeBodyColor}, refs);

function changeBodyColor () {
    refs.target.style.backgroundColor = getRandomHexColor();
}