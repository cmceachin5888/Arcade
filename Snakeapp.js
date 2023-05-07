//Snake//

const gameBoard = document.getElementById('gameBoard');
const scoreCount = document.getElementById('displayScore');
const highScore = document.getElementById('highScore');
const ctx = gameBoard.getContext("2d");
const playAgainButton = document.getElementById('playAgain')

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: null
};

let gameState = {
    apple: [11, 8],
    snake: snake
};

let score = 0;
let highestScore = 0;
let gameStarted = false;
let gameInterval;
let gameOver = true;

drawSnake();
drawApple();

document.addEventListener("keydown", function (event) {
    if (!gameStarted) {
        snake.nextDirection = getDirectionFromKey(event.key);
        gameStarted = true;
        gameInterval = setInterval(gameLoop, 100);
    } else {
        const direction = getDirectionFromKey(event.key);
        if (direction !== null && isValidDirection(direction, snake.nextDirection)) {
            snake.nextDirection = direction;
        };
    };
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

function gameLoop() {
    if (gameOver) {
        return;
    };

    const head = snake.body[0];
    const [dx, dy] = getDirectionVector(snake.nextDirection);
    const newHead = [head[0] + dx, head[1] + dy];
    snake.body.unshift(newHead);
    snake.body.pop();

    if (touchesWall(newHead)) {
        endGame();
        return;
    };

    if (arraysAreEqual(newHead, gameState.apple)) {
        score++
        scoreCount.textContent = score;
        spawnApple();
        growSnake();
    };

    if (touchesSelf()) {
        endGame();
        return;
    };

    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
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
    };
};

function touchesWall([x, y]) {
    return x < 0 || x >= gameBoard.width / 10 || y < 0 || y >= gameBoard.height / 10;
};

function endGame() {
    clearInterval(gameInterval);

    snake = {
        body: [[10, 5], [10, 6], [10, 7], [10, 8]],
        nextDirection: 'right'
    };

    gameState = {
        apple: [11, 8],
        snake: snake
    };

    if (score > 0) {
        if (score > parseInt(highScore.textContent)) {
            highScore.textContent = score;
            alert("New high score!");
        } else {
            alert("You lose.");
        }
    }

    score = 0;
    scoreCount.textContent = score;

    gameStarted = false;
};

playAgainButton.addEventListener('click', function() {
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(gameLoop, 100);
    };
});

function spawnApple() {
    const x = Math.floor(Math.random() * (gameBoard.width / 10));
    const y = Math.floor(Math.random() * (gameBoard.height / 10));
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
      ctx.fillRect(x * 10, y * 10, 10, 10);
    });
};
  
function drawApple() {
    ctx.fillStyle = 'red';
    const [x, y] = gameState.apple;
    ctx.fillRect(x * 10, y * 10, 10, 10);
};



