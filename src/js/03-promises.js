import Notiflix from 'notiflix';

const createPromisesForm = document.querySelector('.form');
const delayValue = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amountValue = document.querySelector('input[name="amount"]');

const onFormSubmit = e => {
  e.preventDefault();

  for (let i = 0; i < Number(amountValue.value); i += 1) {
    let delay = Number(delayValue.value) + Number(stepDelay.value) * i;
    createPromise(i + 1, delay)
      .then(success => Notiflix.Notify.success(success))
      .catch(error => Notiflix.Notify.failure(error));
  }
};

createPromisesForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
