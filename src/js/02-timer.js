import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerValue = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.selectedDate = selectedDates[0].getTime();
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => timer.start());
    }
  },
};

flatpickr(dateTimePicker, options);
startBtn.disabled = true;

const timer = {
  intervalId: null,
  isActive: false,
  selectedDate: null,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    startBtn.disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.selectedDate - currentTime;
      if (deltaTime >= 0) {
        const time = convertMs(deltaTime);
        updateTimerValue(time);
      } else clearInterval(this.intervalId);
    }, 1000);
  },
};

function updateTimerValue({ days, hours, minutes, seconds }) {
  timerValue.days.textContent = days;
  timerValue.hours.textContent = hours;
  timerValue.minutes.textContent = minutes;
  timerValue.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
