/* imports */
import convertMs from "./js-modules/convert-miliseconds";
import addLeadingZero from "./js-modules/leading-zero";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"

/* classes */
class Timer {
    constructor ({onTick},references) {
        this.timerId = null;
        this.dateInput = references.dateInput;
        this.startBtn = references.startBtn;
        this.notification = references.notification;
        this.onTick = onTick.bind(this);

        this.startBtn.disabled = true;
        this.startBtn.addEventListener('click', this.startTimer.bind(this));
    }
    

    startTimer () {
        this.notification.info('Countdown started');
        this.onTick; 
        this.timerId = setInterval(this.onTick, 1000);
        this.startBtn.disabled = true;
    }

    stopTimer () {
        clearInterval(this.timerId);
            this.notification.success('Countdown finished');
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

const countdownTimer = new Timer({onTick: updateCountdownDisplay}, refs);

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

function updateCountdownDisplay () {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    if (deltaTime <= 0){
        this.stopTimer();
        return;
    }

    updateCountdownValues(convertMs(deltaTime));
}

function updateCountdownValues (countdownValues) {
    
    refs.secondsValue.textContent = addLeadingZero(countdownValues.seconds);
    refs.minutesValue.textContent = addLeadingZero(countdownValues.minutes);
    refs.hoursValue.textContent = addLeadingZero(countdownValues.hours);
    refs.daysValue.textContent = addLeadingZero(countdownValues.days);
}


