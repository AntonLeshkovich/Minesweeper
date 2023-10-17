// export { mine, showAllMines }

// import { field } from './items.js'
// import { randomMines } from './randomize.js'

// const mine = (numMines, row, column) => {
//     const cells = [];

//     field.querySelectorAll('td').forEach(cell => cells.push(cell));
//     cells.splice(row * field.firstElementChild.rows[0].cells.length + column, 1);
//     const cellsMined = randomMines(cells).slice(0, numMines);

//     cellsMined.forEach(cell => cell.dataset.mine = 'mined');
// }

// const showAllMines = () => {
//     const cellsMined = field.querySelectorAll('[data-mine]');

//     for (const cell of cellsMined) cell.classList.add('unlock');
// }