function initializeSnake() {
    document.getElementById('snakeGame').style.display = "inline-block";
};

const gameBoard = document.getElementById('gameBoard');
const scoreCount = document.getElementById('displayScore');
const highScore = document.getElementById('highScore');
const ctx = gameBoard.getContext("2d");
const startButton = document.getElementById('startButton')
const playAgainButton = document.getElementById('playAgain')


let snake = {
    body: [ [5, 10], [6, 10], [7, 10] ],
    nextDirection: null
};

let gameState = {
    apple: [11, 8],
    snake: snake
};

let score = 0;
let gameStarted = false;
let gameInterval;
const cellSize = 30;
const boardWidth = 17;
const boardHeight = 15;
gameBoard.width = boardWidth * cellSize;
gameBoard.height = boardHeight * cellSize;
scoreCount.textContent = 'Score: ' + score;
highScore.textContent = 'High Score: ' + score;

drawCheckerboard();
drawSnake();
drawApple();

startButton.addEventListener('click', function() {
    if (!gameStarted) {
        snake.nextDirection = "up";
        gameStarted = true;
        gameInterval = setInterval(gameLoop, 200);
    }
});

document.addEventListener("keydown", function(event) {
    const direction = getDirectionFromKey(event.key);
    if (direction !== null && isValidDirection(direction, snake.nextDirection)) {
        snake.nextDirection = direction;
    }
});

function getDirectionFromKey(key) {
    switch (key) {
        case "ArrowLeft":
            return "left";
        case "ArrowUp":
            return "up";
        case "ArrowRight":
            return "right";
        case "ArrowDown":
            return "down";
        default:
            return null;
    };
};

function isValidDirection(direction, currentDirection) {
    return (
        (direction === "left" && currentDirection !== "right") ||
        (direction === "up" && currentDirection !== "down") ||
        (direction === "right" && currentDirection !== "left") ||
        (direction === "down" && currentDirection !== "up")
    );
};

function initializeGame() {
    snake = {
        body: [[5, 10], [6, 10], [7, 10]],
        nextDirection: null
    };
    gameState.apple = [11, 8];
    score = 0;
    scoreCount.textContent = 'Score: ' + score;
    drawCheckerboard();
    drawSnake();
    drawApple();
};

function gameLoop() {
    const head = snake.body[0];
    const [dx, dy] = getDirectionVector(snake.nextDirection);
    const newHead = [head[0] + dx, head[1] + dy];
    snake.body.unshift(newHead);
    snake.body.pop();

    if (touchesWall(newHead) || touchesSelf()) {
        endGame();
        return;
    };

    if (arraysAreEqual(newHead, gameState.apple)) {
        score++
        scoreCount.textContent = 'Score: ' + score;
        spawnApple();
        growSnake();
    };

    ctx.clearRect(0, 0, boardWidth, boardHeight);
    drawCheckerboard();
    drawSnake();
    drawApple();
};

function getDirectionVector(direction) {
    switch (direction) {
        case 'left':
            return [-1, 0];
        case 'up':
            return [0, -1];
        case 'right':
            return [1, 0];
        case 'down':
            return [0, 1];
        default:
            return [0, 0];
    };
};

function touchesWall([x, y]) {
    return x < 0 || x >= boardWidth || y < 0 || y >= boardHeight;
};

function endGame() {
    clearInterval(gameInterval);

    if (score >= 0) {
        if (score > parseInt(highScore.textContent.split(" ")[2])) {
            highScore.textContent = 'High Score: ' + score;
            alert("New high score!");
        } else {
            alert("You lose.");
        };
    };
    score = 0;
    scoreCount.textContent = 'Score: ' + score;
    gameStarted = false;
};

playAgainButton.addEventListener('click', function() {
    if (gameStarted) {
        clearInterval(gameInterval);
        gameStarted = false;
        initializeGame();
        gameInterval = setInterval(gameLoop, 200);
    } else {
        initializeGame();
    }
});
  
function resetGame() {
    clearInterval(gameInterval);
    initializeGame();
};

function spawnApple() {
    const x = Math.floor(Math.random() * (boardWidth));
    const y = Math.floor(Math.random() * (boardHeight));
    gameState.apple = [x, y];
};

function growSnake() {
    const tail = snake.body[snake.body.length - 1];
    const [dx, dy] = getDirectionVector(snake.nextDirection);
    const newSegment = [tail[0] + dx, tail[1] + dy];
    snake.body.push(newSegment);
};

function touchesSelf() {
    const head = snake.body[0];
    for (let i = 1; i < snake.body.length; i++) {
      if (arraysAreEqual(head, snake.body[i])) {
        return true;
      };
    };
    return false;
};
  
function arraysAreEqual(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
};

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.body.forEach(segment => {
        const [x, y] = segment;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    });
};
  
function drawApple() {
    ctx.fillStyle = 'red';
    const [x, y] = gameState.apple;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
};

function drawCheckerboard() {
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            if ((x + y) % 2 === 0) {
                ctx.fillStyle = 'white';
            } else {
                ctx.fillStyle = 'lightgray';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}