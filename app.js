//per odin project attempt to use modular pattern

//gameBoard Module
const gameBoard = (function() {
    //private variable for board itself
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //0,1,2 are values 0 X O

    function renderBoard(){
        const parent= document.querySelector(".game-container");
        parent.innerHTML = ""; //resetting the gameboard state to prevent duplicates

        board.forEach((value, index) => {
            const boardDiv = document.createElement('div');
            boardDiv.classList.add('cell'); //adding css class "cell"
            boardDiv.dataset.index = index; //tracking the index

            switch(value){
                case 0:
                    boardDiv.classList.add("blank");
                    boardDiv.addEventListener("click", handleCellClick)//adding event listener only to blank cells
                    break;
                case 1:
                    boardDiv.classList.add("x");
                    break;
                case 2:
                    boardDiv.classList.add("o");
                    break;
            }
        parent.appendChild(boardDiv);
        });
    }
    function isCellEmpty(index) {
        return board[index] === 0;
    }
    function resetBoard() {//function to reset the board state
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Reset all cells to 0
        renderBoard(); //re-render the board
    }
    function updateCell(index, player) {
        board[index] = player; // Update the board state
        renderBoard(); // Re-render the board
    }
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        gameLogic.makeMove(index);
    }

    return {
        render: renderBoard,
        reset: resetBoard,
        updateCell: updateCell,
        isCellEmpty: isCellEmpty
    }
})();

//gameLogic Module
const gameLogic = (function (){
    let currentPlayer = 1; //assume 1 for X and 2 for O
    let isGameOver = false;

    function switchPlayer(){//function to switch players
        currentPlayer = currentPlayer == 1 ? 2 : 1; //ternary operator for changing player

    }

    function checkGameState(){//Implement win and draw logic

    }

    function makeMove(index) {
        if (!isGameOver && gameBoard.isCellEmpty(index)) {
            gameBoard.updateCell(index, currentPlayer);
            checkGameState();
            switchPlayer();
        }
    }
    function resetGame() {
        gameBoard.reset(); // Reset the game board
        // Reset other game logic states
        currentPlayer = 1;
        isGameOver = false;
    }
    
    return {
        makeMove: makeMove,
        resetGame: resetGame
        // Other public methods as needed
    };
})();

document.addEventListener('DOMContentLoaded', (event) => {
    gameBoard.render();
});
const reset = document.querySelector("#reset");
reset.addEventListener("click", gameLogic.resetGame);