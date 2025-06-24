const SIZE = 9;
const EMPTY = 0;

const DIFFICULTY_CLUES = { easy: 45, medium: 35, hard: 25 };

const grid = document.getElementById('sudoku-grid');
const generateBtn = document.getElementById('generate-btn');
const solveBtn = document.getElementById('solve-btn');
const changeDiffBtn = document.getElementById('change-diff-btn');
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const difficultyLabel = document.getElementById('difficulty-label');

let currentClues = DIFFICULTY_CLUES.medium;
let puzzle = createEmptyBoard();

function createEmptyBoard() {
  const board = [];
  for (let r = 0; r < SIZE; r++) {
    board.push(new Array(SIZE).fill(EMPTY));
  }
  return board;
}

function createGridUI() {
  grid.innerHTML = '';

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const input = document.createElement('input');

      input.type = 'text';
      input.maxLength = 1;
      input.className = 'cell';
      input.id = `cell-${r}-${c}`;

      if (r % 3 === 0) input.classList.add('top');
      if (c % 3 === 0) input.classList.add('left');
      if (r === SIZE - 1) input.classList.add('bottom');
      if (c === SIZE - 1) input.classList.add('right');

      input.addEventListener('input', function () {
        if (!/^[1-9]$/.test(input.value)) {
          input.value = '';
        }
      });

      grid.appendChild(input);
    }
  }
}

function renderBoard(board, lockGivenCells) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.getElementById(`cell-${r}-${c}`);
      const value = board[r][c];

      cell.value = value === EMPTY ? '' : String(value);

      if (lockGivenCells && puzzle[r][c] !== EMPTY) {
        cell.readOnly = true;
        cell.classList.add('fixed');
      } else {
        cell.readOnly = false;
        cell.classList.remove('fixed');
      }
    }
  }
}

function readBoardFromUI() {
  const board = createEmptyBoard();

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.getElementById(`cell-${r}-${c}`);
      const text = cell.value.trim();
      board[r][c] = text === '' ? EMPTY : Number(text);
    }
  }

  return board;
}

function isSafe(board, row, col, num) {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false;
    }
  }

  return true;
}

function findEmptyCell(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === EMPTY) {
        return { row: r, col: c };
      }
    }
  }
  return null;
}

function solve(board, randomOrder) {
  const emptyCell = findEmptyCell(board);
  if (emptyCell === null) return true;

  const row = emptyCell.row;
  const col = emptyCell.col;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (randomOrder) shuffle(numbers);

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];

    if (isSafe(board, row, col, num)) {
      board[row][col] = num;

      if (solve(board, randomOrder)) {
        return true;
      }

      board[row][col] = EMPTY;
    }
  }

  return false;
}

function copyBoard(board) {
  const copy = [];
  for (let r = 0; r < SIZE; r++) {
    const newRow = [];
    for (let c = 0; c < SIZE; c++) {
      newRow.push(board[r][c]);
    }
    copy.push(newRow);
  }
  return copy;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function generateFullBoard() {
  const fullBoard = createEmptyBoard();
  solve(fullBoard, true);
  return fullBoard;
}

function createPuzzleFrom(fullBoard, clues) {
  const newPuzzle = copyBoard(fullBoard);

  const positions = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      positions.push({ row: r, col: c });
    }
  }

  shuffle(positions);

  const removeCount = SIZE * SIZE - clues;
  for (let i = 0; i < removeCount; i++) {
    const pos = positions[i];
    newPuzzle[pos.row][pos.col] = EMPTY;
  }

  return newPuzzle;
}

createGridUI();

function startGame(difficulty) {
  currentClues = DIFFICULTY_CLUES[difficulty];
  difficultyLabel.textContent = `Difficulty: ${difficulty}`;
  difficultyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  generateSudoku();
}

document.querySelectorAll('.diff-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    startGame(btn.dataset.difficulty);
  });
});

changeDiffBtn.addEventListener('click', function () {
  gameScreen.classList.add('hidden');
  difficultyScreen.classList.remove('hidden');
});

function generateSudoku() {
  const fullBoard = generateFullBoard();
  puzzle = createPuzzleFrom(fullBoard, currentClues);
  renderBoard(puzzle, true);
}

function solveSudoku() {
  const board = readBoardFromUI();

  if (solve(board, false)) {
    renderBoard(board, true);
  } else {
    alert('No valid solution found.');
  }
}

generateBtn.addEventListener('click', generateSudoku);
solveBtn.addEventListener('click', solveSudoku);
