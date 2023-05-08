window.addEventListener('DOMContentLoaded', (event) => {
    const gameSelector = document.getElementById('gameSelector');
    gameSelector.value = 'selectOne';
});

gameSelector.addEventListener('change', function() {
    let selectedGame = this.value;
  
    if (selectedGame === 'selectOne') {
        hideGames();
    } else if (selectedGame === 'tic-tac-toe') {
        hideGames();
        initializeTTT();
    } else if (selectedGame === 'snake') {
        hideGames();
        initializeSnake();
    };
});

function hideGames() {
    document.getElementById('TTTGame').style.display = 'none';
    document.getElementById('snakeGame').style.display = 'none';
};