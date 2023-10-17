export { createLayout }

import { body } from './items.js'

const createLayout = () => {
    const section = document.createElement('section');
    body.prepend(section);

    const formState = document.createElement('input');
    section.append(formState);

    const form = document.createElement('form');
    section.append(form);

    const formTable = document.createElement('table');
    form.append(formTable);

    const formTableTHead = document.createElement('thead');
    formTable.append(formTableTHead);

    const formTableTHeadTr = document.createElement('tr');
    formTableTHead.append(formTableTHeadTr);

    for (let i = 0; i < 4; i++) {
        const thText = ['Level', 'Width', 'Height', 'Mines'];
        const formTableTHeadTrTh = document.createElement('th');

        formTableTHeadTrTh.textContent = thText[i];
        formTableTHeadTr.append(formTableTHeadTrTh);

    }

    const formTableTBody = document.createElement('tbody');
    formTable.append(formTableTBody);

    for (let i = 0; i < 3; i++) {
        const formTableTBodyTr = document.createElement('tr');
        formTableTBody.append(formTableTBodyTr);
        for (let j = 0; j < 4; j++) {
            const formTableTBodyTrTd = document.createElement('td');
            formTableTBodyTr.append(formTableTBodyTrTd);
        }
    }

    const formTableTBodyRows = formTableTBody.querySelectorAll('tr');
    formTableTBodyRows.forEach(trs => {
        const formTableTBodyTrTdLabel = document.createElement('label');
        trs.firstElementChild.append(formTableTBodyTrTdLabel);
        const formTableTBodyTrTdInput = document.createElement('input');
        formTableTBodyTrTdLabel.append(formTableTBodyTrTdInput);

        formTableTBodyTrTdInput.type = "radio";
        formTableTBodyTrTdInput.name = "level";

    });

    formTableTBodyRows[0].querySelectorAll('td')[1].textContent = 10;
    formTableTBodyRows[0].querySelectorAll('td')[2].textContent = 10;
    formTableTBodyRows[0].querySelectorAll('td')[3].textContent = 10;

    formTableTBodyRows[1].querySelectorAll('td')[1].textContent = 16;
    formTableTBodyRows[1].querySelectorAll('td')[2].textContent = 16;
    formTableTBodyRows[1].querySelectorAll('td')[3].textContent = 40;

    formTableTBodyRows[2].querySelectorAll('td')[1].textContent = 30;
    formTableTBodyRows[2].querySelectorAll('td')[2].textContent = 16;
    formTableTBodyRows[2].querySelectorAll('td')[3].textContent = 99;


    const formTableInputs = section.querySelectorAll('[name="level"]');
    for (let i = 0; i < formTableInputs.length; i++) {
        const values = ['10*10/10', '16*16/40', '16*30/99'];
        const inputContents = ['Easy', 'Medium', 'Hard'];

        formTableInputs[i].value = values[i];
        let textNode = document.createTextNode(`${inputContents[i]}`);
        formTableInputs[i].parentNode.appendChild(textNode);
    }

    if (localStorage.getItem('level')) {
        if (localStorage.getItem('level') === 'Easy') {
            formTableInputs[0].checked = true;
        } else if (localStorage.getItem('level') === 'Medium') {
            formTableInputs[1].checked = true;
        } else if (localStorage.getItem('level') === 'Hard') {
            formTableInputs[2].checked = true;
        }
    } else {
        formTableInputs[0].checked = true;
    }

    const formBtn = document.createElement('button');
    form.append(formBtn);

    const formBtnLabel = document.createElement('label');
    formBtn.append(formBtnLabel);

    section.className = 'game-menu';
    formState.setAttribute("type", "radio");
    formState.setAttribute("name", "state");
    formState.setAttribute("id", "form-state");
    formState.setAttribute("hidden", "");
    form.setAttribute('action', 'javascript:');
    form.setAttribute('id', 'game-form');
    formBtn.className = 'start-btn';
    formBtnLabel.setAttribute("for", "game-state");
    formBtnLabel.innerText = "Start";

    const main = document.createElement('main');
    section.after(main);
    main.className = 'main';

    const mainInput = document.createElement('input');
    main.append(mainInput);
    mainInput.setAttribute("type", "radio");
    mainInput.setAttribute("name", "state");
    mainInput.setAttribute("id", "game-state");
    mainInput.hidden = true;
    mainInput.checked = true;

    const mainHeader = document.createElement('header');
    main.append(mainHeader);
    mainHeader.className = 'header';

    const moveCounter = document.createElement('div');
    mainHeader.append(moveCounter);
    moveCounter.className = 'move-counter';
    if (localStorage.getItem('moves')) {
        moveCounter.textContent = `Moves: ${localStorage.getItem('moves')}`;
    } else {
        moveCounter.textContent = 'Moves: 000';
    }


    const newgameBtn = document.createElement('button');
    mainHeader.append(newgameBtn);
    newgameBtn.className = 'newgame-btn';

    const newgameBtnLabel = document.createElement('label');
    newgameBtn.append(newgameBtnLabel);
    newgameBtnLabel.setAttribute("for", "form-state");
    newgameBtnLabel.textContent = 'New game';

    const timeCounter = document.createElement('div');
    mainHeader.append(timeCounter);
    timeCounter.className = 'time-counter';
    if (localStorage.getItem('time')) {
        timeCounter.textContent = `Time: ${localStorage.getItem('time')}`;
    } else {
        timeCounter.textContent = 'Time: 000';
    }

    const mainTable = document.createElement('table');
    main.append(mainTable);
    mainTable.className = 'field';

    const mainTableBtns = document.createElement('div');
    mainHeader.append(mainTableBtns);
    mainTableBtns.className = 'table-btns';

    const mainTableBtn = document.createElement('button');
    mainTableBtns.append(mainTableBtn);
    mainTableBtn.className = 'sound-btn';
    mainTableBtn.innerHTML = `<svg height="30px" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 32 32" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(58, 81, 153, 1)" d="M8.865,9.524l-3.865,-0c-0.796,-0 -1.559,0.316 -2.121,0.879c-0.563,0.562 -0.879,1.325 -0.879,2.121c0,1.986 0,5.014 0,7c-0,0.796 0.316,1.559 0.879,2.121c0.562,0.563 1.325,0.879 2.121,0.879c0,-0 3.865,-0 3.865,-0l2.83,3.396c0.809,0.971 2.139,1.331 3.326,0.901c1.188,-0.43 1.979,-1.558 1.979,-2.821l0,-15.952c-0,-1.263 -0.791,-2.391 -1.979,-2.821c-1.187,-0.43 -2.517,-0.07 -3.326,0.901l-2.83,3.396Z"/><path fill="rgba(58, 81, 153, 1)" d="M24.558,7.421c2.14,2.244 3.454,5.281 3.454,8.622c0,3.324 -1.301,6.347 -3.421,8.587c-0.379,0.401 -0.362,1.034 0.039,1.414c0.401,0.379 1.034,0.362 1.414,-0.039c2.459,-2.599 3.968,-6.106 3.968,-9.962c0,-3.876 -1.525,-7.399 -4.007,-10.002c-0.381,-0.399 -1.015,-0.414 -1.414,-0.034c-0.399,0.381 -0.414,1.015 -0.033,1.414Z"/><path fill="rgba(58, 81, 153, 1)" d="M21.955,10.044c1.513,1.541 2.446,3.652 2.446,5.98c0,2.319 -0.927,4.424 -2.43,5.964c-0.385,0.395 -0.378,1.029 0.017,1.414c0.395,0.386 1.029,0.378 1.414,-0.017c1.856,-1.9 2.999,-4.498 2.999,-7.361c0,-2.873 -1.151,-5.479 -3.018,-7.381c-0.387,-0.394 -1.02,-0.4 -1.414,-0.014c-0.394,0.387 -0.4,1.021 -0.014,1.415Z"/><path fill="rgba(58, 81, 153, 1)" d="M19.299,12.845c0.814,0.814 1.317,1.938 1.317,3.179c0,1.243 -0.505,2.37 -1.322,3.184c-0.391,0.39 -0.392,1.024 -0.002,1.415c0.39,0.39 1.023,0.391 1.414,0.001c1.18,-1.177 1.91,-2.804 1.91,-4.6c0,-1.792 -0.727,-3.417 -1.902,-4.593c-0.391,-0.39 -1.024,-0.391 -1.415,-0c-0.39,0.39 -0.39,1.023 -0,1.414Z"/></svg>`;

    const mainTableLable = document.createElement('label');
    mainTableBtns.append(mainTableLable);
    mainTableLable.className = 'switch';

    const mainTableInput = document.createElement('input');
    mainTableInput.type = 'checkbox';

    if (localStorage.getItem('theme')) {
        body.classList.add('dark-theme');
        mainTableInput.checked = false;
    } else {
        mainTableInput.checked = true;
    }

    mainTableInput.className = 'theme-input';
    mainTableLable.append(mainTableInput);

    const mainTableInputSpan = document.createElement('span');
    mainTableLable.append(mainTableInputSpan);
    mainTableInputSpan.className = 'slider';

    const mainTableTBody = document.createElement('tbody');
    mainTable.append(mainTableTBody);

    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    main.append(resultsContainer);
    if (localStorage.getItem('results')) {
        resultsContainer.innerHTML = localStorage.getItem('results');
    } else {
        const resultsTitle = document.createElement('h2');
        resultsContainer.append(resultsTitle);
        resultsTitle.className = 'results-title';
        resultsTitle.textContent = 'Latest results';

        const resultsTable = document.createElement('table');
        resultsContainer.append(resultsTable);
        resultsTable.className = 'results-table';

        const resultsTableTHead = document.createElement('thead');
        resultsTable.append(resultsTableTHead);

        const resultsTHeadTr = document.createElement('tr');
        resultsTableTHead.append(resultsTHeadTr);

        for (let i = 0; i < 4; i++) {
            const thText = ['', 'Time', 'Moves', 'Result'];
            const resultsTHeadTrTh = document.createElement('th');
            resultsTHeadTrTh.textContent = thText[i];
            resultsTHeadTr.append(resultsTHeadTrTh);
        }

        const resultsTableTBody = document.createElement('tbody');
        resultsTable.append(resultsTableTBody);
        resultsTableTBody.className = 'result-tbody';

        const resultsTableTBodyTr = document.createElement('tr');
        resultsTableTBody.append(resultsTableTBodyTr);

        for (let i = 0; i < 4; i++) {
            const tdText = ['1', '-', '-', '-'];
            const resultsTableTBodyTrTd = document.createElement('td');
            resultsTableTBodyTrTd.textContent = tdText[i];
            resultsTableTBodyTr.append(resultsTableTBodyTrTd);
        }
    }


    const gameTitle = document.createElement('h1');
    body.prepend(gameTitle);
    gameTitle.className = 'game-title';
    gameTitle.textContent = 'MINESWEEPER';

    const gameTitleInput = document.createElement('input');
    gameTitle.append(gameTitleInput);
    gameTitleInput.className = "title-input";
    gameTitleInput.type = "checkbox";
    gameTitleInput.checked = true;

    const minesCounterBlock = document.createElement('div');
    minesCounterBlock.className = 'mines-counter';
    mainHeader.append(minesCounterBlock);

    const minesCounterImgBlock = document.createElement('div');
    minesCounterImgBlock.className = 'mines-couner-icon';
    minesCounterImgBlock.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-bomb" width="24" height="24" viewBox="0 0 24 24"><path fill="#2F2E33" d="M11.25,6A3.25,3.25 0 0,1 14.5,2.75A3.25,3.25 0 0,1 17.75,6C17.75,6.42 18.08,6.75 18.5,6.75C18.92,6.75 19.25,6.42 19.25,6V5.25H20.75V6A2.25,2.25 0 0,1 18.5,8.25A2.25,2.25 0 0,1 16.25,6A1.75,1.75 0 0,0 14.5,4.25A1.75,1.75 0 0,0 12.75,6H14V7.29C16.89,8.15 19,10.83 19,14A7,7 0 0,1 12,21A7,7 0 0,1 5,14C5,10.83 7.11,8.15 10,7.29V6H11.25M22,6H24V7H22V6M19,4V2H20V4H19M20.91,4.38L22.33,2.96L23.04,3.67L21.62,5.09L20.91,4.38Z" /></svg>:`;
    minesCounterBlock.append(minesCounterImgBlock);

    const minesCounterText = document.createElement('p');
    minesCounterText.className = 'mines-couner-text';
    minesCounterBlock.append(minesCounterText);

    if (localStorage.getItem('left-demined')) {
        minesCounterText.textContent = localStorage.getItem('left-demined');
    } else {
        minesCounterText.textContent = '0';
    }

}