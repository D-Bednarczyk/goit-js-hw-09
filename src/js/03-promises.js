import Notiflix from 'notiflix';
const ElForm = document.querySelector('.form');

ElForm.addEventListener('input', handleInput);
ElForm.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) resolve({ position, delay });
      else reject({ position, delay });
    }, delay);
  });
}

/* createPromise(2, 4500)
  .then(({ position, delay }) => {
    console.log(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`Rejected promise ${position} in ${delay}ms`);
  }); */

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < ElForm.elements.amount.value; i++) {
    /*   console.log(
      i,
      Number(ElForm.elements.delay.value) +
        Number(ElForm.elements.step.value) * i
    ); */
    createPromise(
      i,
      Number(ElForm.elements.delay.value) +
        Number(ElForm.elements.step.value) * i
    )
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position + 1} in ${delay}ms`
        );
      });
  }
  //console.log(ElForm.elements.step.value);
  //console.log(ElForm.elements.step.value);
}
