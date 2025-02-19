const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            return gameBoard[a];
        }
    }

    return null;
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] || gameOver || currentPlayer === 'O') return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        message.textContent = `Le joueur ${winner} a gagné !`;
        gameOver = true;
        return;
    } else if (checkTie()) {
        message.textContent = "Match nul !";
        gameOver = true;
        return;
    } else {
        currentPlayer = 'O';
        message.textContent = "C'est au tour du bot";
        botMove(); // Appeler botMove() directement
    }
}

function botMove() {
    if (gameOver) return;

    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    gameBoard[bestMove] = 'O';
    cells[bestMove].textContent = 'O';

    const winner = checkWin();
    if (winner) {
        message.textContent = `Le joueur ${winner} a gagné !`;
        gameOver = true;
        return;
    } else if (checkTie()) {
        message.textContent = "Match nul !";
        gameOver = true;
        return;
    }

    // Correction : Vérifier si la partie est terminée AVANT de changer currentPlayer
    if (!gameOver) { // Si la partie n'est pas terminée
        currentPlayer = 'X';
        message.textContent = "C'est au tour du joueur X";
    }
}

function minimax(board, depth, isMaximizing) {
    const winner = checkWin();
    if (winner === 'X') {
        return -1;
    } else if (winner === 'O') {
        return 1;
    } else if (checkTie()) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

cells.forEach(cell => cell.addEventListener('click', handleClick));

resetBtn.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = "C'est au tour du joueur X";
});

message.textContent = "C'est au tour du joueur X";