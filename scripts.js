document.addEventListener('DOMContentLoaded', function() {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');
  const cells = document.querySelectorAll('[data-cell]');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleCellClick(cell, index) {
    if (!gameActive || cell.textContent !== '') return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkResult() {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        gameActive = false;
        status.textContent = `Player ${gameState[a]} wins!`;
        highlightWinningCells(condition); // Optional: Highlight winning cells
        return;
      }
    }

    if (!gameState.includes('')) {
      gameActive = false;
      status.textContent = `It's a draw!`;
    }
  }

  function highlightWinningCells(cells) {
    cells.forEach(index => {
      document.querySelector(`[data-cell="${index}"]`).classList.add('win');
    });
  }

  function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('win'); // Remove any previous winning cell highlighting
    });
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
  });

  restartBtn.addEventListener('click', restartGame);
});
