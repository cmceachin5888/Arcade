Tic Tac Toe

# start state
- have a grid to play on
    - should be 3x3
    - 
- have a way for players to move
    - first player is X
    - Player 2 is O
    - cannot both occupy the same space
    - when grid space is clicked on then player mark is left


# game loop
- someone makes a move
- computer has to determine if the game is over
    - someone won with the last move
    - all spaces filled without winner
- this needs to happend every time someone makes a move





Snake

- Set up the game board
- Create an array to represent the game board
- make snake and add to board
- make apple and add to board
- Create variables to keep track of the snake's position, length, direction, and game state (ongoing or finished).
- Add an event listener to the document to handle key presses for changing the snake's direction.
- Inside the key press event handler:
    a. Check if the pressed key is an arrow key.
    b. If the pressed key is an arrow key, update the snake's direction accordingly.
- Create a function to update the game state on each frame of the game:
    a. Move the snake's head one cell in the current direction.
    b. Check if the snake's head is out of bounds or collides with its body.
    c. If the snake's head is out of bounds or collides with its body, end the game.
    d. If the snake's head collides with food, add a new segment to the snake and place a new food at a random position.
    e. Update the array with the new snake position and food position.
    f. Update the HTML to show the snake and food in the new positions.
- Create a function to generate a new food position at random on the game board.
- Reset the game board and array to play again.