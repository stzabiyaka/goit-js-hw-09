import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css"

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const result = {position, delay}

    setTimeout (() => {
      if (shouldResolve) {
      resolve(result);
    } else {
      reject(result);
    }
  }, delay);
  });  
}

function onFormSubmit (evt) {
  const firstDelay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);
  evt.preventDefault();

  for (let i = 0; i < amount; i += 1) {
    createPromise(i, (firstDelay + (i * step)))
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
  }
formRef.reset();
  
}
