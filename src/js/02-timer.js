// Opisany w dokumentacji
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const ElInput = document.querySelector('input[type="text"]');
const ElButtonStart = document.querySelector('[data-start]');
const ElSpanDays = document.querySelector('[data-days]');
const ElSpanHours = document.querySelector('[data-hours]');
const ElSpanMinutes = document.querySelector('[data-minutes]');
const ElSpanSeconds = document.querySelector('[data-seconds]');
let PIckedDate = new Date();

let timerange = 0;
let timerId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      ElButtonStart.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      ElButtonStart.disabled = false;
      PIckedDate = selectedDates[0];
    }
    //console.log(selectedDates[0]);
    //console.log(options.defaultDate);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

ElButtonStart.addEventListener('click', () => {
  timerange = PIckedDate - options.defaultDate;
  timerId = setInterval(() => {
    if (timerange <= 2000) clearInterval(timerId);
    timerange -= 1000;
    //console.log(timerange);
    ElSpanSeconds.innerHTML = addLeadingZero(convertMs(timerange).seconds);
    ElSpanMinutes.innerHTML = addLeadingZero(convertMs(timerange).minutes);
    ElSpanHours.innerHTML = addLeadingZero(convertMs(timerange).hours);
    ElSpanDays.innerHTML = addLeadingZero(convertMs(timerange).days);

    //console.log(`I love async JS!  `, convertMs(timerange));
  }, 1000);
  //console.log(PIckedDate - options.defaultDate);
});

flatpickr(ElInput, options);
