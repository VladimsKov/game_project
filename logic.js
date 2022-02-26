let players = ['x', 'o'];
let activePlayer = 0;
let gameField;
let n;//размер поля

function createField() {
    gameField = [];
    for (let i = 0; i < n; i++) {
        gameField[i] = [];
        for (let j = 0; j < n; j++) {
            gameField[i][j] = '';
        }
    }
}

function startGame() {
    n = Number(prompt("Введите размер поля", 3));
    createField();
    renderBoard(gameField);
    let firstPlayer = prompt("Введите номер игрока, который начинает:  '1', если игрок №1 (крестик) или '2', если игрок №2 (нолик)");
    if (firstPlayer == '1') {
        activePlayer = 0;
    } else {activePlayer = 1;}   
}

function checkwin(rowNumber, colNumber) {
    let findwin1 = true, findwin2 = true,
    findwin = true, findwin3 = true;
    for (let i = 0; i < n; i++) {
        //проверка строк:
        if (i !== colNumber && findwin1) {
            if (gameField[rowNumber][i] !== gameField[rowNumber][colNumber]) {
                findwin1 = false;
            }
        }
        //проверка столбцов:
        if (i !== rowNumber && findwin2) {
            if (gameField[i][colNumber] !== gameField[rowNumber][colNumber]) {
                findwin2 = false;
            }
        }
        //проверка главной диагонали:
        if (rowNumber == colNumber && findwin) {
            if (i !== rowNumber) {
                if (gameField[i][i] !== gameField[rowNumber][colNumber]) {
                    findwin = false;
                } 
            }
        } else {
            findwin = false;
        }        
        //проверка побочной диагонали
        if (+rowNumber + +colNumber == n - 1 && findwin3) {
            if (i !== colNumber) {
                if (gameField[n - 1 - i][i] !== gameField[rowNumber][colNumber]) {
                    findwin3 = false;
                } 
            }
        } else {
            findwin3 = false;
        }        
        if (!findwin1 && !findwin2 && !findwin && !findwin3) break;
    }
    if (findwin1 || findwin2 || findwin || findwin3) return true;  
}

function click(rowNamber, colNamber) {
    if (activePlayer == 0) {
        gameField[rowNamber][colNamber] = players[0];
    } else {
        gameField[rowNamber][colNamber] = players[1];
    }
    renderBoard(gameField);
    let check = checkwin(rowNamber, colNamber);
    if (check) {
        showWinner(activePlayer);
    } else {
        activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;
    }
}