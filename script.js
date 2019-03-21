var board = [];
var move = 0;
function newGame() {
  board = [];
  for (i = 1; i < 50; i++) {
    if (i % 7 == 0) {
      board.push(0);
    } 
    else {
      board.push("E");
    }
  }
}
function gameEnd() {
  //winning lines downwards
  if (board[7*move+6]>=4) {
    if (board[7*move+board[7*move+6]-1]==board[7*move+board[7*move+6]-2]==board[7*move+board[7*move+6]-3]==board[7*move+board[7*move+6]-4]) {
      return(1);
    }
  }
}