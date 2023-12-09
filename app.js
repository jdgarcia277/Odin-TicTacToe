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

            switch(value){//add css for x || o
                case 0:
                    boardDiv.addEventListener("click", handleCellClick)//adding event listener only to blank cells
                    break;
                case 1:
                    boardDiv.classList.add("x");
                    break;
                case 2:
                    boardDiv.classList.add("o");
                    break;
            }
            switch(index){//css for proper borders to make the board look like Tic Tac Toe
                case 0://fall through cases, new technique I haven't used
                case 1:
                case 3:
                case 4:
                    boardDiv.classList.add("border-br");
                    break;
                case 2: 
                case 5:
                    boardDiv.classList.add("border-b");
                    break;
                case 6:
                case 7:
                    boardDiv.classList.add("border-r");
                    break;
            }
            parent.appendChild(boardDiv);
        })
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

//player module
const players = (function() {
    let player1 = "Player 1";
    let player2 = "Player 2";

    function updatePlayerName() {
        const player1Div = document.querySelector(".player1-name");
        const player2Div = document.querySelector(".player2-name");
        
        player1Div.innerHTML = `
            <form id="player1Form">
                <input type="text" class="name-field" id="player1Field">
                <button class="name-button" type="submit">Enter</button>
            </form>`;
        player2Div.innerHTML = `
            <form id="player2Form">
                <input type="text" class="name-field" id="player2Field">
                <button class="name-button" type="submit">Enter</button>
            </form>`;

        const player1Form = document.querySelector("#player1Form");
        const player2Form = document.querySelector("#player2Form");

        player1Form.addEventListener("submit", function(event){
            event.preventDefault(); // Prevent form submission
            const name = document.querySelector("#player1Field").value;
            player1 = name;
            player1Form.innerHTML="";
            player1Form.innerHTML=`
                <h2>${player1}</h2>`;
        });

        player2Form.addEventListener("submit", function(event){
            event.preventDefault(); // Prevent form submission
            const name = document.querySelector("#player2Field").value;
            player2 = name;
            player2Form.innerHTML="";
            player2Form.innerHTML=`
                <h2>${player2}</h2>`;
        });
    }

    return {
        updatePlayerName: updatePlayerName
    };
})();


document.addEventListener('DOMContentLoaded', (event) => {
    gameBoard.render();
});
const reset = document.querySelector("#reset");
reset.addEventListener("click", gameLogic.resetGame);

const playerChange = document.querySelector("#playerChange");
playerChange.addEventListener("click", players.updatePlayerName);