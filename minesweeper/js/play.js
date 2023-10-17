// export { playGame }

// import { field, moveCounter, timeCounter, newGameBtn, resultTbody } from "./items.js"
// import { mine, showAllMines } from "./miner.js"
// import { countAroundMines, startTimeCounter, countMove, stopTimeCounter } from "./counters.js"
// import { playAudio, playWinAudio, playLoseAudio, playSetFlagAudio } from "./audio.js"
// import { showModal } from "./modal.js"

// const playGame = (numMines) => {
//     field.onclick = e => {
//         if (e.target.matches('td')) {
//             const fieldRow = e.target.parentElement.rowIndex;
//             const fieldCol = e.target.cellIndex;

//             playAudio(e.target);
//             mine(numMines, fieldRow, fieldCol);
//             countAroundMines();
//             unlockCell(e.target);
//             startTimeCounter();
//             countMove();

//             field.onclick = e => {
//                 playAudio(e.target);
//                 if (e.target.matches('td') && !e.target.classList.contains('flag-cell')) {
//                     unlockCell(e.target);
//                     countMove();
//                 }

//                 if (field.querySelectorAll('.unlock').length === (field.querySelectorAll('td').length - numMines) && !field.querySelector('.unlock[data-mine]')) {
//                     stopTimeCounter();
//                     field.onclick = null;
//                     field.oncontextmenu = null;
//                     setTimeout(() => {
//                         playWinAudio();
//                     }, 200)
//                     setTimeout(() => {
//                         showModal();
//                     }, 500)
//                     addResult();
//                 }

//                 if (field.querySelector('.unlock[data-mine]')) {
//                     stopTimeCounter();
//                     field.onclick = null;
//                     field.oncontextmenu = null;
//                     setTimeout(() => {
//                         playLoseAudio();
//                     }, 1300);
//                     setTimeout(() => {
//                         showModal();
//                     }, 1400);
//                 }
//             }

//             field.oncontextmenu = e => {
//                 e.preventDefault();

//                 if (!e.target.classList.contains('unlock') && !e.target.matches('table')) {
//                     playSetFlagAudio();
//                     e.target.classList.toggle('flag-cell');
//                 }
//             };

//         }
//     }
// }

// function unlockCell(cell) {
//     const countCol = field.rows[0].cells.length;
//     const countRow = field.rows.length;

//     cell.classList.add('unlock');
//     cell.classList.remove('flag-cell');

//     if (cell.dataset.mine) {
//         showAllMines();
//         cell.style.backgroundColor = 'rgba(194, 0, 0, 0.3)';
//         return;
//     }

//     if (!cell.dataset.count) {
//         const row = cell.parentElement.rowIndex;
//         const col = cell.cellIndex;

//         for (let i = row - 1; i <= row + 1; i++) {
//             for(let k = col - 1; k <= col + 1; k++) {
//                 if (i < 0 || i >= countRow) continue;
//                 if (k < 0 || k >= countCol) continue;
//                 if (field.rows[i].cells[k].classList.contains('unlock')) continue;

//                 unlockCell(field.rows[i].cells[k])
//             }
//         }
//     }
// }

// newGameBtn.addEventListener('click', (e) => {
//     stopTimeCounter();
//     moveCounter.textContent = "Moves: 000";
//     timeCounter.textContent = "Time: 000";
// });


// function addResult() {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth() + 1;
//     const day = currentDate.getDate();
//     const hours = currentDate.getHours();
//     const minutes = currentDate.getMinutes();
//     const seconds = currentDate.getSeconds();

//     const baseCells = resultTbody.querySelectorAll('td');

//     if (baseCells[1].textContent === '-') {

//         baseCells[1].textContent = Number(timeCounter.textContent.split(':')[1]);
//         baseCells[2].textContent = Number(moveCounter.textContent.split(':')[1]);
//         baseCells[3].textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//     } else {
//         const tr = document.createElement('tr');

//         resultTbody.prepend(tr);

//         for (let i = 0; i < 4; i++) {
//             const td = document.createElement('td');
//             tr.append(td);
//         }

//         const firstRow = resultTbody.querySelector('tr');
//         const firstRowTDs = firstRow.querySelectorAll('td');

//         firstRowTDs[1].textContent = Number(timeCounter.textContent.split(':')[1]);
//         firstRowTDs[2].textContent = Number(moveCounter.textContent.split(':')[1]);
//         firstRowTDs[3].textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//         const rows = resultTbody.querySelectorAll('tr');

//         for (let i = 0; i < rows.length; i++) {
//             rows[i].firstElementChild.textContent = i + 1;
//         }

//         if (rows.length > 10) {
//             const resultTable = document.querySelector('.results-table');
//             const lastRowIndex = resultTable.rows.length - 1;

//             resultTable.deleteRow(lastRowIndex);
//         }
//     }

// }
