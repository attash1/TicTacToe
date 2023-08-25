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

    const isGameOver = () => {
        let roundNum = gameController.getRoundNum();
        if (roundNum >= 5) {
            if (roundNum == 9) {
                return true;
            }

            if ((board[0] != "" && board[0] === board[1] && board[1] === board[2]) || 
                (board[3] != "" && board[3] === board[4] && board[4] === board[5]) ||
                (board[6] != "" && board[6] === board[7] && board[7] === board[8]) ||
                (board[0] != "" && board[0] === board[3] && board[3] === board[6]) ||
                (board[1] != "" && board[1] === board[4] && board[4] === board[7]) ||
                (board[2] != "" && board[2] === board[5] && board[5] === board[8]) || 
                (board[0] != "" && board[0] === board[4] && board[4] === board[8]) || 
                (board[6] != "" && board[6] === board[4] && board[4] === board[2])  ) {
                return true;
            }
            return false;
        }
        return false;
    }



    return {editBoard, clearBoard, isGameOver};
})();

const displayController = (() => {
    const boxes = document.querySelectorAll('.box');
    const resultBox = document.getElementById('resultBox');

    boxes.forEach(box => box.addEventListener('click', boxClickHandler));

    function boxClickHandler(e) {
        let curSign = gameController.getCurrentPlayerSign();
        gameBoard.editBoard(parseInt(e.target.id), curSign);
        e.target.textContent = curSign;
       
        if (!gameBoard.isGameOver()) {
            gameController.advanceRound();
        }

        else {
            boxes.forEach(box => box.removeEventListener('click', boxClickHandler));

            if (gameController.getRoundNum() == 9) 
                resultBox.textContent = `Game Over! Draw!`;
            else
                resultBox.textContent = `Game Over! ${gameController.getCurrentPlayerSign()} wins!`;
            
        }
    }


    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
        boxes.forEach(box => box.addEventListener('click', boxClickHandler));
        resultBox.textContent = "";
        boxes.forEach(box => box.textContent = "");
        gameBoard.clearBoard();
        gameController.reset();
    })
})();


const gameController = (() => {
    let roundNum = 1;

    const player1 = player('X');
    const player2 = player('O');

    let player1Turn = true;
    let player2Turn = false;

    const getRoundNum = () => {return roundNum};

    const getCurrentPlayerSign = () => {
        return player1Turn ? player1.getSign() : player2.getSign() 
    };

    const reset = () => {
        roundNum = 1;
        player1Turn = true;
        player2Turn = false;
    }

    const advanceRound = () => {
        player1Turn = !player1Turn;
        player2Turn = !player2Turn;
        roundNum++;
    }

    return {advanceRound, getCurrentPlayerSign, getRoundNum, reset}
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