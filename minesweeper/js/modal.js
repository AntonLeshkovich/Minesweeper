// export { createModal, showModal }

// import { body } from './items.js'
// import { timeCounter, moveCounter } from './items.js'

// const createModal = () => {
//     const modal = document.createElement('div');
//     const modalBlock = document.createElement('div');
//     const modalText = document.createElement('p');
//     const modalCloseBtn = document.createElement('div');

//     const modalInput = document.createElement('input');
//     modalInput.className = "modal-input";
//     modalInput.type = "checkbox";
//     modalInput.checked = true;

//     modal.className = 'modal';
//     modalBlock.className = 'modal-block';
//     modalText.className = 'modal-text';
//     modalCloseBtn.className = 'modal-close';

//     modalCloseBtn.innerHTML = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#2F2E33" d="M32,4A28,28,0,1,0,60,32,28,28,0,0,0,32,4ZM43.31,37.66a4,4,0,0,1-5.66,5.66L32,37.66l-5.66,5.66a4,4,0,0,1-5.66-5.66L26.34,32l-5.66-5.66a4,4,0,0,1,5.66-5.66L32,26.34l5.66-5.66a4,4,0,0,1,5.66,5.66L37.66,32Z"/></svg>`

//     body.prepend(modal);
//     modal.append(modalBlock);
//     modalBlock.append(modalCloseBtn);
//     modalBlock.append(modalText);
//     modal.prepend(modalInput);
// }

// const showModal = () => {
//     const modal = document.querySelector('.modal');
//     const modalText = document.querySelector('.modal-text');
//     const modalCloseBtn = document.querySelector('.modal-close');
//     const modalBlock = document.querySelector('.modal-block');

//     if (document.querySelectorAll('.unlock[data-mine]').length === 0) {
//         modalText.textContent = `Hooray! You found all mines in ${Number(timeCounter.textContent.split(':')[1])} seconds and ${Number(moveCounter.textContent.split(':')[1])} moves!`;
//     } else {
//         modalText.textContent = "Game over. Try again...";
//     }

//     modal.classList.add('open');

//     modalCloseBtn.addEventListener('click', () => {
//         modal.classList.remove('open');
//     });

//     modalBlock.addEventListener('click', (e) => {
//         e._isClickWithInModal = true;
//     });

//     modal.addEventListener('click', (e) => {
//         if (e._isClickWithInModal) return;
//         e.currentTarget.classList.remove('open');
//     });

//     window.addEventListener('keydown', (e) => {
//         if (e.key === "Escape") {
//             modal.classList.remove('open');
//         }
//     });

// }