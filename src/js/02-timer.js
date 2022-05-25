/* imports */
import convertMs from "./js-modules/convert-miliseconds";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"

/* variables */
let timerId = null;
let selectedDate = null;
const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    seconds: document.querySelector('[data-seconds]'),
    minutes: document.querySelector('[data-minutes]'),
    hours: document.querySelector('[data-hours]'),
    days: document.querySelector('[data-days]'),
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

/* script initialisation */
const flatpicrInstance = flatpickr(refs.dateInput, flatpickrOptions);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

/*functions */
function addLeadingZero (value, digits = 2) {
    return String(value).padStart(digits, '0');
}

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
    updateCountdown(); 
    timerId = setInterval(updateCountdown, 1000);
    refs.startBtn.disabled = true;
}

function updateCountdown () {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    if (deltaTime <= 0){
        clearInterval(timerId);
        Notify.success('Countdown finished');
        return;
    }

    const countdownValues = convertMs(deltaTime);

    refs.seconds.textContent = addLeadingZero(countdownValues.seconds);
    refs.minutes.textContent = addLeadingZero(countdownValues.minutes);
    refs.hours.textContent = addLeadingZero(countdownValues.hours);
    refs.days.textContent = addLeadingZero(countdownValues.days);

}


