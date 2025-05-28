const board = Chessboard('board', {
  position: 'start',
  draggable: false
});
const game = new Chess();

function handleCommand() {
  const input = document.getElementById('commandInput').value;
  const move = parseMove(input);
  if (move && game.move(move)) {
    board.position(game.fen());
  } else {
    alert('Invalid move or format! Use e.g. "rook to d4"');
  }
}

function parseMove(command) {
  const pieceMap = {
    pawn: '', rook: 'r', knight: 'n', bishop: 'b', queen: 'q', king: 'k'
  };
  const match = command.toLowerCase().match(/(pawn|rook|knight|bishop|queen|king)?\s*to\s*([a-h][1-8])/);
  if (!match) return null;
  const [, pieceName, to] = match;
  const piece = pieceMap[pieceName] ?? '';

  const legalMoves = game.moves({ verbose: true });
  return legalMoves.find(m => m.to === to && (!piece || m.piece === piece));
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = function(event) {
    document.getElementById('commandInput').value = event.results[0][0].transcript;
    handleCommand();
  };
}
