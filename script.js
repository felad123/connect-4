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
      return true;
    }
  }
  var i=move-1
  var sameC=1
  //winning lines sideways
  while (i>=0) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]){
      sameC++;
    }
    else {
      break;
    } 
    i--
  }
  i=move+1
  while (i<=6) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]) {
      sameC++;
    }
    else {
      break;
    }
    i++
  }
  if (sameC>=4) {
    return true;
  }
}