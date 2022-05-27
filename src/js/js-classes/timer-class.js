export default class Timer {
    constructor ({onTick, timerDelay = 1000}) {
        this.onTick = onTick;
        this.timerDelay = timerDelay;
        this.timerId = null;        
    }

    startTimer () {
        this.onTick;
        this.timerId = setInterval(this.onTick, this.timerDelay);
    }

    stopTimer () {  
        clearInterval(this.timerId);
    }
}