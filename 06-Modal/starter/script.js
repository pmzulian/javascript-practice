'use strict';

// Primer paso: seleccionar todo lo que vamos a necesitar
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', function() {
      console.log('Button clicked');
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
  });

btnCloseModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});