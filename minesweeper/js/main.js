import { createLayout } from './layout.js';

createLayout();

const body = document.querySelector('.body');
const themeBtn = document.querySelector('.theme-input');
const gameForm = document.querySelector('#game-form');
const soundBtn = document.querySelector('.sound-btn');
const field = document.querySelector('.field');
const newGameBtn = document.querySelector('.newgame-btn');
const timeCounter = document.querySelector('.time-counter');
const moveCounter = document.querySelector('.move-counter');
const resultTbody = document.querySelector('.result-tbody');
const minesCounterText = document.querySelector('.mines-couner-text');

const createField = (width, height) => {
    const fieldBody = field.lastElementChild;
    fieldBody.replaceChildren();

    if (window.innerWidth <= 740) {
      field.style.width = `${(height * 20) + (height * 2)}px`;
      field.style.height = `${(width * 20) + (width * 2)}px`;
    } else {
      field.style.width = `${(width * 20) + (width * 2)}px`;
      field.style.height = `${(height * 20) + (height * 2)}px`;
    }

    if (window.innerWidth <= 740) {
      for(let i = 0; i < width; i++) {
        const fieldRow = fieldBody.insertRow();
        for (let k = 0; k < height; k++) {
          fieldRow.insertCell();
        }
      }
    } else {
      for(let i = 0; i < height; i++) {
        const fieldRow = fieldBody.insertRow();
        for (let k = 0; k < width; k++) {
          fieldRow.insertCell();
        }
      }
    }

}

const randomMines = (arr) => {
    const items = arr.splice(0);

    while (items.length) {
        const index = random(0, items.length)
        arr.push(items.splice(index, 1)[0]);
    }
    return arr;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const mine = (numMines, row, column) => {
    const cells = [];

    field.querySelectorAll('td').forEach(cell => cells.push(cell));
    cells.splice(row * field.lastElementChild.rows[0].cells.length + column, 1);
    const cellsMined = randomMines(cells).slice(0, numMines);

    cellsMined.forEach(cell => cell.dataset.mine = 'mined');
}

const showAllMines = () => {
    const cellsMined = field.querySelectorAll('[data-mine]');

    for (const cell of cellsMined) cell.classList.add('unlock');
}

const audio = new Audio();

const playAudio = (target) => {
    if (!target.classList.contains('unlock')) {
        if (target.classList.contains('flag-cell')) {
            audio.src = './assets/audio/negative-tone.wav';
        } else if (target.hasAttribute("data-mine")) {
            audio.src = './assets/audio/bomb-tone.wav';
        } else {
            audio.src = './assets/audio/click-cell.wav';
        }

        audio.play();
    }

}

const playWinAudio = () => {
    audio.src = './assets/audio/win-sound.wav';
    audio.play();
}

const playLoseAudio = () => {
    audio.src = './assets/audio/lose-sound.wav';
    audio.play();
}

const playSetFlagAudio = () => {
    audio.src = './assets/audio/flag-tone.wav';
    audio.play();
}

const countAroundMines = () => {
    const cells = field.querySelectorAll('td');

    for (const cell of cells) {
        if (cell.dataset.mine) continue;

        let counter = 0;

        const row = cell.parentElement.rowIndex;
        const col = cell.cellIndex;

        for (let i = row - 1; i <= row + 1; i++) {
            for(let k = col - 1; k <= col + 1; k++) {
                if (i < 0 || i >= field.rows.length) continue;
                if (k < 0 || k >= field.rows[i].cells.length) continue;
                if (field.rows[i].cells[k].dataset.mine) counter+=1;
            }
        }

        if (counter > 0) cell.dataset.count = counter;
    }
}

let timeSetInterval;

const startTimeCounter = () => {
    let sec;
    if (localStorage.getItem('time')) {
        sec = Number(localStorage.getItem('time'));
    } else {
        sec = 0;
    }

    timeCounter.textContent = `Time: ${String(sec).padStart(3, '0')}`;

    timeSetInterval = setInterval(() => {
        sec+=1;
        timeCounter.textContent = `Time: ${String(sec).padStart(3, '0')}`;
        localStorage.setItem('time', timeCounter.textContent.split(':')[1]);
    }, 1000);

}

if (localStorage.getItem('time')) {
    startTimeCounter();
}

const countMove = () => {
    let move;
    if (localStorage.getItem('moves')) {
        move = Number(localStorage.getItem('moves')) + 1;
    } else {
        move = Number(moveCounter.textContent.split(':')[1]) + 1;
    }

    moveCounter.textContent = `Moves: ${String(move).padStart(3, '0')}`;

    localStorage.setItem('moves', moveCounter.textContent.split(':')[1]);
}

const stopTimeCounter = () => {
    clearInterval(timeSetInterval);
}

const createModal = () => {
    const modal = document.createElement('div');
    const modalBlock = document.createElement('div');
    const modalText = document.createElement('p');
    const modalCloseBtn = document.createElement('div');

    const modalInput = document.createElement('input');
    modalInput.className = "modal-input";
    modalInput.type = "checkbox";
    modalInput.checked = true;

    modal.className = 'modal';
    modalBlock.className = 'modal-block';
    modalText.className = 'modal-text';
    modalCloseBtn.className = 'modal-close';

    modalCloseBtn.innerHTML = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#2F2E33" d="M32,4A28,28,0,1,0,60,32,28,28,0,0,0,32,4ZM43.31,37.66a4,4,0,0,1-5.66,5.66L32,37.66l-5.66,5.66a4,4,0,0,1-5.66-5.66L26.34,32l-5.66-5.66a4,4,0,0,1,5.66-5.66L32,26.34l5.66-5.66a4,4,0,0,1,5.66,5.66L37.66,32Z"/></svg>`

    body.append(modal);
    modal.append(modalBlock);
    modalBlock.append(modalCloseBtn);
    modalBlock.append(modalText);
    modal.prepend(modalInput);
}

const showModal = () => {
    const modal = document.querySelector('.modal');
    const modalText = document.querySelector('.modal-text');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalBlock = document.querySelector('.modal-block');

    if (document.querySelectorAll('.unlock[data-mine]').length === 0) {
        modalText.textContent = `Hooray! You found all mines in ${Number(timeCounter.textContent.split(':')[1])} seconds and ${Number(moveCounter.textContent.split(':')[1])} moves!`;
    } else {
        modalText.textContent = "Game over. Try again...";
    }

    modal.classList.add('open');

    modalCloseBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modalBlock.addEventListener('click', (e) => {
        e._isClickWithInModal = true;
    });

    modal.addEventListener('click', (e) => {
        if (e._isClickWithInModal) return;
        e.currentTarget.classList.remove('open');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            modal.classList.remove('open');
        }
    });

}

createModal();

const cellLocation = field.querySelector('tbody');

const playGame = (numMines) => {
    field.onclick = e => {
        if (e.target.matches('td')) {
            const fieldRow = e.target.parentElement.rowIndex;
            const fieldCol = e.target.cellIndex;

            if (localStorage.getItem('left-demined')) {
                minesCounterText.innerHTML = localStorage.getItem('left-demined');
            } else {
                minesCounterText.innerHTML = numMines;
            }

            localStorage.setItem('left-demined', minesCounterText.textContent);

            if (e.target.classList.contains('flag-cell')) {
                playAudio(e.target);
            } else {
                playAudio(e.target);
            if (!localStorage.getItem('table')) {
                mine(numMines, fieldRow, fieldCol);
                countAroundMines();
                startTimeCounter();
            } else {
                if (e.target.hasAttribute("data-mine")) {
                    field.onclick = null;
                    field.oncontextmenu = null;
                    stopTimeCounter();
                    setTimeout(() => {
                        playLoseAudio();
                        localStorage.removeItem('table');
                        localStorage.removeItem('time');
                        localStorage.removeItem('moves');
                        localStorage.removeItem('left-demined');
                    }, 1300);
                    setTimeout(() => {
                        showModal();
                    }, 1400);
                    addResult();
                }

            }
            unlockCell(e.target);
            countMove();
            }

            localStorage.setItem('table', cellLocation.innerHTML);

            field.onclick = e => {

                if (field.querySelector('.unlock[data-mine]')) {
                    field.onclick = null;
                    field.oncontextmenu = null;
                } else {
                    localStorage.setItem('table', cellLocation.innerHTML);

                    if (e.target.matches('td') && !e.target.classList.contains('flag-cell')) {
                        playAudio(e.target);
                        unlockCell(e.target);
                        countMove();
                        localStorage.setItem('table', cellLocation.innerHTML);
                    }

                    if (e.target.classList.contains('flag-cell')) {
                        playAudio(e.target);
                    }

                    if (field.querySelectorAll('.unlock').length === (field.querySelectorAll('td').length - numMines) && !field.querySelector('.unlock[data-mine]')) {
                        stopTimeCounter();
                        field.onclick = null;
                        field.oncontextmenu = null;
                        setTimeout(() => {
                            playWinAudio();
                        }, 200)
                        setTimeout(() => {
                            showModal();
                        }, 500)
                        addResult();

                        localStorage.removeItem('table');
                        localStorage.removeItem('time');
                        localStorage.removeItem('moves');
                        localStorage.removeItem('left-demined');

                    }

                    if (field.querySelector('.unlock[data-mine]')) {
                        stopTimeCounter();
                        field.onclick = null;
                        field.oncontextmenu = null;
                        setTimeout(() => {
                            playLoseAudio();
                        }, 1300);
                        setTimeout(() => {
                            showModal();
                        }, 1400);
                        addResult();

                        localStorage.removeItem('table');
                        localStorage.removeItem('time');
                        localStorage.removeItem('moves');
                        localStorage.removeItem('left-demined');

                    }

                }

            }

            field.oncontextmenu = e => {

                    e.preventDefault();

                    if (!e.target.classList.contains('unlock') && !e.target.matches('table')) {
                        if (e.target.classList.contains('flag-cell')) {
                            minesCounterText.textContent = Number(minesCounterText.textContent) + 1;
                            localStorage.setItem('left-demined', minesCounterText.textContent);
                        } else {
                            minesCounterText.textContent = Number(minesCounterText.textContent) - 1;
                            localStorage.setItem('left-demined', minesCounterText.textContent);
                        }

                        playSetFlagAudio();
                        e.target.classList.toggle('flag-cell');
                    }


                    localStorage.setItem('table', cellLocation.innerHTML);

            };

        }
    }
}

field.oncontextmenu = e => {
    if (localStorage.getItem('table') && !e.target.matches('table')) {
        e.preventDefault();

        if (!e.target.classList.contains('unlock') && !e.target.matches('table')) {
            if (e.target.classList.contains('flag-cell')) {
                minesCounterText.textContent = Number(minesCounterText.textContent) + 1;
                localStorage.setItem('left-demined', minesCounterText.textContent);
            } else {
                minesCounterText.textContent = Number(minesCounterText.textContent) - 1;
                localStorage.setItem('left-demined', minesCounterText.textContent);
            }

            playSetFlagAudio();
            e.target.classList.toggle('flag-cell');
        }


        localStorage.setItem('table', cellLocation.innerHTML);
    }
};

function unlockCell(cell) {
    const countCol = field.rows[0].cells.length;
    const countRow = field.rows.length;

    cell.classList.add('unlock');
    cell.classList.remove('flag-cell');

    if (cell.dataset.mine) {
        showAllMines();
        cell.style.backgroundColor = 'rgba(194, 0, 0, 0.3)';
        return;
    }

    if (!cell.dataset.count) {
        const row = cell.parentElement.rowIndex;
        const col = cell.cellIndex;

        for (let i = row - 1; i <= row + 1; i++) {
            for(let k = col - 1; k <= col + 1; k++) {
                if (i < 0 || i >= countRow) continue;
                if (k < 0 || k >= countCol) continue;
                if (field.rows[i].cells[k].classList.contains('unlock')) continue;

                unlockCell(field.rows[i].cells[k])
            }
        }
    }
}

function addResult() {

    const baseCells = resultTbody.querySelectorAll('td');
    const unlockMines = field.querySelectorAll('.unlock[data-mine]').length;

    if (baseCells[1].textContent === '-') {

        baseCells[1].textContent = Number(timeCounter.textContent.split(':')[1]);
        baseCells[2].textContent = Number(moveCounter.textContent.split(':')[1]);
        if (unlockMines === 0) {
            baseCells[3].textContent = 'win';
        } else {
            baseCells[3].textContent = 'lose';
        }

    } else {

        const tr = document.createElement('tr');

        resultTbody.prepend(tr);

        for (let i = 0; i < 4; i++) {
            const td = document.createElement('td');
            tr.append(td);
        }

        const firstRow = resultTbody.querySelector('tr');
        const firstRowTDs = firstRow.querySelectorAll('td');

        firstRowTDs[1].textContent = Number(timeCounter.textContent.split(':')[1]);
        firstRowTDs[2].textContent = Number(moveCounter.textContent.split(':')[1]);
        if (unlockMines === 0) {
            firstRowTDs[3].textContent = 'win';
        } else {
            firstRowTDs[3].textContent = 'lose';
        }

        const rows = resultTbody.querySelectorAll('tr');

        for (let i = 0; i < rows.length; i++) {
            rows[i].firstElementChild.textContent = i + 1;
        }

        if (rows.length > 10) {
            const resultTable = document.querySelector('.results-table');
            const lastRowIndex = resultTable.rows.length - 1;

            resultTable.deleteRow(lastRowIndex);
        }
    }

    const resultsCode = document.querySelector('.results-container').innerHTML;
    localStorage.setItem("results", resultsCode);

}

if (localStorage.getItem('table')) {
    cellLocation.innerHTML = localStorage.getItem('table');
    const lastminesNum = document.querySelectorAll('[data-mine]').length;
    playGame(lastminesNum);
} else {
    const checkedLevel = gameForm.querySelector('input[name="level"]:checked');
    const [curHeight, curWidth, curMines] = checkedLevel.value.split(/\D/).map(Number);

    createField(curWidth, curHeight);
    playGame(curMines);
}

newGameBtn.addEventListener('click', (e) => {
    stopTimeCounter();
    moveCounter.textContent = "Moves: 000";
    timeCounter.textContent = "Time: 000";
    minesCounterText.textContent = "0";
    stopTimeCounter();

    field.oncontextmenu = null;

    localStorage.removeItem('table');
    localStorage.removeItem('time');
    localStorage.removeItem('moves');
    localStorage.removeItem('left-demined');
});

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    const theme = localStorage.getItem("theme");
    if (theme === "dark-theme") {
        localStorage.setItem("theme", "")
    } else {
        localStorage.setItem("theme", "dark-theme")
    }
});

gameForm.addEventListener('submit', () => {
    const checkedLevel = gameForm.querySelector('input[name="level"]:checked');
    const [fieldHeight, fieldWidth, numMines] = checkedLevel.value.split(/\D/).map(Number);

    createField(fieldWidth, fieldHeight);
    playGame(numMines);
});

soundBtn.addEventListener('click', (e) => {
    soundBtn.classList.toggle('mute');
    if (soundBtn.classList.contains('mute')) {
        audio.muted = true;
    } else {
        audio.muted = false;
    }
});

window.addEventListener('resize', function() {
    stopTimeCounter();

    localStorage.removeItem('table');
    localStorage.removeItem('moves');
    localStorage.removeItem('time');
    localStorage.removeItem('left-demined');

    timeCounter.textContent = 'Time: 000';
    moveCounter.textContent = 'Moves: 000';
    minesCounterText.textContent = '0';

    const checkedLevel = gameForm.querySelector('input[name="level"]:checked');
    const [fieldHeight, fieldWidth, numMines] = checkedLevel.value.split(/\D/).map(Number);

    createField(fieldWidth, fieldHeight);
    playGame(numMines);

});

gameForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('click', () => {
        const level = input.nextSibling.textContent;
        localStorage.setItem('level', level);
    });
})