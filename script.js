document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const gameStatus = document.getElementById('gameStatus');
    let isXTurn = true;
    let gameState = Array(9).fill(null);
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (gameState[index] || checkWin()) {
            return;
        }

        gameState[index] = isXTurn ? 'X' : 'O';
        cell.textContent = gameState[index];
        cell.classList.add(isXTurn ? 'x' : 'o');

        if (checkWin()) {
            gameStatus.classList.remove('x', 'o');
            gameStatus.textContent = `Le joueur ${gameState[index]} a gagné !`;
            gameStatus.classList.add(gameState[index] === 'X' ? 'x' : 'o');
            cells.forEach(cell => cell.classList.add(gameState[index] === 'X' ? 'winX' : 'winO'));
        } else if (gameState.every(cell => cell)) {
            gameStatus.textContent = "Match nul !";
            gameStatus.classList.remove('x', 'o');
        } else {
            isXTurn = !isXTurn;
            gameStatus.textContent = `À toi de jouer : ${isXTurn ? 'X' : 'O'}`;
            gameStatus.classList.remove('x', 'o');
            gameStatus.classList.add(isXTurn ? 'x' : 'o');
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function restartGame() {
        gameState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        isXTurn = true;
        gameStatus.textContent = `À toi de jouer : X`;
        gameStatus.classList.remove('o');
        gameStatus.classList.add('x');
        cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winX', 'winO');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
