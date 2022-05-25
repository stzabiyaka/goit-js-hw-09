/* imports */
import convertMs from "./js-modules/convert-miliseconds";
import addLeadingZero from "./js-modules/leading-zero";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"

/* classes */
class CountdownTimer {
    constructor ({onTick},refs) {
        this.timerId = null;
        this.dateInput = refs.dateInput;
        this.startBtn = refs.startBtn;
        this.notification = refs.notification;
        this.onTick = onTick;

        refs.startBtn.disabled = true;
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
    }
    

    startTimer () {
        this.notification.info('Countdown started');
        this.updateTimerValues(); 
        this.timerId = setInterval(this.updateTimerValues.bind(this), 1000);
        this.startBtn.disabled = true;
    }

    stopTimer () {
        clearInterval(this.timerId);
            this.notification.success('Countdown finished');
    }

    updateTimerValues () {
        const currentTime = Date.now();
        const deltaTime = selectedDate - currentTime;
    
        if (deltaTime <= 0){
            this.stopTimer();
            return;
        }
    
        this.onTick(convertMs(deltaTime));
    }
}

/* variables */
let selectedDate = null;
const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    secondsValue: document.querySelector('[data-seconds]'),
    minutesValue: document.querySelector('[data-minutes]'),
    hoursValue: document.querySelector('[data-hours]'),
    daysValue: document.querySelector('[data-days]'),
    notification: Notify,
    
}
const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
      checkPickedDate();
    },
  };
const flatpicrInstance = flatpickr(refs.dateInput, flatpickrOptions);



/* script initialisation */

const countdownTimer = new CountdownTimer({onTick: updateTimerDisplay}, refs);

/*functions */
function checkPickedDate () {
    const currentDate = Date.now();

    if (selectedDate <= currentDate) {
        refs.startBtn.disabled = true;
        refs.notification.failure('Please choose a date in the future');
        return;
    }

    refs.startBtn.disabled = false;   
}

function updateTimerDisplay (timerValues) {
    
        refs.secondsValue.textContent = addLeadingZero(timerValues.seconds);
        refs.minutesValue.textContent = addLeadingZero(timerValues.minutes);
        refs.hoursValue.textContent = addLeadingZero(timerValues.hours);
        refs.daysValue.textContent = addLeadingZero(timerValues.days);
}


