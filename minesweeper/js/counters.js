// export { countAroundMines, startTimeCounter, countMove, stopTimeCounter }

// import { field } from './items.js'
// import { timeCounter, moveCounter } from './items.js'

// const countAroundMines = () => {
//     const cells = field.querySelectorAll('td');

//     for (const cell of cells) {
//         if (cell.dataset.mine) continue;

//         let counter = 0;

//         const row = cell.parentElement.rowIndex;
//         const col = cell.cellIndex;

//         for (let i = row - 1; i <= row + 1; i++) {
//             for(let k = col - 1; k <= col + 1; k++) {
//                 if (i < 0 || i >= field.rows.length) continue;
//                 if (k < 0 || k >= field.rows[i].cells.length) continue;
//                 if (field.rows[i].cells[k].dataset.mine) counter+=1;
//             }
//         }

//         if (counter > 0) cell.dataset.count = counter;
//     }
// }

// let timeSetInterval;

// const startTimeCounter = () => {
//     let sec = 0;

//     timeCounter.textContent = `Time: ${String(sec).padStart(3, '0')}`;

//     timeSetInterval = setInterval(() => {
//         sec+=1;
//         timeCounter.textContent = `Time: ${String(sec).padStart(3, '0')}`;
//     }, 1000)

// }

// const countMove = () => {
//         let move = Number(moveCounter.textContent.split(':')[1]) + 1;

//     moveCounter.textContent = `Moves: ${String(move).padStart(3, '0')}`;
// }

// const stopTimeCounter = () => {
//     clearInterval(timeSetInterval);
// }