let players = ['x', 'o'];
let activePlayer = 0;
let gameField = [];
let n = 3;//размер поля

function createField() {
    for (let i = 0; i < n; i++) {
        gameField[i] = [];
        for (let j = 0; j < n; j++) {
            gameField[i][j] = '';
        }
    }
}

function startGame() {
    createField();
    renderBoard(gameField);
    let firstPlayer = prompt("Введите номер игрока, который начинает:  '1', если игрок №1 (крестик) или '2', если игрок №2 (нолик)");
    if (firstPlayer == '1') {
        activePlayer = 0;
    } else {activePlayer = 1;}
}
function checkwin(rowNumber, colNumber) {
    let findwin1 = true, findwin2 = true;
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
        if (!findwin1 && !findwin2) break;
    }
    if (findwin1 || findwin2) return true;
    //проверка диагоналей:
    //главная диагональ
    if (rowNumber == colNumber) {
        let findwin = true;
        for (let i = 0; i < n; i++) {
            if (i !== rowNumber) {
                if (gameField[i][i] !== gameField[rowNumber][colNumber]) {
                    findwin = false;
                    break;
                }
            }
        }
        if (findwin) return true;
    }
    //побочная диагональ
    if (+rowNumber + +colNumber == n - 1) {
        let findwin = true;
        for (let i = 0; i < n; i++) {
            if (i !== colNumber) {
                if (gameField[n - 1 - i][i] !== gameField[rowNumber][colNumber]) {
                    findwin = false;
                    break;
                }
            }
        }
        if (findwin) return true;
    }
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