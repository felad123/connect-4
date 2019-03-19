var board = [];
function newGame() {
  board = [];
  for (i = 1; i < 50; i++) {
    if (i % 7 == 0) {
      board.push(0);
    } else {
      board.push("E");
    }
  }
}