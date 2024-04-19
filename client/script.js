const gameBoard = document.getElementById('game-board');
const players = [];
const formulas = [];

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("joinRoom", { roomCode: "test" });
});

function createPlayer(x, y) {
  const player = document.createElement('div');
  player.className = 'player';
  player.style.gridColumnStart = x + 1;
  player.style.gridRowStart = y + 1;
  gameBoard.appendChild(player);
  players.push(player);
}

function createFormula(x, y) {
  const formula = document.createElement('div');
  formula.className = 'formula';
  formula.style.gridColumnStart = x + 1;
  formula.style.gridRowStart = y + 1;
  gameBoard.appendChild(formula);
  formulas.push(formula);
}

function movePlayer(player, x, y) {
  player.style.gridColumnStart = x + 1;
  player.style.gridRowStart = y + 1;
}

function handleUserInteraction(event) {
  const x = event.clientX - gameBoard.offsetLeft;
  const y = event.clientY - gameBoard.offsetTop;

  for (const formula of formulas) {
    if (isIntersecting(formula, x, y)) {
      // Handle formula interaction
      break;
    }
  }

  for (const player of players) {
    if (isIntersecting(player, x, y)) {
      // Handle player interaction
      break;
    }
  }
}

function isIntersecting(element, x, y) {
  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Example usage
createPlayer(2, 2);
createFormula(5, 5);
movePlayer(players[0], 7, 7);
gameBoard.addEventListener('mousemove', handleUserInteraction);
