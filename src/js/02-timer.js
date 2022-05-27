/* imports */
import convertMs from "./js-modules/convert-miliseconds";
import addLeadingZero from "./js-modules/leading-zero";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"
import Timer from "./js-classes/timer-class";

/* variables */
let selectedDate = null;
const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    secondsDisplay: document.querySelector('[data-seconds]'),
    minutesDisplay: document.querySelector('[data-minutes]'),
    hoursDisplay: document.querySelector('[data-hours]'),
    daysDisplay: document.querySelector('[data-days]'),
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
const countdownTimer = new Timer({onTick: updateCountdownDisplay});

/* script initialisation */
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

/*functions */
function checkPickedDate () {
    const currentDate = Date.now();

    if (selectedDate <= currentDate) {
        refs.startBtn.disabled = true;
        Notify.failure('Please choose a date in the future');
        return;
    }

    refs.startBtn.disabled = false;   
}

function onStartBtnClick () {
    Notify.info('Countdown started');
    refs.startBtn.disabled = true;
    countdownTimer.startTimer();
}

function updateCountdownDisplay () {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    if (deltaTime <= 0){
        countdownTimer.stopTimer();
        Notify.success('Countdown finished');
        return;
    }

    updateDisplayValues(convertMs(deltaTime));
}

function updateDisplayValues (countdownValues) {
    
    refs.secondsDisplay.textContent = addLeadingZero(countdownValues.seconds);
    refs.minutesDisplay.textContent = addLeadingZero(countdownValues.minutes);
    refs.hoursDisplay.textContent = addLeadingZero(countdownValues.hours);
    refs.daysDisplay.textContent = addLeadingZero(countdownValues.days);
}


