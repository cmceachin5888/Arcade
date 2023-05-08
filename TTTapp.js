//Tic Tac Toe//
function initializeTTT() {
    document.getElementById('TTTGame').style.display = "inline-block";
};


const cells = document.querySelectorAll('.cell');
const playerDisplay = document.getElementById('display-player');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('who-won-message');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsComputerButton = document.getElementById('player-vs-computer');
const computerDifficultySelect = document.querySelector('#computer-difficulty-select');
const playerXName = document.getElementById('playerX-name');
const playerOName = document.getElementById('playerO-name');

let currentPlayer = 'PlayerX';
let isComputerPlaying = false;
let gameMode = 'player-vs-player';
let computerDifficulty = "easy";

const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
];


window.addEventListener('load', () => {
    startNewGame();

    const savedPlayer = localStorage.getItem('currentPlayer');
    if (savedPlayer === 'PlayerO') {
        localStorage.setItem('currentPlayer', 'PlayerX');
        currentPlayer = 'PlayerX';
    } else {
        currentPlayer = savedPlayer || 'PlayerX';
    }
    updateDisplay();

    playerXName.value = '';
    playerOName.value = '';

    computerDifficultySelect.value = 'easy'
});

playerVsPlayerButton.addEventListener('click', () => {
    gameMode = "player-vs-player";
    startNewGame();
});

playerVsComputerButton.addEventListener('click', () => {
    gameMode = "player-vs-computer";
    startNewGame();
});

computerDifficultySelect.addEventListener('change', () => {
    computerDifficulty = computerDifficultySelect.value;
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameMode === "player-vs-computer" && currentPlayer === 'PlayerO') {
            return;
        }
        makePlayerMove(cell);
    });
});

function startNewGame() {
    resetGame();
    updateDisplay();
    isComputerPlaying = false;
    if (gameMode === "player-vs-computer") {
        currentPlayer = 'PlayerX';
        computerDifficultySelect.style.display = 'inline-block';
        playerXName.style.display = 'inline-block'
        playerOName.style.display = 'none'
    } else {
        computerDifficultySelect.style.display = 'none';
        playerXName.style.display = 'inline-block'
        playerOName.style.display = 'inline-block'
    }
};

function makePlayerMove(cell) {
    if (!cell.textContent && !message.textContent) {
      cell.textContent = currentPlayer === 'PlayerX' ? 'X' : 'O';
      cell.classList.add(currentPlayer);
      updateDisplay();
      checkForWin();
      switchPlayers();
  
      if (gameMode === 'player-vs-computer' && currentPlayer === 'PlayerO') {
        setTimeout(() => {
          makeComputerMove();
        }, 500);
      };
    };
};

function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);
    
    if (emptyCells.length === 0) {
      return;
    };

    let chosenCell;
  
    switch (computerDifficulty) {
      case "easy":
        chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        break;
      case "brainy":
        chosenCell = getWinningCell(emptyCells);
        if (!chosenCell) {
          chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        };
        break;
      case "super-brainy":
        chosenCell = getBestCell(emptyCells);
        if (!chosenCell) {
          chosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        };
        break;
    };

    chosenCell.textContent = 'O';
    chosenCell.classList.add('PlayerO');
    checkForWin();
    switchPlayers();
};

function getWinningCell(emptyCells) {
    let winningCell;
  
    winningCombos.forEach(combo => {
      const cell1 = document.getElementById(`cell${combo[0]}`);
      const cell2 = document.getElementById(`cell${combo[1]}`);
      const cell3 = document.getElementById(`cell${combo[2]}`);
  
      if (cell1.textContent === 'O' && cell2.textContent === 'O' && !cell3.textContent) {
        winningCell = cell3;
      } else if (cell1.textContent === 'O' && cell3.textContent === 'O' && !cell2.textContent) {
        winningCell = cell2;
      } else if (cell2.textContent === 'O' && cell3.textContent === 'O' && !cell1.textContent) {
        winningCell = cell1;
      }
    });
  
    return winningCell;
};

function getBestCell(emptyCells) {
    let bestCell;
  
    winningCombos.forEach(combo => {
      const cell1 = document.getElementById(`cell${combo[0]}`);
      const cell2 = document.getElementById(`cell${combo[1]}`);
      const cell3 = document.getElementById(`cell${combo[2]}`);
  
      if (cell1.textContent && cell1.textContent === cell2.textContent && !cell3.textContent) {
        if (cell1.textContent === 'O') {
          bestCell = cell3;
        } else if (cell1.textContent === 'X') {
          bestCell = cell3;
        };
      } else if (cell1.textContent && cell1.textContent === cell3.textContent && !cell2.textContent) {
        if (cell1.textContent === 'O') {
          bestCell = cell2;
        } else if (cell1.textContent === 'X') {
          bestCell = cell2;
        };
      } else if (cell2.textContent && cell2.textContent === cell3.textContent && !cell1.textContent) {
        if (cell2.textContent === 'O') {
          bestCell = cell1;
        } else if (cell2.textContent === 'X') {
          bestCell = cell1;
        };
      };
    });
  
    if (bestCell) {
      return bestCell;
    };
  
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

function checkForWin() {

    let winnerFound = false;

    winningCombos.forEach(combo => {
        const cell1 = document.getElementById(`cell${combo[0]}`);
        const cell2 = document.getElementById(`cell${combo[1]}`);
        const cell3 = document.getElementById(`cell${combo[2]}`);
    
        if (cell1.textContent && cell1.textContent === cell2.textContent && cell2.textContent === cell3.textContent) {
            winnerFound = true;
            if (currentPlayer === 'PlayerX') {
                message.textContent = `${playerXName.value || 'PlayerX'} wins!`;
              } else {
                message.textContent = gameMode === 'player-vs-player' ? `${playerOName.value || 'PlayerO'} wins!`: 'Computer Wins!';
              };
            playerDisplay.textContent = 'Game over';
            
        }
    });

    if (winnerFound) {
        currentPlayer = currentPlayer === 'PlayerX' ? 'PlayerO' : 'PlayerX';
        updateDisplay();
        return;
    }

    const emptyCells = Array.from(cells).filter(cell => !cell.textContent);

    if (emptyCells.length === 0) {
        message.textContent = "It's a tie!";
        playerDisplay.textContent = 'Game over';
        return;
    }
};

function switchPlayers() {
    if (currentPlayer === 'PlayerX') {
        currentPlayer = 'PlayerO';
    } else {
        currentPlayer = 'PlayerX';
    }
    updateDisplay();
    localStorage.setItem('currentPlayer', currentPlayer);
};

function updateDisplay() {
    
    if (message.textContent) {
        playerDisplay.textContent = 'Game Over';
    } else {
        if (currentPlayer === 'PlayerX') {
            playerDisplay.textContent = `${playerXName.value || 'PlayerX'}'s turn`;
        } else if (currentPlayer === 'PlayerO' && gameMode === 'player-vs-player') {
            playerDisplay.textContent = `${playerOName.value || 'PlayerO'}'s turn`;
        } else if (currentPlayer === 'PlayerO' && gameMode === 'player-vs-computer') {
            playerDisplay.textContent = 'Computer\'s turn';
        }
    };
};

function resetGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('PlayerX', 'PlayerO');
    });

    message.textContent = '';
    currentPlayer = 'PlayerX';
    updateDisplay();
    localStorage.setItem('currentPlayer', currentPlayer);
};

resetButton.addEventListener('click', resetGame);