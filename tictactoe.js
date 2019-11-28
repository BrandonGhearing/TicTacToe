var canvas;
var width = 400;
var height = 400;
var cellWidth = width / 3;
var cellHeight = height / 3;
var ctx;
var gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var currentPlayer;

window.onload = function() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    canvas.onclick = onCanvasClick;
    refreshCanvas();
    currentPlayer;
    
}

function drawGameBoard() {
    
    ctx.beginPath();
    ctx.moveTo(cellWidth, 0);
    ctx.lineTo(cellWidth, height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cellWidth * 2, 0);
    ctx.lineTo(cellWidth * 2, height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, cellHeight);
    ctx.lineTo(width, cellHeight);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, cellHeight * 2);
    ctx.lineTo(width, cellHeight * 2);
    ctx.stroke();
}

function drawX(cellX, cellY) {
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth + cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cellX * cellWidth + cellWidth, cellY * cellHeight);
    ctx.lineTo(cellX * cellWidth, cellY * cellHeight + cellHeight);
    ctx.stroke();
}

function drawCircle (cellX, cellY) {
    ctx.beginPath();
    ctx.arc(cellX * cellWidth + cellWidth / 2, cellY * cellHeight + cellHeight / 2, cellWidth / 2, 0, 360, false);
    ctx.stroke;
}

function onCanvasClick(e) {
    var mCoordinate = getMouseLocation(e);
    var cell = getCellFromLocation(mCoordinate);
    processCellClick(cell);
}

function processCellClick(cell) {
    if (gameStatus[cell.x][cell.y] != 0) return;
    gameStatus[cell.x][cell.y] = currentPlayer;
    
    refreshCanvas();
    
    if(currentPlayer == 1) currentPlayer = 2;
    else currentPlayer = 1;
    
    checkGame();
}

function getMouseLocation(e) {
    
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    
    return { x: mouseX, y: mouseY };
}

function getCellFromLocation(mCoordinate) {
    var cellCoordinate = { x: 0, y: 0 };
    
    if (mCoordinate.x > cellWidth * 2) cellCoordinate.x = 2;
    else if (mCoordinate.x > cellWidth) cellCoordinate.x = 1;
    
    if (mCoordinate.y > cellHeight * 2) cellCoordinate.y = 2;
    else if (mCoordinate.y > cellHeight) cellCoordinate.y = 1;
    
    return cellCoordinate;
}

function refreshCanvas() {
    ctx.clearRect(0, 0, width, height);
    drawGameBoard();
    drawPlayerMoves();
}

function drawPlayerMoves() {
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            var cell = gameStatus[i][j];
            if (cell == 1) {
                drawX(i, j);
            } else if (cell == 2) {
                drawCircle(i, j);
            }
        }
    }
}

function checkGame() {
    var full = true;
    
    for (var i = 0; i < 3; i++) {
        var p1Rows = 0, p1Columns = 0;
        var p2Rows = 0, p2Columns = 0;
        for (var j = 0; j < 3; j++) {
            if (gameStatus[j][i] == 1)
                p1Rows++;
            else if (gameStatus[j][i] == 2)
                p2Rows++;
            else full = false;
            
            if(gameStatus[i][j] == 1)
                p1Columns++;
            else if (gameStatus[i][j] == 2)
                p2Columns++;
        }
        
        var p1Diagonal = gameStatus[0][0] == 1 && gameStatus[1][1] == 1 && gameStatus[2][2] == 1;
        p1Diagonal = p1Diagonal || gameStatus[0][2] == 1 && gameStatus[1][1] == 1 && gameStatus[2][0] == 1;
        
        var p2Diagonal = gameStatus[0][0] == 2 && gameStatus[1][1] == 2 && gameStatus[2][2] == 2;
        p2Diagonal = p2Diagonal || gameStatus[0][2] == 2 && gameStatus[1][1] == 2 && gameStatus[2][0] == 2;
        
        if (p1Rows == 3 || p1Columns == 3 || p1Diagonal) {
            processEndGame("Player 1 wins the game!");
            return;
        } else if (p2Rows == 3 || p2Columns == 3 || p2Diagonal) {
            processEndGame("Player 2 wins the game!");
            return;
        }
        
        if (full) {
            processEndGame("Tied!");
        }
    }
}


function processEndGame(msg) {
    alert(msg);
    gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    currentPlayer = 1;
    refreshCanvas();
}





