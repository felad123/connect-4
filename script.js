var board = [];
var move = 0;
var movecount = 0;
function newGame() {
  board = [];
  for (i = 1; i < 50; i++) {
    if (i % 7 == 0) {
      board.push(0);
    } 
    else {
      board.push("E");
      document.getElementById(String(i-1)).src = "https://i.imgur.com/aPGAmz4.png"
    }
  }
}
function moveChoiceOn(i) {
  document.getElementById("top"+String(i)).src = ["https://i.imgur.com/kNXDkDC.png","https://i.imgur.com/x9Ry5Ix.png"][movecount%2]
}
function moveChoiceOff(i) {
  document.getElementById("top"+String(i)).src = "https://i.imgur.com/OyC93RA.png"
}
function gameState() {
  var sameC=1;
  //winning lines downwards
  if (board[7*move+6]>=4) {
    for (i=2;i<=4;i++) {
      if (board[7*move+board[7*move+6]-1]==board[7*move+board[7*move+6]-i]) {
        sameC++
      }
    }
    if (sameC==4) {
      return "win"
    }
  }
  var i=move-1;
  sameC=1;
  //winning lines sideways
  while (i>=0) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]){
      sameC++;
    }
    else {
      break;
    } 
    i--;
  }
  i=move+1
  while (i<=6) {
    if (board[7*i+board[7*move+6]-1]==board[7*move+board[7*move+6]-1]) {
      sameC++;
    }
    else {
      break;
    }
    i++;
  }
  if (sameC>=4) {
    return "win"
  }
  return "nothing lol"
}
function doMove() {
  if (board[7*move+6]!=6) {
    board[7*move+board[7*move+6]] = ["R","Y"][movecount%2]
    document.getElementById(String(7*move+board[7*move+6])).src = ["https://i.imgur.com/lpCPbnt.png","https://i.imgur.com/km8rY9I.png"][movecount%2]
    board[7*move+6]++
    console.log(gameState())
    if (gameState()=="win") {
      console.log(["R","Y"][(movecount)%2] + " won")
    }
    movecount++
  }
}



function animationTest() {
  var elem = document.getElementById("rCell");   
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 50) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}


