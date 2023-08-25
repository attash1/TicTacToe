const player = (playerSign) => {
    let sign = playerSign; 

    const getSign = () => sign;

    return {getSign};
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const editBoard = (index, sign) => {
        board[index] = sign;
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {editBoard, clearBoard};
})();

const displayController = (() => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('click', (e) => {
        //add conditional for if game not finished
        let curSign = gameController.getCurrentPlayerSign();
        gameBoard.editBoard(parseInt(e.target.id), curSign);
        e.target.textContent = curSign;
        gameController.advanceRound();
    }))
})();


const gameController = (() => {
    const player1 = player('X');
    const player2 = player('O');

    let player1Turn = true;
    let player2Turn = false;

    const getCurrentPlayerSign = () => {
        return player1Turn ? player1.getSign() : player2.getSign() 
    };

    console.log(`p1 sign is ${getCurrentPlayerSign()}`);
    const advanceRound = () => {
        player1Turn = !player1Turn;
        player2Turn = !player2Turn;
    }
    
    return {advanceRound, getCurrentPlayerSign}
})();


const titleScreen = document.getElementById("title");
const gameScreen = document.getElementById("gamePage");


const startButton = document.getElementById("startBtn");
startButton.addEventListener('click', startGame);

function startGame() {
    titleScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
}

/*
    Play Game Function

    LESS GLOBAL CODE, LOOK AT MODULE PATTERN IN
    THE ODIN PROJECT PAGE, MAYBE USE THAT FOR 
    THE GAMEBOARD


    Keep conditionals for if player 1 or player 2 turn,
    swap them when each player makes a move. Do corresponding 
    responses for each player's move


    Have player 1 pick a spot
    Check if p1 won, If winning configuration, end game, p1 wins

    Have player 2 pick a spot
    Check if p2 won, eojIf winning configuration, end game, p2 wins


*/