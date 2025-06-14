var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameActive = true;

var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var cells = document.querySelectorAll(".cell");
var statusText = document.getElementById("status");
var restartBtn = document.getElementById("restart");

cells.forEach(function(cell) {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick(event) {
    var cell = event.target;
    var index = parseInt(cell.getAttribute("data-index"));

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        statusText.textContent = "Player " + currentPlayer + " Wins!";
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

function checkWin() {
    for (var i = 0; i < winCombos.length; i++) {
        var a = winCombos[i][0];
        var b = winCombos[i][1];
        var c = winCombos[i][2];

        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            highlightWin(winCombos[i]);
            return true;
        }
    }
    return false;
}

function highlightWin(combo) {
    for (var i = 0; i < combo.length; i++) {
        cells[combo[i]].classList.add("win");
    }
}

function checkDraw() {
    for (var i = 0; i < board.length; i++) {
        if (board[i] === "") {
            return false;
        }
    }
    return true;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");
    });
}